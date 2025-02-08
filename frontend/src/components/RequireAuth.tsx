import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { infoAtom } from "../store/atom/Information";
import { useFetchUserInfo } from "../hooks";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  useFetchUserInfo();
  const user = useRecoilValue(infoAtom);
  const token = localStorage.getItem("token");

  if (!user || !token) {
    localStorage.removeItem("user_info");
    return <Navigate to="/signin" />;
  }

  return children;
};

export default RequireAuth;
