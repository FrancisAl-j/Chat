import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { RegisterThunk } from "../redux/thunks/authThunk";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const { signupError } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(RegisterThunk(formData));
    if (RegisterThunk.fulfilled.match(result)) {
      setFormData({
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <main className="h-[100svh] w-full flex items-center justify-end">
      <form
        onSubmit={handleSubmit}
        className="bg-black form-container flex flex-col gap-7 p-4 rounded-xl mx-5"
      >
        <header>
          <h1 className="text-center text-6xl text-white font-extrabold my-10">
            Sign up
          </h1>
        </header>

        <div className="w-full">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="w-full">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="w-full">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="w-full">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className="btn btn-outline btn-success">Sign up</button>

        {signupError && (
          <p className="text-red-950 bg-red-300 border-l-8 border-red-600 px-2">
            {signupError}
          </p>
        )}

        <p className="text-white">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="text-blue-700">Sign in here.</span>
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
