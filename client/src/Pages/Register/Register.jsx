import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../Login/Login.scss";

export default function Register() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    Name: "",
    Email: "",
    Password: ""
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      Name: "",
      Email: "",
      Password: ""
    };

    // Name validation
    if (formData.Name.length < 3) {
      newErrors.Name = "*Name must have atleast 3 characters";
      isValid = false;
    }else if( !/^[a-zA-Z]+$/.test(formData.Name)) {
      newErrors.Name = "*Name must contain only alphabets";
      isValid = false;
    }

    // Email validation
    if (formData.Email.length === 0) {
      newErrors.Email = "*Email field can't be empty";
      isValid = false;
    }else if (!formData.Email.match(/^.+@gmail\.com$/)) {
      newErrors.Email = "*Enter a valid gmail address";
      isValid = false;
    }

    // Password validation
    if (formData.Password.length < 8) {
      newErrors.Password = "*Password must have atleast 8 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, submit the form and navigate
      navigate("/");
    }
  };

  return (
    <div className='login_Container'>
      <h1 className="close_mark_btn" onClick={()=>navigate("/")}>X</h1>
      <form className='login_form' onSubmit={handleSubmit}>
        <h1 className="formHeading">Register</h1>
        <div className="labelInput">
          <label htmlFor="name">Enter Your Name : </label>
          <input
            type="text"
            id='name'
            name='Name'
            value={formData.Name}
            onChange={handleChange}
          />
          <p className="error">{errors.Name}</p>
        </div>
        <div className="labelInput">
          <label htmlFor="email">Enter Your Email : </label>
          <input
            type="text"
            id='email'
            name='Email'
            value={formData.Email}
            onChange={handleChange}
          />
          <p className="error">{errors.Email}</p>
        </div>
        <div className="labelInput">
          <label htmlFor="password">Enter Your Password : </label>
          <div className="password_container">
            <input
              type={showPassword ? "text" : "password"}
              className='password_input'
              id='password'
              name='Password'
              value={formData.Password}
              onChange={handleChange}
            />
            {showPassword ? <AiFillEye className='icon' size={22} onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
          </div>
          <p className="error">{errors.Password}</p>
        </div>
        <button type='submit' className='login_btn'>
          Register
        </button>
        <div className='registerLink_Box'>
          Already Have an Account ? <Link to={"/login"} className='register_Link'>Login</Link>
        </div>
      </form>
    </div>
  )
}

