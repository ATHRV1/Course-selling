import axios from 'axios';
import { ArrowLeft, Trash2, X, Upload, Image } from 'lucide-react';
import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EditCourse() {
    const nav = useNavigate();
    const location = useLocation();
    const courseData = location.state?.course;
    const [photo, setPhoto] = useState(true);
    const [title, setTitle] = useState(courseData.title)
    const [description, setDescription] = useState(courseData.description)
    const [image, setImage] = useState(courseData.image)
    const [category, setCategory] = useState(courseData.category)
    const [level, setLevel] = useState(courseData.level)
    const [duration, setDuration] = useState(courseData.duration)
    const [price, setPrice] = useState(courseData.price)
    const [status, setStatus] = useState(courseData.isPublished ? 'Published' : 'Draft')
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    if (!courseData) {
        return (<div className="ml-170 mt-10 text-2xl text-red-500">Course not found</div>)
    }

    const handleDeleteCourse = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert("No authentication token found");
            return;
        }

        try {
            await axios.post("http://localhost:3000/delete/course",
                { courseId: courseData.courseId },
                { headers: { token } }
            );
            alert("Course deleted successfully");
            nav("/creator/dashboard");
            // Add any other logic like redirecting or refreshing
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.response?.data?.message || "Failed to delete course");
        }
    };

    const handleRemoveThumbnail = () => {
        setPhoto(false);
    };
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

    async function handleSaveChanges() {
        if (!validateFields()) {
            return;
        }
        const token = localStorage.getItem('token');
        try {
            await axios.post("http://localhost:3000/edit/course", {
                courseId: courseData.courseId,
                title: title.trim(),
                description: description.trim(),
                category,
                level,
                price: parseFloat(price), // Convert to number
                duration: duration.trim(),
                image: image ? image.name : "", // Handle null image
                isPublished: status == 'Published' ? true : false // Use correct field name
            }, {
                headers: {
                    token: token
                }
            });
            nav("/creator/dashboard");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to save draft");
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 mb-5">
                    <div className="flex items-center gap-3">
                        <Link to="/creator/dashboard">
                            <button
                                className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button></Link>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Edit Course</h1>
                            <p className="text-sm text-gray-500">Update course details</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDeleteCourse}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Enter course title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            placeholder="Enter course description"
                        />
                    </div>

                    {/* Course Thumbnail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Thumbnail
                        </label>

                        {/* Current Thumbnail Display */}
                        {photo && (
                            <div className="relative mb-4">
                                <img
                                    src={image || null}
                                    alt=""
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    onClick={handleRemoveThumbnail}
                                    className="cursor-pointer absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="hidden"
                                id="thumbnail-upload"
                            />
                            <label htmlFor="thumbnail-upload" className="cursor-pointer">
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Form Fields Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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

                        {/* Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Level
                            </label>
                            <select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                        </label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration('duration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="e.g., 42 hours"
                        />
                    </div>

                    {/* Status */}
                    <div className='cursor-pointer'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className=" cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                    {error && (
                        <p className="text-red-500 ml-1 mt-5">{errorMessage || "Internal Network error"}</p>
                    )}
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Link to="/creator/dashboard">
                            <button
                                className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button></Link>
                        <button
                            onClick={handleSaveChanges}
                            className="flex cursor-pointer py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <FiSave className=" h-5 w-5 mt-0.5 ml-2 text-white" />
                            <p className=' ml-2 mr-2'>Save Changes</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
