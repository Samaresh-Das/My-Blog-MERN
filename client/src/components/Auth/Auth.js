import React, { Fragment, useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "../shared/Button";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [taglineError, setTaglineError] = useState("");
  const [httpError, setHttpError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateName = (name) => {
    if (!login) {
      if (!name) {
        setNameError("Name is required");
      } else {
        setNameError("");
      }
    }
  };
  const validateTagline = (name) => {
    if (!login) {
      if (!tagline) {
        setTaglineError("Name is required");
      } else {
        setTaglineError("");
      }
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateName(name);
    validateTagline(tagline);
    if (login) {
      if (!emailError && !passwordError) {
        const res = await fetch(
          "https://dev-blog-p5s9.onrender.com/api/user/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          return setHttpError(data.message);
        } else {
          setHttpError("");
          auth.login(data.userId, data.token);
          localStorage.setItem("userPhoto", data.profilePicture);
          history.push("/");
        }
      }
    } else {
      if (!emailError && !passwordError && !nameError) {
        // your code to submit the form goes here
        const res = await fetch(
          "https://dev-blog-p5s9.onrender.com/api/user/new",
          {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              password,
              tagline,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          return setHttpError(data.message);
        } else {
          setHttpError("");
          auth.login(data.userId, data.token);
          localStorage.setItem("userPhoto", data.profilePicture);
          history.push("/");
        }
      }
    }
  };

  const loginSwitchHandler = () => {
    setHttpError("");
    setLogin(!login);
  };

  return (
    <Fragment>
      <div className="hidden md:inline-block md:relative ">
        <div className=" absolute top-[80px] left-[180px]">
          <Link to="/">
            <IoIosArrowBack className="text-white text-[24px] " />
          </Link>
        </div>
      </div>
      <div className="flex items-center h-screen">
        <form
          className="mx-auto auth-form px-[30px] md:px-[150px] py-[40px] md:py-[80px] rounded-[29px] border border-white shadow-xl shadow-blue-500/20"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white patrick-hand text-center text-[30px] mb-[20px]">
            {login ? "Login" : "Sign Up"}
          </h1>
          <div className="mb-6 md:w-[350px] w-[250px]">
            <label
              htmlFor="email"
              className="block mb-2 text-[16px] md:text-[18px] font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(event) => validateEmail(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
            />
            {emailError && (
              <div className="mt-1 text-sm text-[#e01e37]">{emailError}</div>
            )}
          </div>
          {!login && (
            <Fragment>
              <div className="mb-6 md:w-[350px]">
                <label
                  htmlFor="name"
                  className="block mb-2 text-[16px] md:text-[18px] font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(event) => validateName(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                />
                {nameError && (
                  <div className="mt-1 text-sm text-[#e01e37]">{nameError}</div>
                )}
              </div>
              <div className="mb-6 md:w-[350px]">
                <label
                  htmlFor="tagline"
                  className="block mb-2 text-[16px] md:text-[18px] font-medium text-gray-900 dark:text-white"
                >
                  Your Designation or Tagline
                </label>
                <input
                  type="tagline"
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  onBlur={(event) => validateTagline(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="MERN Developer"
                />
                {taglineError && (
                  <div className="mt-1 text-sm text-[#e01e37]">
                    {taglineError}
                  </div>
                )}
              </div>
            </Fragment>
          )}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-[16px] md:text-[18px] font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(event) => validatePassword(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {passwordError && (
              <div className="mt-1 text-sm text-[#e01e37]">{passwordError}</div>
            )}
          </div>
          {httpError && (
            <h3 className="text-center text-[#caf0f8] my-4">{httpError}</h3>
          )}
          {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div> */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className=" w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {login ? "Login" : "Sign Up"}
            </Button>
          </div>
          <h3 className="text-center text-white text-[15px] mt-[20px]">
            {login ? "Don't have an account?" : "Already Signed up?"}{" "}
            <span className="text-lime-500">
              <button onClick={loginSwitchHandler} type="button">
                {login ? "Sign Up" : "Login"}
              </button>
            </span>
          </h3>
        </form>
      </div>
    </Fragment>
  );
};

export default Auth;
