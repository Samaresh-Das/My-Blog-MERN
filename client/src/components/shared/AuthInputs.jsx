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
        className="block mb-2 text-[16px] md:text-[18px] font-bold text-neoBorder"
      >
        {props.label}
      </label>

      <div className="relative">
        <input
          id={props.id}
          value={props.value}
          className="bg-white border-2 border-neoBorder text-md rounded-md block w-full p-2.5 text-neoBorder outline-none focus:shadow-[4px_4px_0px_rgba(17,24,39,1)] hover:shadow-[4px_4px_0px_rgba(17,24,39,1)] placeholder:text-gray-500 font-semibold pr-10 transition-shadow"
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          type={inputType}
          required={props.required}
        />

        {isPasswordField && (
          <span
            className="absolute inset-y-0 right-3 flex items-center text-neoBorder cursor-pointer"
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
