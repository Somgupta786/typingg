"use client";
import React from "react";
import { FaCheck, FaCross, FaHome } from "react-icons/fa";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
const Page = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleAndDescription, setTitleAndDescription] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner"); // Default value
    const [sections, setSections] = useState([
      { title: '', description: '', layout: 'BoxLayout' },
    ]);

    const [details, setDetails] = useState({
        duration: "0min 0sec",
        comments: "closed",
        embedding: "disallowed",
        featured: "no",
        private: "no",
        publish: "new",
        others: false
      });
    
      const handleTitleChange = (index, value) => {
        const newSections = [...sections];
        newSections[index].title = value;
        setSections(newSections);
      };
    
      const handleDescriptionChange = (index, value) => {
        const newSections = [...sections];
        newSections[index].description = value;
        setSections(newSections);
      };
    
      const handleLayoutChange = (index, layout) => {
        const newSections = [...sections];
        newSections[index].layout = layout;
        setSections(newSections);
      };
    
      const handleAddSection = () => {
        setSections([...sections, { title: '', description: '', layout: 'BoxLayout' }]);
      };
    
      const handleDeleteSection = (index) => {
        if (sections.length > 1) {
          setSections(sections.filter((_, i) => i !== index));
        }
      };
    
    
      const handleSubmit = async () => {
        const data = {
            title,
            description,
            titleAndDescription: `${title} - ${description}`,
            metaTitle,
            metaDescription,
            difficulty, // Update if needed
            chapters: sections.map(section => ({
                title: section.title,
                description: section.description,
                layout: section.layout,
                difficulty: section.difficulty // Include difficulty here
            }))
        };
    console.log(data)
        try {
            const response = await axios.post('https://typing.varankit.tech/api/v1/practice-test', data);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };
    



  return (
    <div className="flex flex-col  w-full h-full bg-white font-normal">
      <div className="flex justify-between bg-green-50 p-3 text-black border-y-[1px] border-gray-400">
        <div className="font-medium">Edit Lesson</div>
        <div className=" flex gap-2 mr-4">
          <div className=" text-black px-1 cursor-pointer">Cancel</div>
          <div onClick={handleSubmit} className="border-2 flex items-center justify-center flex-nowrap gap-1 border-green-400 text-green-400 px-1 cursor-pointer">
            <FaCheck className=" " /> <p>save</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-3 text-black border-y-[1px] border-gray-400 text-sm" >
        <div className="font-medium flex flex-nowrap items-center justify-center gap-2">
          <FaHome/> <p className=" font-bold">Home</p> <span>/</span> <p className="font-bold">Lessons</p> <span>/</span> <p className=" flex flex-nowrap">Edit Lesson</p>

        </div>
     
      </div>

      <div className="flex md:flex-col-reverse md:space-x-4 p-4">
     
     
      {/* Main Content */}
      <div className="  flex-1 md:w-[60vw] space-y-6 text-black">

        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-md font-semibold mb-2">Lesson Overview</h2>
          <hr className="border-b-2 border-gray-300 mb-4" />
           <div className="flex flex-col">
           <label className="mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          </div>
          <div className=" flex flex-col">
          <label className="mb-1 text-sm font-medium">Lesson Introduction</label>
          <textarea
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="2"
          />

              </div>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-md font-semibold mb-2">Title and Description</h2>
      <hr className="border-b-2 border-gray-300 mb-4" />
      <input
        type="text"
        placeholder="Title Name"
        value={titleAndDescription}
        onChange={(e) => setTitleAndDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      {/* Display permalink if title is not empty */}
    
        <div className="mt-4 text-gray-600">
          Permalink:{" "}
          <a
            href={`https://www.typedojo.com/${titleAndDescription.replace(/\s+/g, '-').toLowerCase()}.html`}
            className=" hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`https://www.typedojo.com/${titleAndDescription.replace(/\s+/g, '-').toLowerCase()}.html`}
          </a>
        </div>
    
       </div>

       <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-md font-semibold mb-2">Video Details</h2>
      <hr className="border-b-2 border-gray-300 mb-4" />
      <div className="flex flex-wrap gap-3 text-[0.85rem] mb-1">
        <div className="flex">
          <h3 className="font-medium">Tags</h3>
         
        </div>
        <div className="flex">
          <h3 className="font-medium">Duration:</h3>
          <div className=" bg-blue-100 px-[0.2rem] text-blue-500 h-[1.2rem]">
            {details.duration}
          </div>
        </div>
        <div className="flex ">
          <span className="font-medium mr-1">Comments:</span>
          <span className=" bg-blue-100 px-[0.2rem] text-blue-500 h-[3vh]" >{details.comments}</span>
        </div>
        <div className="flex ">
          <span className="font-medium mr-1">Embedding:</span>
          <span className=" bg-blue-100 px-[0.2rem] text-blue-500 h-[3vh]">{details.embedding}</span>
        </div>
        <div className="flex ">
          <span className="font-medium mr-1">Featured:</span>
          <span className=" bg-blue-100 px-[0.2rem] text-blue-500 h-[3vh]">{details.featured}</span>
        </div>
        <div className="flex ">
          <span className="font-medium mr-1">Private:</span>
          <span className=" bg-blue-100 px-[0.2rem] text-blue-500 h-[3vh]">{details.private}</span>
        </div>
        <div className="flex ">
          <span className="font-medium mr-1">Publish:</span>
          <span className=" bg-blue-100 px-[0.2rem] text-blue-500 h-[3vh]">{details.publish}</span>
        </div>
        <div className="flex ">
          <span className="font-medium mr-1">Others:</span>
          <button className="bg-gray-200 p-1 h-[3vh] rounded-md text-gray-600">
             ▼
          </button>
        </div>
      </div>
     
      <hr className="border-b-2 border-gray-300 mb-4" />
      <div>
        <h3 className="font-medium mb-2">Video Tag</h3>
        <input
          type="text"
          placeholder="Add video tag"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
   

    <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-md font-semibold mb-2">Meta Details</h2>
          <hr className="border-b-2 border-gray-300 mb-4" />
           <div className="flex flex-col">
           <label className="mb-1 text-sm font-medium"> Meta Title</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          </div>
          <div className=" flex flex-col">
          <label className="mb-1 text-sm font-medium">Meta Description</label>
          <textarea
            placeholder=""
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
        
          />

              </div>
        </div>
   
       
        {sections.map((section, index) => (
        <div key={index} className="p-4 bg-white shadow-md rounded-md mb-4 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold mb-2">{`Section ${index + 1}`}</h2>
            {index > 0 && (
              <>
                <button
                  onClick={() => handleDeleteSection(index)}
                  className="text-xl text-black hover:text-red-600"
                >
                  <MdDeleteForever />
                </button>
              </>
            )}
          </div>

          <hr className="border-b-2 border-gray-300 mb-4" />
          <div className="flex flex-col mb-4">
            <label className="mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1 text-sm font-medium">Embed Code</label>
            <textarea
              value={section.description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="2"
            />
            <p className="text-gray-600 text-sm mt-2">
              Accepted HTML tags: iframe, embed
            </p>
          </div>

          <div className="mb-4 text-sm font-medium">Select Layout</div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-2 flex-nowrap">
            <button
              onClick={() => handleLayoutChange(index, 'BoxLayout')}
              className={`p-2 w-[7rem] relative h-[2.5rem] rounded-sm ${section.layout === 'BoxLayout' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <span
                className={`absolute ${section.layout === 'BoxLayout' ? 'right-1' : 'left-1'} bottom-[0.15rem] bg-white w-[3rem] h-[2.2rem]`}
              ></span>
              
            </button>
            <p>Box Layout</p>
            </div>
            <div className="flex gap-2 flex-nowrap">
            <button
              onClick={() => handleLayoutChange(index, 'LineLayout')}
              className={`p-2 w-[7rem] relative h-[2.5rem] rounded-sm ${section.layout === 'LineLayout' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <span
                className={`absolute ${section.layout === 'LineLayout' ? 'right-1' : 'left-1'} bottom-[0.15rem] bg-white w-[3rem] h-[2.2rem]`}
              ></span>
              
            </button>
            <p>Line Layout</p>
            </div>
          </div>
        </div>
      ))}
      
    

      <div className="mb-4">
        <button
          onClick={handleAddSection}
          className="  md:w-[50vw] w-[10vw] text-sm  bg-blue-500 text-white py-1 rounded-sm"
        >
          Add embed code
        </button>
      </div>

      </div>

      {/* Sidebar */}
     <div className="w-[20vw] h-[25vh]   bg-white shadow-md p-4 rounded-md mb-6 md:mb-0">
        <h2 className="text-xl font-semibold">Category</h2>
        <hr className="border-b-2 border-gray-300 my-4" />
        <div className="flex items-center border border-gray-300  rounded-md p-2">
          <div className= " flex text-sm flex-nowrap text-center items-center text-gray-600 mr-2 border-2   gap-1 bg-gray-200"> <span>Typic basics</span> <span><FaCheck/></span> </div>
          
        </div>
      </div>
    </div>

    </div>
  );
};

export default Page;
