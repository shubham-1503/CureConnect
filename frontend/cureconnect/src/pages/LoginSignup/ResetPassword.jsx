import '../../pages/css/userProfileStyle.css';
import React, { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const ResetPassword = () => {

      const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
      });

    // function to validate form data 
    const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.newPassword) {
      toast.error("New Password is required ");
      return;
    } 
   else if (formData.newPassword.length < 8 || formData.newPassword.length > 16 ){
     toast.error("Passwords should contain 8 to 16 characters");
     return;
   }
    else if (! formData.confirmPassword ) {
      toast.error("Please confirm password");
      return;
    }
    else if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password should be same");
      return;
    }

    toast.success("Password updated successfully!");

    };

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    };


  return (
    <div className="wrapper">
    <div className="main_container">
      <div className="flexContainer">
      <div className="w-1/2 side_image">
        </div>

        <div className="w-1/2 div_right">
          <div className="input_box">
            <header>Reset Password</header>
            <form onSubmit={handleSubmit} className='submit_form'>
            <div className="input_field">
               <input type="password" className="input_container" id="newPassword" placeholder='New Password' 
                value={formData.newPassword}
                onChange={handleChange}/>
            </div>

            <div className="input_field">
              <input type="password" className="input_container"  id="confirmPassword" placeholder='Confirm Password' 
               value={formData.confirmPassword}
               onChange={handleChange}/>
            </div>
            <br />
            <div className="input_field">
              <input type="submit" className="submit_button" value="Confirm" />
              <ToastContainer />
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ResetPassword;