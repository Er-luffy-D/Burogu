import { LandingNav } from "../components/Appbar";
import SplitText from "../components/SplitText";
import { motion, useAnimation } from "framer-motion";
import Squares from "../components/Squares";
import { useRecoilValue } from "recoil";
import { infoAtom, themeAtom } from "../store/atom/Information";
import { Testimonial } from "../components/Testimonial";
import { useNavigate } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { SignUpButton } from "../components/SignUpButton";
import { FloatingBackgroundElements } from "../components/FloatingBackgroundElements";

export const Landing = () => {
	const theme = useRecoilValue(themeAtom);
	const user = useRecoilValue(infoAtom);
	const navigate = useNavigate();
	const controls = useAnimation();
	const heroRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });

			if (heroRef.current) {
				const rect = heroRef.current.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const xPercent = x / rect.width;
				const yPercent = y / rect.height;

				controls.start({
					x: (xPercent - 0.5) * 30,
					y: (yPercent - 0.5) * 30,
					transition: { type: "spring", stiffness: 100 },
				});
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [controls]);

	// Crazy hover effect for CTA
	const [ctaHover, setCtaHover] = useState(false);

	return (
		<div className="relative overflow-hidden">
			{/* Floating mouse follower */}
			<motion.div
				className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-10 pointer-events-none z-0"
				animate={{
					x: mousePosition.x - 128,
					y: mousePosition.y - 128,
					scale: ctaHover ? 2 : 1,
					opacity: ctaHover ? 0.2 : 0.1,
				}}
				transition={{ type: "spring", damping: 20 }}
			/>

			<LandingNav user={user} />

			{/* Hero section with crazy parallax */}
			<div
				ref={heroRef}
				className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-black dark:to-stone-900 overflow-hidden"
			>
				<Squares speed={0.5} squareSize={40} direction="diagonal" theme={theme as "light" | "dark"} />

				<motion.div className="w-full absolute flex flex-col items-center justify-center px-4" animate={controls}>
					<SplitText
						text="WELCOME TO BUROGU!"
						className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center md:tracking-widest"
						textClassName="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
						delay={100}
						animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
						animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
						threshold={0.2}
						rootMargin="-50px"
					/>
					<motion.p
						className="mt-8 text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
					>
						The most <span className="font-bold text-blue-600 dark:text-blue-400">insanely awesome</span> blogging
						platform you'll ever use
					</motion.p>

					<motion.button
						className="mt-12 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onHoverStart={() => setCtaHover(true)}
						onHoverEnd={() => setCtaHover(false)}
						onClick={() => navigate(user.email === "Unknown" ? "/SignIn" : "/blogs")}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1 }}
					>
						Get Started Now
						<FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
					</motion.button>
				</motion.div>

				<motion.div
					className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-400 opacity-20"
					animate={{
						y: [0, -30, 0],
						x: [0, 20, 0],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-lg bg-purple-400 opacity-20"
					animate={{
						y: [0, 30, 0],
						rotate: [0, 10, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black/95 dark:to-gray-900 py-20 relative overflow-hidden">
				{/* Floating background elements */}
				<FloatingBackgroundElements />

				<div className="container mx-auto px-4 relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<motion.div
							className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-10"></div>
							<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-10"></div>

							<h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
									Why Choose Burogu?
								</span>
							</h2>

							<div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
								<p className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-4 before:bg-blue-500 before:rounded-full">
									<span className="font-bold text-blue-600 dark:text-blue-400">Cutting-edge editor</span> with real-time
									collaboration and AI-assisted writing tools.
								</p>

								<p className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-4 before:bg-purple-500 before:rounded-full">
									<span className="font-bold text-purple-600 dark:text-purple-400">Stunning themes</span> that make your
									content look professionally designed with zero effort.
								</p>

								<p className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-4 before:h-4 before:bg-pink-500 before:rounded-full">
									<span className="font-bold text-pink-600 dark:text-pink-400">Built-in analytics</span> to track your
									audience and optimize your content strategy.
								</p>
							</div>
						</motion.div>

						<motion.div
							className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.8 }}
							viewport={{ once: true }}
							whileHover={{ scale: 1.02 }}
						>
							<div className="absolute inset-0 bg-noise opacity-10"></div>
							<h3 className="text-3xl font-bold text-white mb-6">Ready to Begin?</h3>
							<p className="text-blue-100 mb-8">
								Join thousands of creators who are already building their audience with Burogu.
							</p>
							<SignUpButton />

							<div className="mt-8 flex space-x-2">
								{[...Array(5)].map((_, i) => (
									<motion.div
										key={i}
										className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold shadow-md"
										animate={{ y: [0, -10, 0] }}
										transition={{
											duration: 2,
											delay: i * 0.2,
											repeat: Infinity,
										}}
									>
										{i + 1}
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			<Testimonial />
			<ContactUs />

			{/* Crazy floating action button */}
			<motion.div className="fixed bottom-8 right-8 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
				<button
					className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl flex items-center justify-center"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
					</svg>
				</button>
			</motion.div>
		</div>
	);
};
