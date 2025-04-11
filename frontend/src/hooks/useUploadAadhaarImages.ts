// ✅ Rename this file: uploadAadhaarImages.ts
import axios from "axios";

const uploadAadhaarImages = async (frontImageFile: File, backImageFile: File) => {
    try {
        const formData = new FormData();
        formData.append('frontImage', frontImageFile);
        formData.append('backImage', backImageFile);

        const response = await axios.post('http://localhost:5000/api/parsse-aadhar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export default uploadAadhaarImages;
