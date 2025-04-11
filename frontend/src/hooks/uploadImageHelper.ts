import { useState } from "react"
import { AadhaarResponse } from "../types/aadhaar-types"
import uploadAadhaarImages from "./useUploadAadhaarImages"

const useUploadImageHelper = () => {
    const [frontImage, setFrontImage] = useState<File | null>(null)
    const [backImage, setBackImage] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [response, setResponse] = useState<AadhaarResponse | null>(null)
    const [frontPreview, setFrontPreview] = useState<string | null>(null)
    const [backPreview, setBackPreview] = useState<string | null>(null)

    const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFrontImage(file)
            setFrontPreview(URL.createObjectURL(file))
        }
    }

    const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setBackImage(file)
            setBackPreview(URL.createObjectURL(file))
        }
    }

    const handleUpload = async () => {
        if (!frontImage || !backImage) {
            alert("Please select both front and back images.")
            return
        }

        try {
            setIsUploading(true)
            const result = await uploadAadhaarImages(frontImage, backImage)
            console.log("Upload success:", result)
            setResponse(result)
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setIsUploading(false)
        }
    }
    const handleClear = () => {
        setFrontImage(null)
        setBackImage(null)
        setFrontPreview(null)
        setBackPreview(null)
        setResponse(null)
    }
    return {
        isUploading,
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

    }
}
export default useUploadImageHelper