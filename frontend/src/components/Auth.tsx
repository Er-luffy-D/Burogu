import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
export const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center bg-gray-600 font-mono">
      <div className="flex flex-col justify-center align-middle">
        <div className="text-black text-xl sm:text-3xl font-bold">
          Create an Account
        </div>
        <div className="text-white text-lg sm:text-2xl font-extralight">
          Already have an{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline  "
            onClick={() => {
              navigate("/signin");
            }}
          >
            {" "}
            Account?
          </span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="my-2 mt-5">
            <Input
              placeholder={"Enter Your Email"}
              text={"Email:"}
              type={"email"}
            />

            <Input
              placeholder={"Enter Your Password"}
              text={"Password:"}
              type={"password"}
            />
            <Input
              placeholder={"Confirm Your Password"}
              text={"Confirm Your Password:"}
              type={"password"}
            />
          </div>
          <div className="flex align-middle justify-center w-full">
            <Button text="SIGNUP" />
          </div>
        </form>
      </div>
    </div>
  );
};
