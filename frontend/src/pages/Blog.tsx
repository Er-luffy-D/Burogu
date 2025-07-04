import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { useFetchBlog } from "../hooks";
import { Loading_Screen } from "../components/loader";
import { Reveal } from "../components/Animation";
import { Bounce, toast } from "react-toastify";
import { PROD_BACKEND_URL } from "../config";
import axios from "axios";
import { Toasts } from "../components/Toasts";
import { useRecoilValue } from "recoil";
import { infoAtom, themeAtom } from "../store/atom/Information";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { FloatingBackgroundElements } from "../components/FloatingBackgroundElements";

export const Blog = () => {
	const { id } = useParams();
	return (
		<div className="min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-950">
			<Appbar />
			<Blogpost id={id} />
			<Toasts />
		</div>
	);
};

const Blogpost = ({ id }: { id: string | undefined }) => {
	const user = useRecoilValue(infoAtom);
	const theme = useRecoilValue(themeAtom);
	const { loading, blog } = useFetchBlog(id);
	const navigate = useNavigate();

	const requestDelete = async () => {
		try {
			const response = await axios.post(
				`${PROD_BACKEND_URL}/api/v1/blog/delete`,
				{ id: id },
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);
			return response;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	const handleDeleteClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		toast.promise(
			requestDelete().then(() => {
				setTimeout(() => {
					navigate("/blogs");
				}, 1500);
			}),
			{
				pending: "Deleting...",
				success: "Post deleted successfully",
				error: "Error deleting post",
			},
			{
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: theme === "dark" ? "dark" : "light",
				transition: Bounce,
			}
		);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loading_Screen />
			</div>
		);
	}

	return (
		<div className="relative h-full min-h-screen">
			<FloatingBackgroundElements i={30} />

			<div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
				<motion.button
					onClick={() => navigate(-1)}
					whileHover={{ x: -4 }}
					className="flex items-center text-blue-600 dark:text-blue-400 mb-6"
				>
					<FiArrowLeft className="mr-2" />
					Back to blogs
				</motion.button>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Blog Content - Left Side */}
					<motion.div
						className="lg:w-2/3 bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="mb-8">
							<div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
								<Reveal>Posted on {blog.date.split("T")[0] + " " + blog.date.split("T")[1].substring(0, 5)}</Reveal>
							</div>
							<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
								<Reveal>{blog.title || "Title 404 Not Found"}</Reveal>
							</h1>
						</div>

						<article className="prose dark:prose-invert max-w-none">
							<Reveal>
								<ContentHtml text={blog.content} />
							</Reveal>
						</article>
					</motion.div>

					{/* Author Section - Right Side */}
					<motion.div
						className="lg:w-1/3"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="sticky top-24 bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
								About the Author
							</h2>

							<div className="flex items-start space-x-4">
								<Reveal>
									<Avatar name={blog.author.name || "Unknown"} size="big" />
								</Reveal>
								<div>
									<h3 className="text-lg font-bold text-gray-900 dark:text-white">
										<Reveal>{blog.author.name || "Author Name"}</Reveal>
									</h3>
									<p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
										<Reveal>{blog.author.fun_fact || "No bio available"}</Reveal>
									</p>
								</div>
							</div>

							{blog.author.id === user.id && (
								<Reveal>
									<div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
										<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Post Actions</h3>
										<div className="flex space-x-3">
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => navigate(`/edit/${id}`)}
												className="flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium transition-colors"
											>
												<FiEdit2 className="mr-2" />
												Edit
											</motion.button>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={handleDeleteClick}
												className="flex items-center justify-center px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg text-sm font-medium transition-colors"
											>
												<FiTrash2 className="mr-2" />
												Delete
											</motion.button>
										</div>
									</div>
								</Reveal>
							)}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
const ContentHtml = ({ text }: { text: string }) => {
	console.log(text);
	return (
		<div
			className={`
        text-black dark:text-white
      [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-5 [&>h1]:text-gray-950 [&>h1]:dark:text-white
      [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h2]:dark:text-white
      [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-gray-800 [&>h3]:dark:text-gray-200
                 [&>p]:text-gray-700 [&>p]:dark:text-gray-200 [&>p]:mb-4 [&>p]:leading-relaxed
                 [&>strong]:font-bold [&>strong]:text-gray-900 [&>strong]:dark:text-white
                 [&>em]:italic [&>em]:text-gray-700 [&>em]:dark:text-gray-300
                 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:text-gray-700 [&>ul]:dark:text-gray-200
                 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:text-gray-700 [&>ol]:dark:text-gray-200
                 [&>a]:text-blue-600 [&>a]:dark:text-blue-400 [&>a]:underline [&>a]:hover:text-blue-800 [&>a]:dark:hover:text-blue-300
                 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:dark:border-gray-600 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:dark:text-gray-300
                 [&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:border [&_pre]:border-gray-200 [&_pre]:dark:border-gray-700
                 [&_code]:font-mono [&_code]:text-sm  
                 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-gray-800 [&_pre_code]:dark:text-gray-200
                 [&_:not(pre)_code]:bg-gray-200 [&_:not(pre)_code]:dark:bg-gray-700 [&_:not(pre)_code]:px-2 [&_:not(pre)_code]:py-1 [&_:not(pre)_code]:rounded [&_:not(pre)_code]:text-gray-800 [&_:not(pre)_code]:dark:text-gray-200
                 [&_.ql-syntax]:bg-gray-100 [&_.ql-syntax]:dark:bg-gray-800 [&_.ql-syntax]:text-gray-800 [&_.ql-syntax]:dark:text-gray-200
                 [&>img]:rounded-lg [&>img]:my-4 [&>img]:shadow-md [&>img]:max-w-full`}
			dangerouslySetInnerHTML={{
				__html: text || "Nothing Just Content is Empty Just Like Something 😑",
			}}
		/>
	);
};
