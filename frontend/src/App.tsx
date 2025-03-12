import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Landing } from "./pages/Landing";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Publish } from "./pages/Publish";
import { Profile } from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";
import { MyBlogs } from "./pages/MyBlogs";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/blogs"
            element={
              <RequireAuth>
                <Blogs />
              </RequireAuth>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <RequireAuth>
                <Blog />
              </RequireAuth>
            }
          />
          <Route
            path="/publish"
            element={
              <RequireAuth>
                <Publish />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/MyBlogs"
            element={
              <RequireAuth>
                <MyBlogs />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
