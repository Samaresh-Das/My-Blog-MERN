import React, {
  Fragment,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import AuthInputs from "../shared/AuthInputs";
import Button from "../shared/Button";
import LoadingSpinner from "../shared/LoadingSpinner";

const initialState = {
  email: "",
  password: "",
  name: "",
  tagline: "",
  emailError: "",
  passwordError: "",
  nameError: "",
  taglineError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload, emailError: "" };
    case "SET_PASSWORD":
      return { ...state, password: action.payload, passwordError: "" };
    case "SET_NAME":
      return { ...state, name: action.payload, nameError: "" };
    case "SET_TAGLINE":
      return { ...state, tagline: action.payload, taglineError: "" };
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.payload };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "SET_NAME_ERROR":
      return { ...state, nameError: action.payload };
    case "SET_TAGLINE_ERROR":
      return { ...state, taglineError: action.payload };
    default:
      return state;
  }
}

const Auth = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [httpError, setHttpError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = useCallback(
    (e) => {
      dispatch({ type: "SET_EMAIL", payload: e.target.value });
      setHttpError("");
    },
    [dispatch]
  );
  const handlePasswordChange = useCallback(
    (e) => {
      dispatch({ type: "SET_PASSWORD", payload: e.target.value });
      setHttpError("");
    },
    [dispatch]
  );
  const handleNameChange = useCallback(
    (e) => {
      dispatch({ type: "SET_NAME", payload: e.target.value });
      setHttpError("");
    },
    [dispatch]
  );
  const handleTaglineChange = useCallback(
    (e) => {
      dispatch({ type: "SET_TAGLINE", payload: e.target.value });
      setHttpError("");
    },
    [dispatch]
  );

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!state.email) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "Email is required" });
      setLoading(false);
    } else if (!emailRegex.test(state.email)) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: "Invalid email format",
      });
      setLoading(false);
    } else {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "" });
    }
  };

  const validateName = () => {
    if (!login) {
      if (!state.name) {
        dispatch({ type: "SET_NAME_ERROR", payload: "Name is required" });
        setLoading(false);
      } else {
        dispatch({ type: "SET_NAME_ERROR", payload: "" });
      }
    }
  };
  const validateTagline = () => {
    if (!login) {
      if (!state.tagline) {
        dispatch({ type: "SET_TAGLINE_ERROR", payload: "Tagline is required" });
        setLoading(false);
      } else {
        dispatch({ type: "SET_TAGLINE_ERROR", payload: "" });
      }
    }
  };

  const validatePassword = () => {
    if (!state.password) {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: "Password is required" });
      setLoading(false);
    } else if (state.password.length < 8) {
      dispatch({
        type: "SET_PASSWORD_ERROR",
        payload: "Password should be at least 8 characters long",
      });
      setLoading(false);
    } else {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    validateEmail();
    validatePassword();
    validateName();
    validateTagline();
    if (login) {
      if (!state.emailError && !state.passwordError) {
        const res = await fetch(
          "https://dev-blog-p5s9.onrender.com/api/user/login",
          {
            method: "POST",
            body: JSON.stringify({
              email: state.email,
              password: state.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          return setHttpError(data.message);
        } else {
          auth.login(data.userId, data.token);
          localStorage.setItem("userPhoto", data.profilePicture);
          history.push("/");
          return setHttpError("");
        }
      }
    } else {
      if (
        !state.emailError &&
        !state.passwordError &&
        !state.nameError &&
        !state.taglineError
      ) {
        // your code to submit the form goes here
        const res = await fetch(
          "https://dev-blog-p5s9.onrender.com/api/user/new",
          {
            method: "POST",
            body: JSON.stringify({
              name: state.name,
              email: state.email,
              password: state.password,
              tagline: state.tagline,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          return setHttpError(data.message);
        } else {
          setLoading(true);
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
            <AuthInputs
              label="Email"
              type="email"
              id="email"
              value={state.email}
              onChange={handleEmailChange}
              onBlur={(event) => validateEmail(event.target.value)}
              placeholder="name@gmail.com"
            />
            {state.emailError && (
              <div className="mt-1 text-sm text-[#e01e37]">
                {state.emailError}
              </div>
            )}
          </div>
          {!login && (
            <Fragment>
              <div className="mb-6 md:w-[350px]">
                <AuthInputs
                  label="Your Name"
                  type="name"
                  id="name"
                  value={state.name}
                  onChange={handleNameChange}
                  onBlur={(event) => validateName(event.target.value)}
                  placeholder="Your name"
                />
                {state.nameError && (
                  <div className="mt-1 text-sm text-[#e01e37]">
                    {state.nameError}
                  </div>
                )}
              </div>
              <div className="mb-6 md:w-[350px]">
                <AuthInputs
                  label="Your Designation or Tagline"
                  type="tagline"
                  id="tagline"
                  value={state.tagline}
                  onChange={handleTaglineChange}
                  onBlur={(event) => validateTagline(event.target.value)}
                  placeholder="MERN Developer"
                />
                {state.taglineError && (
                  <div className="mt-1 text-sm text-[#e01e37]">
                    {state.taglineError}
                  </div>
                )}
              </div>
            </Fragment>
          )}
          <div className="mb-6">
            <AuthInputs
              label="Your Password"
              type="password"
              id="password"
              value={state.password}
              onChange={handlePasswordChange}
              onBlur={(event) => validatePassword(event.target.value)}
            />
            {state.passwordError && (
              <div className="mt-1 text-sm text-[#e01e37]">
                {state.passwordError}
              </div>
            )}
          </div>
          {httpError && (
            <h3 className="text-center text-[#caf0f8] my-4">{httpError}</h3>
          )}
          <div className="flex justify-center">
            {!loading ? (
              <Button
                type="submit"
                className=" w-full sm:w-auto px-5 py-2.5 text-center "
              >
                {login ? "Login" : "Sign Up"}
              </Button>
            ) : (
              <LoadingSpinner />
            )}
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
