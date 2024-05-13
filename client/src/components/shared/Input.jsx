import React, { Fragment } from "react";

const Input = React.forwardRef((props, ref) => (
  <Fragment>
    <label htmlFor={props.id} className={props.labelClass}>
      {props.label}
    </label>
    {props.element === "textarea" ? (
      <textarea
        ref={ref}
        id={props.id}
        className={props.className}
        placeholder={props.placeholder}
        type={props.type}
        required={props.required}
        onChange={props.onChange}
      />
    ) : (
      <input
        ref={ref}
        id={props.id}
        className={props.className}
        placeholder={props.placeholder}
        type={props.type}
        required={props.required}
        onChange={props.onChange}
      />
    )}
  </Fragment>
));

export default Input;
