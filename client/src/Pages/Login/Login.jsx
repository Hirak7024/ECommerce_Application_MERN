import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Context } from '../../Utils/Context';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.scss";

export default function Register() {
  const { userData, setUserData, isLoggedIn, setIsLoggedIn, setWishListedProducts } = useContext(Context);
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
    } else if (!formData.Email.match(/^.+@gmail\.com$/)) {
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

  const loginUser = async () => {
    try {
      const response = await axios.post("/api/users/login", formData);
      const { userResponse, token } = response.data.data;
      // console.log(response.data.data);

      const userID = response.data.data.userResponse._id;
      const response2 = await axios.post("/api/products/getProducts/wishlisted", { userId: userID });
      setWishListedProducts(response2.data.wishlistedProducts);
      const message = response.data.message;
      setUserData({ userResponse, token })
      localStorage.setItem("authToken", token);
      toast.success(message);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await loginUser();
    }
  };

  return (
    <div className='login_Container'>
      <h1 className="close_mark_btn" onClick={() => navigate("/")} >X</h1>
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
            {showPassword ? <AiFillEye className='icon' onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
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

