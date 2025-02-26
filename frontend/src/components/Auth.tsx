import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { SignupInput } from "@piyush_007/medium_cl";
import { useState } from "react";
import axios from "axios";
import { DEV_BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    setLoading(true);
    if (type === "signup") {
      if (postData.password.length < 6) {
        alert("Password too short");
        setLoading(false);
        return;
      }
    }
    try {
      const response = await axios.post(
        `${DEV_BACKEND_URL}/api/v1/user/${type}`,
        postData
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert("Invalid Credentials");
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-600 font-mono">
      <div className="flex flex-col justify-center align-middle bg-gray-300 p-8 rounded-lg shadow-lg bg-opacity-90 border-2 border-gray-500 w-full max-w-md">
        <div className="text-black text-xl sm:text-3xl font-bold mb-4">
          {type === "signup" ? "Create an Account" : "SignIn to Your Account"}
        </div>
        {type === "signup" ? (
          <div className="text-gray-700 text-base sm:text-xl font-extralight mb-4">
            Already have an{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Account?
            </span>
          </div>
        ) : (
          <div className="text-gray-700 text-base sm:text-xl font-extralight mb-4">
            Don't have an{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Account?
            </span>
          </div>
        )}
        <div className="my-2 mt-5">
          <Input
            placeholder={"Enter Your Email"}
            text={"Email:"}
            type={"email"}
            onChange={(e) => {
              setPostData((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          {type === "signup" && (
            <>
              <Input
                placeholder={"Username"}
                text={"Name:"}
                type={"text"}
                onChange={(e) => {
                  setPostData((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            </>
          )}
          <Input
            placeholder={"Enter Your Password"}
            text={"Password:"}
            type={"password"}
            onChange={(e) => {
              setPostData((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex align-middle justify-center w-full mt-2">
          <Button
            text={type === "signup" ? "SIGN UP" : "SIGN IN"}
            loading={loading}
            onClick={() => {
              setLoading(true);
              sendRequest();
            }}
          />
        </div>
      </div>
    </div>
  );
};
