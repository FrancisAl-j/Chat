import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { LoginThunk } from "../redux/thunks/authThunk";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loginError } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const result = await dispatch(LoginThunk(formData));
    if (LoginThunk.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <main className="w-full h-[100svh] flex items-center justify-end">
      <form
        onSubmit={handleSubmit}
        className="form-container flex flex-col gap-7 bg-black p-4 mx-7 rounded-xl"
      >
        <header>
          <h1 className="text-center text-6xl text-white font-extrabold my-10">
            Sign in
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

        <button className="btn btn-outline btn-success">Sign in</button>

        {loginError && (
          <p className="text-red-950 bg-red-300 border-l-8 border-red-600 px-2">
            {loginError}
          </p>
        )}

        <p className="text-white">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-700">Sign up here.</span>
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Signin;
