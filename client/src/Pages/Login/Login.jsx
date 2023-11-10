import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../Login/Login.scss";

export default function Register() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
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
      Email: "",
      Password: ""
    };

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
      <form className='login_form' onSubmit={handleSubmit}>
        <h1 className="formHeading">Login</h1>
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
          Login
        </button>
        <div className='registerLink_Box'>
          Don't Have an Account ? <Link to={"/register"} className='register_Link'>Register</Link>
        </div>
      </form>
    </div>
  )
}

