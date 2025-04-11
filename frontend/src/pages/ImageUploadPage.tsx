import type React from "react"
import useUploadImageHelper from "../hooks/uploadImageHelper"
import AadhaarInfoCard from "../components/UploadImage";
import UploadImageMessage from "../components/uploadImageMessage";
import UploadProcessing from "../components/UploadProcessing";
import ImageUploader from "../components/ImageUploader";


const ImageUploadPage: React.FC = () => {
    const { isUploading,
        response,
        frontPreview,
        backPreview,
        handleFrontImageChange,
        handleBackImageChange,
        handleUpload,
        frontImage,
        backImage,
        setBackImage,
        setFrontImage,
        setFrontPreview,
        setBackPreview,
        handleClear
    } = useUploadImageHelper();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Aadhaar Verification</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-6">Upload Aadhaar Images</h2>

                        <div className="space-y-6">
                            <ImageUploader
                                label="Front Image"
                                preview={frontPreview}
                                onChange={handleFrontImageChange}
                                onRemove={() => {
                                    setFrontPreview(null)
                                    setFrontImage(null)
                                }}
                            />

                            <ImageUploader
                                label="Back Image"
                                preview={backPreview}
                                onChange={handleBackImageChange}
                                onRemove={() => {
                                    setBackPreview(null)
                                    setBackImage(null)
                                }}
                            />


                            <div className="pt-4">
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading || !frontImage || !backImage}
                                    className={`w-full flex justify-center 
                                        items-center py-3 px-4 border border-transparent 
                                        rounded-md shadow-sm text-sm font-medium 
                                        text-white bg-indigo-600 hover:bg-indigo-700 
                                        focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 focus:ring-indigo-500 ${isUploading || !frontImage || !backImage ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isUploading ? (
                                        <UploadProcessing />
                                    ) : (
                                        "Upload Aadhaar"
                                    )}
                                </button>
                                {response && (
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
                                        onClick={() => handleClear()}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Response Display */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-indigo-600 mb-6">Aadhaar Information</h2>

                        {response ? (
                            <AadhaarInfoCard info={response.aadharInfo} />
                        ) : (
                            <UploadImageMessage />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUploadPage
