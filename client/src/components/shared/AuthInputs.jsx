import React, { Fragment } from "react";

const AuthInputs = (props, ref) => (
  <Fragment>
    <label
      htmlFor={props.id}
      className="block mb-2 text-[16px] md:text-[18px] font-medium text-gray-900 dark:text-white"
    >
      {props.label}
    </label>

    <input
      id={props.id}
      value={props.value}
      className="bg-transparent border border-1 border-gray-300 text-sm rounded-lg  block w-full p-2.5 text-gray-200 focus:border-gray-500"
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      type={props.type}
      required={props.required}
    />
  </Fragment>
);

export default AuthInputs;
