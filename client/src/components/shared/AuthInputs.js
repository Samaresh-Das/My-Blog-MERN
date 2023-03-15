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
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      type={props.type}
      required={props.required}
    />
  </Fragment>
);

export default AuthInputs;
