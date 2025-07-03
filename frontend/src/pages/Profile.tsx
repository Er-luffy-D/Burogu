import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Bounce, toast } from "react-toastify";
import { PROD_BACKEND_URL } from "../config";
import axios from "axios";
import { UpdateInput } from "@piyush_007/medium_cl";
import { Toasts } from "../components/Toasts";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../store/atom/Information";
import { FiKey, FiUser, FiInfo, FiSave } from "react-icons/fi";

export const Profile = () => {
	const theme = useRecoilValue(themeAtom);

	return (
		<div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
			<Appbar />

			{/* floating particles (light mode only) */}
			<AnimatePresence>
				{theme === "light" && (
					<motion.div
						className="fixed inset-0 z-0 pointer-events-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.2 }}
						exit={{ opacity: 0 }}
					>
						{[...Array(20)].map((_, i) => (
							<motion.div
								key={i}
								className="absolute rounded-full bg-blue-400"
								style={{
									width: Math.random() * 8 + 4,
									height: Math.random() * 8 + 4,
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
								}}
								animate={{
									y: [0, Math.random() * 40 - 20],
									x: [0, Math.random() * 40 - 20],
								}}
								transition={{
									duration: Math.random() * 15 + 10,
									repeat: Infinity,
									repeatType: "reverse",
								}}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="container mx-auto px-4 py-8 relative z-10"
			>
				<div
					className={`max-w-2xl mx-auto rounded-xl shadow-lg overflow-hidden ${
						theme === "dark" ? "bg-gray-800" : "bg-white"
					}`}
				>
					{/* Card Header */}
					<motion.div
						className={`p-6 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1 }}
					>
						<motion.h1 className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
							Edit Profile
						</motion.h1>
						<motion.p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
							Update your account information
						</motion.p>
					</motion.div>

					{/* Card Body */}
					<div className="p-6 space-y-6">
						<Section title="Username" icon={<FiUser />} delay={0.2}>
							<Change placeholder="Enter new username" fieldKey="name" />
						</Section>

						<Section title="Bio" icon={<FiInfo />} delay={0.3}>
							<Change placeholder="Tell us something about yourself" fieldKey="funFact" />
						</Section>

						<Section title="Password" icon={<FiKey />} delay={0.4}>
							<Change placeholder="Enter new password" fieldKey="password" type="password" />
						</Section>
					</div>
				</div>
			</motion.div>

			<Toasts />
		</div>
	);
};

// Section Component
const Section = ({
	title,
	icon,
	children,
	delay = 0,
}: {
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
	delay?: number;
}) => {
	const theme = useRecoilValue(themeAtom);

	return (
		<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
			<div className={`flex items-center mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
				<span className="mr-2">{icon}</span>
				<h2 className="font-medium">{title}</h2>
			</div>
			{children}
		</motion.div>
	);
};

// Change Component
const Change = ({ placeholder, fieldKey, type = "text" }: { placeholder: string; fieldKey: string; type?: string }) => {
	const [data, setData] = useState<Record<string, string>>({ [fieldKey]: "" });
	const theme = useRecoilValue(themeAtom);

	const notify = (str: string) =>
		toast.promise(
			request(data),
			{
				pending: "Saving Changes...",
				success: str,
				error: "Error Saving Changes!",
			},
			{
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: theme,
				transition: Bounce,
			}
		);

	return (
		<div className="flex items-center">
			<input
				value={data[fieldKey] || ""}
				type={type}
				onChange={(e) => setData({ [fieldKey]: e.target.value })}
				className={`flex-grow p-3 rounded-lg border ${
					theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-800"
				} focus:outline-none focus:ring-2 focus:ring-purple-500`}
				placeholder={placeholder}
				required
			/>
			<motion.button
				onClick={() => {
					if (data[fieldKey]) {
						notify("Changes Saved!");
						setData({ [fieldKey]: "" });
					}
				}}
				disabled={!data[fieldKey]}
				className={`ml-3 p-3 rounded-lg ${
					data[fieldKey]
						? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
						: theme === "dark"
						? "bg-gray-600 text-gray-400"
						: "bg-gray-200 text-gray-500"
				}`}
				whileHover={data[fieldKey] ? { scale: 1.05 } : {}}
				whileTap={data[fieldKey] ? { scale: 0.95 } : {}}
			>
				<FiSave className="w-5 h-5" />
			</motion.button>
		</div>
	);
};

const request = async (data: UpdateInput) => {
	const response = await axios.put(`${PROD_BACKEND_URL}/api/v1/user/edit`, data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `${localStorage.getItem("token")}`,
		},
	});
	if (response.status == 200) {
		localStorage.setItem("user_info", "");
		setTimeout(() => {
			window.location.reload();
		}, 1500);
	}
	return response;
};
