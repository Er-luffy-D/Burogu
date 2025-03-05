import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Bounce, toast } from "react-toastify";
import { DEV_BACKEND_URL } from "../config";
import axios from "axios";
import { UpdateInput } from "@piyush_007/medium_cl";
import { Toasts } from "../components/Toasts";

export const Profile = () => {
  return (
    <div>
      <Appbar />
      <div className="mt-2 h-screen bg-gradient-to-b from-white via-fuchsia-200  to-violet-400">
        <div className="flex justify-center align-middle mt-4 text-3xl font-mono  font-bold text-slate-700">
          Edit Profile
        </div>
        <div className="flex justify-center align-middle mt-4 p-4">
          <div className="flex flex-col justify-center align-middle border-b-slate-500 border-slate-800 border-dashed border-4 rounded-lg  mt-4 w-full max-w-screen-md p-10">
            <p className="m-2 text-retro">Change Username:</p>
            <Change placeholder="Username" fieldKey="name" />
            <p className="m-2 text-retro">Change Bio:</p>
            <Change placeholder="Bio" fieldKey="funFact" />
            <p className="m-2 text-retro">Change Password🔑:</p>
            <Change placeholder="Password" fieldKey="password" />
          </div>
        </div>
      </div>
      <Toasts />
    </div>
  );
};

const request = async (data: UpdateInput) => {
  const response = await axios.put(
    `${DEV_BACKEND_URL}/api/v1/user/edit`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.status == 200) {
    localStorage.setItem("user_info", "");
  }
  return response;
};

const Change = ({
  placeholder,
  fieldKey,
}: {
  placeholder: string;
  fieldKey: string;
}) => {
  const [data, setdata] = useState<Record<string, string>>({ [fieldKey]: "" });
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
        theme: "dark",
        transition: Bounce,
      }
    );

  return (
    <div className="m-2 w-full">
      <div className="flex items-center max-w-lg mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            value={data.fieldKey}
            type="text"
            id="simple-search"
            onChange={(e) => setdata({ [fieldKey]: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5    "
            placeholder={placeholder}
            required
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            notify("Changes Saved!");
            setdata({ [fieldKey]: "" });
          }}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Change
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};
