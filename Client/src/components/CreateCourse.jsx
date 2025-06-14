import { useRef, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const nav = useNavigate();
  const fileRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function click() {
    fileRef.current.click();
  }

  function validateFields() {
    if (!title.trim()) {
      setErrorMessage("Title is required");
      setError(true);
      return false;
    }
    if (!category) {
      setErrorMessage("Category is required");
      setError(true);
      return false;
    }
    if (!level) {
      setErrorMessage("Level is required");
      setError(true);
      return false;
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setErrorMessage("Valid price is required");
      setError(true);
      return false;
    }
    setError(false);
    setErrorMessage("");
    return true;
  }

  async function draft() {
    if(!validateFields()) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post("http://localhost:3000/create/course", {
        title: title.trim(),
        description: description.trim(),
        category,
        level,
        price: parseFloat(price), // Convert to number
        duration: duration.trim(),
        image: image ? image.name : "", // Handle null image
        isPublished: false // Use correct field name
      },{
        headers:{
          token:token
        }
      });
      nav("/creator/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to save draft");
      setError(true);
    }
  }

  async function publish() {
    if(!validateFields()) {
      return;
    }
    const token = localStorage.getItem('token');

    try {
      const requestData = {
        title: title.trim(),
        description: description.trim(),
        category,
        level,
        price: parseFloat(price), // Convert to number
        duration: duration.trim(),
        image: image ? image.name : "", // Handle null image
        isPublished: true // Use correct field name
      };
      
      
      await axios.post("http://localhost:3000/create/course", requestData,{
        headers: {
          token: token
        }
      });
      nav("/creator/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to publish course");
      setError(true);
    }
  }

  return (
    <div>
      <div className="flex ml-85 mt-10">
        <Link to="/creator/dashboard">
          <FiArrowLeft className="mt-5 h-6 w-8 text-gray-600 rounded-xl hover:bg-gray-200 cursor-pointer" />
        </Link>
        <div className="ml-4">
          <p className="font-medium text-2xl">Create new Course</p>
          <p className="text-gray-600 text-md">Fill in the Course details</p>
        </div>
      </div>
      <div className="w-210 h-190 bg-white ml-85 rounded-xl mt-5 pl-5">
        <p className="text-lg pt-4 font-medium">Course Information</p>
        <p className="text-sm mt-5 ">Course Title *</p>
        <input
          type="text"
          value={title}
          placeholder="Enter course title"
          className="border border-gray-300 rounded-lg mt-1 h-10 w-200 pl-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="text-sm mt-5 ">Description *</p>

        <textarea
          placeholder="Describe what students will Learn"
          className="border border-gray-300 rounded-lg mt-1 h-30 w-200 pl-2 pt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex">
          <div className="mt-5 text-sm">
            <p>Category *</p>
            <select
              className="mt-1 border border-gray-300 rounded-lg h-10 w-65 pl-2"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="developement">Developement</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="data science">Data Science</option>
              <option value="photography">Photography</option>
              <option value="music">Music</option>
            </select>
          </div>
          <div className="mt-5 text-sm">
            <p className="ml-3">Level *</p>
            <select
              className="mt-1 border border-gray-300 rounded-lg h-10 w-65 ml-2.5 pl-2"
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="mt-5 text-sm">
            <p className="ml-3">Price ($) *</p>
            <input
              type="number" // Changed to number input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-lg mt-1 h-10 w-65 pl-2 ml-2.5"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="mt-5 text-sm">
          <p>Duration *</p>
          <input
            type="text"
            placeholder="e.g. 3 hours 30 minutes"
            className="border border-gray-300 rounded-lg mt-1 h-10 w-200 pl-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mt-5 text-sm">
          <p>Thumbnail Image </p>
          <input
            type="file"
            accept="image/*"
            className=" hidden"
            ref={fileRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg mt-2 h-30 w-200 pl-2 cursor-pointer flex items-center justify-center text-gray-500 hover:bg-gray-100"
            onClick={click}
          >
            {image ? `Selected: ${image.name}` : "Click to upload image"}
          </div>
        </div>
        <div className="mt-5 text-sm">
          <p>Tags </p>
          <input
            type="text"
            placeholder="e.g. JavaScript, React, Web Development"
            className="border border-gray-300 rounded-lg mt-1 h-10 w-200 pl-2"
          />
        </div>
      </div>
      <div className="flex mb-20">
        <Link to="/creator/dashboard">
          <button className="bg-gray-100 ml-85 text-black rounded-lg h-10 w-32 mt-10 border border-gray-300 cursor-pointer hover:bg-gray-200">Cancel</button>
        </Link>
        <div onClick={draft} className=" flex bg-gray-100 ml-102 mt-10 text-black rounded-lg h-10 w-30 pl-2 cursor-pointer border border-gray-300 hover:bg-gray-200">
          <p className="ml-1 mt-2">Save as Draft</p>
        </div>
        <div className=" flex bg-black ml-4 mt-10 text-white rounded-lg h-10 w-40 cursor-pointer" onClick={publish}>
          <FiSave className=" h-6 w-6 mt-2 ml-2 text-white" />
          <p className="ml-1 mt-2">Publish Course</p>
        </div>
      </div>
      {error && (
        <p className="text-red-500 ml-85">{errorMessage || "Internal Network error"}</p>
      )}
    </div>
  );
}