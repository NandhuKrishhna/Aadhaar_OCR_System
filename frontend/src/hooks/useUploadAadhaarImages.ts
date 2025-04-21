import axios from "axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";


const uploadAadhaarImages = async (frontImageFile: File, backImageFile: File) => {
    try {
        const formData = new FormData();
        formData.append('frontImage', frontImageFile);
        formData.append('backImage', backImageFile);

        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/parsse-aadhar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string; status: string }>;
        if (error.response && error.response.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong. Please try again.");
        }

    }
};

export default uploadAadhaarImages;

