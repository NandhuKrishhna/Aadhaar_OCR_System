import React from "react"
import { ImageUploadProps } from "../types/aadhaar-types"

const ImageUploader: React.FC<ImageUploadProps> = ({ label, preview, onChange, onRemove }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="flex flex-col space-y-2">
                <div className="relative border-2 border-dashed border-indigo-300 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                        <div className="flex justify-center">
                            <svg
                                className="h-10 w-10 text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">{label} of Aadhaar card</p>
                    </div>
                </div>

                {preview && (
                    <div className="mt-2 relative">
                        <img
                            src={preview}
                            alt={`${label} preview`}
                            className="h-40 w-full object-cover rounded-md"
                        />
                        <button
                            onClick={onRemove}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageUploader
