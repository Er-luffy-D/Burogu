import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { infoAtom } from "../store/atom/Information";
import { useFetchUserInfo } from "../hooks";
import { Loading_Screen } from "./loader";
import { Appbar } from "./Appbar";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const { loading } = useFetchUserInfo();
	const user = useRecoilValue(infoAtom);
	const token = localStorage.getItem("token");

	if (loading) {
		return (
			<div>
				<Appbar />
				<div className="flex justify-center items-center h-screen dark:bg-gradient-to-b dark:from-gray-800   dark:to-slate-950">
					<Loading_Screen />
				</div>
			</div>
		);
	}

	if (!token || user.id === "Unknown") {
		localStorage.removeItem("token");
		localStorage.removeItem("user_info");
		return <Navigate to="/signin" replace />;
	}

	return children;
};
export default RequireAuth;
