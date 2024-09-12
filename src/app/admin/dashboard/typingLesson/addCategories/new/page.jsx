"use client"
import React, { useState } from 'react';
import axios from "@/app/api/axios";

const LessonForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const isFormValid = () => {
    const { name, description, metaTitle, metaKeywords, metaDescription } = formData;
    return name && description && metaTitle && metaKeywords && metaDescription;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form is valid
    if (!isFormValid()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    const token = localStorage.getItem("accessToken");

    try {
      // Sending POST request to API
      const response = await axios.post('api/v1/admin/createCategory', formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to create category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Lesson Category</h1>
        <button
          type="button"
          className={`bg-green-500 text-white px-4 py-2 rounded ${!isFormValid() && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && <div className="text-green-500 mt-4">Category created successfully!</div>}

      <form className="mt-6">
        <div className="bg-white p-6 rounded shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Name and Description</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Typing Basic"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 h-32"
              placeholder="Enter category description..."
            />
          </div>
        </div>

        {/* Meta Data Section */}
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Meta Data</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Enter meta title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Meta Keywords</label>
            <input
              type="text"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Enter meta keywords"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Meta Description</label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 h-24"
              placeholder="Enter meta description"
            />
          </div>
        </div>

        {/* Cancel and Submit Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 py-2 rounded ${!isFormValid() && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
