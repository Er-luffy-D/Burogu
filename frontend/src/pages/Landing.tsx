import { useRecoilValue } from "recoil";
import { infoAtom } from "../store/atom/Information";
import { useFetchUserInfo } from "../hooks";

export default function Landing() {
  useFetchUserInfo();
  const user = useRecoilValue(infoAtom);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}
