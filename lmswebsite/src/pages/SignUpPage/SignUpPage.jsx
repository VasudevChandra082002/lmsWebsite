import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import { DatePicker, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import SignUpImage from "../../assets/student.avif"; // Replace with your image path
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { uploadFileToFirebase } from "../../utils/uploadFileToFirebase";
import { signupUser } from "../../api/authApi";
import { getUserByAuthId } from "../../api/userApi";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    board: "",
    className: "",
    subject: "",
    phoneNumber: "",
    email: "",
    name: "",
    dob: "",
    password: "",
    gender: "",
    profileImage: null,
    duration: "",
    amount: "",
    type_of_batch: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const board = JSON.parse(localStorage.getItem("selectedBoard"))._id || {};
    const classData =
      JSON.parse(localStorage.getItem("selectedClass"))._id || {};
    const subject = JSON.parse(localStorage.getItem("selectedSubjects")) || "";
    const duration =
      JSON.parse(localStorage.getItem("selectedDuration")).duration || {};
    const amount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
    const type_of_batch =
      JSON.parse(localStorage.getItem("selectedBatch"))._id || "";

    setFormData((prev) => ({
      ...prev,
      board: board || "Not Selected",
      className: classData || "Not Selected",
      subject: subject || "Not Selected",
      duration: duration || "0 Months",
      amount: amount || 0,
      type_of_batch: type_of_batch || "",
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );
      const profileImageUrl = await uploadFileToFirebase(
        formData.profileImage,
        "studentProfile"
      );

      const data = {
        role: "student",
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
        class_id: formData.className,
        profile_image: profileImageUrl,
        phone_number: formData.phoneNumber,
        student_name: formData.name,
        studentGender: formData.gender,
        studentDOB: formData.dob,
        board_id: formData.board,
        amount: formData.amount,
        duration: formData.duration,
        type_of_batch: formData.type_of_batch,
        subject_id: formData.subject,
      };

      await signupUser(data);
      message.success("Registration Successful!");
      navigate("/paymentScreen");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      {/* Left Section */}
      <div className="signup-left">
        {/* <img src={SignUpImage} alt="Sign Up" /> */}
        <h2>Register To The Platform</h2>
        <p>Your Journey Begins Here</p>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleInputChange}
            required
          />
          <DatePicker
            placeholder="Date of Birth"
            onChange={(date, dateString) =>
              setFormData({ ...formData, dob: dateString })
            }
            style={{ width: "100%" }}
          />
          <div className="gender-group">
            <Radio.Group
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" onChange={handleFileUpload} required />
          </div>
          <button type="submit" className="signup-button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
