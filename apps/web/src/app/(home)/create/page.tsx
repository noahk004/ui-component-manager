"use client"

import React, { useState } from "react";
import UploadState from "@/src/components/UploadState";

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    const presetTags = [
        "Button", "Form", "Layout", 
        "Navigation", "Animation", "Data Display", "Feedback",
        "Input", 
    ];

    const handleTagSelect = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag) 
                : [...prev, tag]
        );
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(title);
        console.log(description);
        console.log(selectedTags);
        console.log(isPrivate);
        console.log(selectedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="p-8">
            {" "}
            {/* Maybe make padding and title position more consistent with other pages */}
            <h1 className="text-2xl font-bold mb-6">Create Component</h1>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border bg-gray-200"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2">Description</label>
                    <textarea 
                        className="w-full p-2 border bg-gray-200 h-32 resize-none" 
                        value={description} onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div>
                    <label className="block mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedTags.map(tag => (
                            <span 
                                key={tag}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                            >
                                {tag}
                                <button 
                                    onClick={() => handleTagSelect(tag)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {presetTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleTagSelect(tag)}
                                className={`px-3 py-1 rounded-md text-sm ${
                                    selectedTags.includes(tag)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-2">File upload</label>
                    <p className="text-sm mb-2">
                        Upload the TS module containing the component. Ensure
                        that the file is a valid TypeScript file.
                    </p>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                            ${selectedFile ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept=".ts,.tsx"
                            onChange={handleFileChange}
                        />
                        {selectedFile ? (
                            <div>
                                <p className="text-green-600 font-medium">Selected file:</p>
                                <p className="text-sm mt-1">{selectedFile.name}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600">
                                    Drag and drop your file here, or click to select
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Supports .ts and .tsx files
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <UploadState state="loading" />{" "}
                {/* states are success, loading, error */}
                <div>
                    <p>Visibility</p>
                    <label className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            className="form-checkbox w-4 h-4"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                        />
                        <p className="text-sm">make my component private.</p>
                    </label>
                </div>
                <button className="px-6 py-2 bg-gray-200" onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default Create;
