import { useField } from "formik";
import React from "react";
import { BsLockFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdTitle } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";

type inputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
  tooltip?: string;
  textArea?: Boolean;
};

const InputField: React.FC<inputFieldProps> = ({
  size: _,
  tooltip,
  textArea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="inputContainer">
      <label>{props.label}</label>
      <div className="inputGroup">
        <div className="icon">
          {props.name === "username" ? (
            <FaUserAlt />
          ) : props.name === "email" ? (
            <MdEmail />
          ) : props.name === "password" || props.name === "confirmPassword" ? (
            <BsLockFill />
          ) : props.name === "title" ? (
            <MdTitle />
          ) : (
            <IoIosInformationCircle />
          )}
        </div>
        {textArea ? (
          <textarea placeholder={props.placeholder} className="textarea" />
        ) : (
          <input className="input" {...props} {...field} />
        )}
      </div>
      {error ? <div className="errorMsg">{error}</div> : null}
    </div>
  );
};
export default InputField;
