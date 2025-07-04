import { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/Button";
import { Appbar } from "../components/Appbar";
import { usePostBlog } from "../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Toasts } from "../components/Toasts";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../store/atom/Information";

export const Publish = () => {
	return (
		<div className="min-h-screen dark:bg-gray-900">
			<Appbar />
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">Create New Post</h1>
				<Post />
			</div>
			<Toasts />
		</div>
	);
};

export const Post = () => {
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const navigate = useNavigate();
	const theme = useRecoilValue(themeAtom);

	const { BlogPost, loading, message, status } = usePostBlog(title, content);

	const notify = useCallback(() => {
		toast.dismiss();
		if (status === "1") {
			toast.success("Post published successfully", {
				position: "bottom-right",
				theme: theme,
			});
		} else if (status === "2") {
			toast.error(message || "Failed to publish post", {
				position: "bottom-right",
				theme: theme,
			});
		}
	}, [status, message, theme]);

	useEffect(() => {
		notify();
		if (status === "1") {
			const timer = setTimeout(() => navigate("/blogs"), 1500);
			return () => clearTimeout(timer);
		}
	}, [status, navigate, notify]);

	const handleEditorChange = useCallback((value: string) => {
		setContent(value);
	}, []);

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<div className="space-y-6">
				<div>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Post title"
						required
					/>
				</div>

				<div className="dark:text-gray-200">
					<ReactQuill
						theme="snow"
						value={content}
						onChange={handleEditorChange}
						placeholder="Write your post content here..."
						className="rounded-lg border border-gray-200 dark:border-gray-700"
						modules={{
							toolbar: [
								[{ header: [1, 2, false] }],
								["bold", "italic", "underline"],
								[{ list: "ordered" }, { list: "bullet" }],
								["link"],
								["clean"],
							],
						}}
					/>
				</div>

				<div className="flex justify-center pt-4">
					<Button
						text={loading ? "Publishing..." : "Publish Post"}
						onClick={BlogPost}
						variant="other"
						loading={loading}
					/>
				</div>

				{message && (
					<div
						className={`mt-4 p-3 rounded-lg text-center ${
							status === "1"
								? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
								: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
						}`}
					>
						{message}
					</div>
				)}
			</div>
		</div>
	);
};
