import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { infoAtom } from "../store/atom/Information";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export const SignUpButton = ({ className = "" }: { className?: string }) => {
	const user = useRecoilValue(infoAtom);
	const navigate = useNavigate();

	const handleClick = () => {
		if (user.email === "Unknown") {
			navigate("/signup");
		} else {
			navigate("/dashboard");
		}
	};

	return (
		<motion.button
			className={`px-8 py-4 z-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group ${className}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleClick}
		>
			{user.email === "Unknown" ? "Sign Up Free" : "Go to Dashboard"}
			<FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
		</motion.button>
	);
};
