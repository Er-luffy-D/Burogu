import { useRecoilValue } from "recoil";
import { Appbar } from "../components/Appbar";
import { useMyBlogs } from "../hooks";
import { infoAtom, themeAtom } from "../store/atom/Information";
import { Loading_Screen } from "../components/loader";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { FiBookOpen, FiCalendar, FiSearch, FiChevronsRight } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

export const MyBlogs = () => {
	const user = useRecoilValue(infoAtom);
	const theme = useRecoilValue(themeAtom);
	const { blogs, loading } = useMyBlogs(user.id);
	// const [activeCategory, setActiveCategory] = useState("all");
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const stripHtmlTags = (html: string) => {
		const div = document.createElement("div");
		div.innerHTML = html;
		return div.textContent || div.innerText || "No Content";
	};

	if (loading) {
		return (
			<div>
				<Appbar />
				<div className="flex justify-center items-center h-screen dark:bg-gradient-to-b dark:from-gray-800 dark:to-slate-950">
					<Loading_Screen />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#FFF2D7] dark:bg-gray-900 overflow-hidden">
			<Appbar />

			{/* Diagonal Header Section */}
			<motion.div
				className="relative h-64 overflow-hidden"
				initial={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
			>
				<div className="absolute inset-0 bg-[#F98866] dark:bg-[#F98866] z-0" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#F98866] to-[#ff9e80] dark:from-[#F98866] dark:to-[#ff9e80] opacity-90 z-0" />

				<motion.div
					className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<motion.h1 className="Big-Shoulders font-semibold text-5xl md:text-6xl  text-white" whileHover={{ x: 5 }}>
						Your Posts
					</motion.h1>
					<motion.p
						className="text-xl text-white mt-4 max-w-2xl"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
					>
						A showcase of your creative journey
					</motion.p>
				</motion.div>
			</motion.div>

			{/* Diagonal Content Area */}
			<motion.div
				className="relative -mt-20 z-10"
				ref={ref}
				initial={{ opacity: 0 }}
				animate={inView ? { opacity: 1 } : {}}
				transition={{ duration: 0.8 }}
			>
				<div className="container mx-auto px-4 py-12">
					{/* Floating Control Panel */}
					<motion.div
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-12"
						whileHover={{ y: -5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<div className="flex flex-col md:flex-row justify-between items-center gap-6">
							<div className="relative w-full md:w-96">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<FiSearch className="text-gray-500 dark:text-gray-400" />
								</div>
								{/* Search */}
								<input
									type="text"
									placeholder="Search your posts..."
									className="pl-10 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F98866]"
								/>
							</div>

							{/* Category section */}

							{/* <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
								{["all", "recent", "popular", "drafts"].map((category) => (
									<button
										key={category}
										onClick={() => setActiveCategory(category)}
										className={`px-4 py-2 rounded-full whitespace-nowrap ${
											activeCategory === category
												? "bg-[#F98866] text-white"
												: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
										}`}
									>
										{category.charAt(0).toUpperCase() + category.slice(1)}
									</button>
								))}
							</div> */}
						</div>
					</motion.div>

					{/* Diagonal Grid Layout */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform  origin-top">
						<AnimatePresence>
							{blogs.map((blog, index) => (
								<motion.div
									key={blog.id}
									custom={index}
									initial={{ opacity: 0, x: -50, rotate: -5 }}
									animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
										type: "spring",
										stiffness: 100,
									}}
									className="transform hover:rotate-1 rotate-[-2deg]  transition-transform duration-300"
								>
									<BlogCard
										id={blog.id}
										key={blog.id}
										title={blog.title || "Untitled Post"}
										description={stripHtmlTags(blog.content).slice(0, 100) + "..."}
										date={blog.date.split("T")[0]}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{/* Empty blogs */}
					{blogs.length === 0 && (
						<motion.div
							className="flex flex-col items-center justify-center py-16 mt-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<FiBookOpen className="w-16 h-16 text-[#F98866] mb-6" />
							<h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your story begins here</h3>
							<Link
								to="/publish"
								className="px-8 py-3 bg-gradient-to-r from-[#F98866] to-[#ff9e80] text-white rounded-full hover:shadow-lg transition-all flex items-center"
							>
								Create Your First Post <FiChevronsRight className="ml-2" />
							</Link>
						</motion.div>
					)}
				</div>
			</motion.div>

			{/* Floating Particles (Light Mode Only) */}
			{theme === "light" && <Particles />}
		</div>
	);
};

const Particles = () => {
	return (
		<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full bg-[#F98866] opacity-10"
					style={{
						width: Math.random() * 15 + 5,
						height: Math.random() * 15 + 5,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
					}}
					animate={{
						y: [0, Math.random() * 100 - 50],
						x: [0, Math.random() * 100 - 50],
						rotate: [0, 360],
					}}
					transition={{
						duration: Math.random() * 20 + 10,
						repeat: Infinity,
						repeatType: "reverse",
					}}
				/>
			))}
		</div>
	);
};

// blog cards

const BlogCard = memo(
	({ id, title, description, date }: { id: string; title: string; description: string; date: string }) => {
		const [isHovered, setIsHovered] = useState(false);
		const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

		return (
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 50 }}
				animate={inView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.6 }}
				className="relative h-full "
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Link to={`/blog/${id}`} className="block h-full">
					<motion.div
						className="bg-white dark:bg-gray-800 -rotate-2 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border-2 border-transparent"
						whileInView={{ opacity: 1, rotate: -3 }}
						initial={{ opacity: 0, rotate: 0 }}
						whileHover={{
							boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							borderColor: "#F98866",
							rotate: 0,
						}}
						transition={{ type: "spring", stiffness: 300 }}
					>
						{/* bar above the card */}
						<motion.div
							className="absolute top-0 left-2.5 rounded-lg right-0 h-1 bg-gradient-to-r from-[#F98866] to-[#ff9e80]"
							animate={{ width: isHovered ? "90%" : "30%" }}
							transition={{ duration: 0.4 }}
						/>

						<div className="p-6 flex-grow">
							<motion.h3
								className="text-2xl font-bold mb-4 text-gray-800 dark:text-white"
								whileHover={{ color: "#F98866" }}
								transition={{ duration: 0.2 }}
							>
								{title}
							</motion.h3>
							<p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">{description}</p>
						</div>

						<div className="px-6 pb-6 flex items-center justify-between">
							<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
								<FiCalendar className="mr-2" />
								<span>{date}</span>
							</div>
							<motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 500 }}>
								<div className="w-8 h-8 rounded-full bg-[#F98866] flex items-center justify-center text-white">
									<FiChevronsRight className="w-4 h-4" />
								</div>
							</motion.div>
						</div>
					</motion.div>
				</Link>
			</motion.div>
		);
	}
);
