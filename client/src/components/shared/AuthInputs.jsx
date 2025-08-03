import React, { Fragment, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthInputs = (props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = props.type === "password";

  const inputType = isPasswordField && showPassword ? "text" : props.type;

  return (
    <Fragment>
      <label
        htmlFor={props.id}
        className="block mb-2 text-[16px] md:text-[18px] font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>

      <div className="relative">
        <input
          id={props.id}
          value={props.value}
          className="bg-transparent border border-gray-300 text-sm rounded-lg block w-full p-2.5 text-gray-200 focus:border-gray-500 pr-10"
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          type={inputType}
          required={props.required}
        />

        {isPasswordField && (
          <span
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default AuthInputs;
