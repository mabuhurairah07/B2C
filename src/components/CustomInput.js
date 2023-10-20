import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, onChange } = props;
  
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        onChange={onChange}
       
      />
    </div>
  );
};

export default CustomInput;
