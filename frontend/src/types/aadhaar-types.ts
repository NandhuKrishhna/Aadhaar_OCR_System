export type AadhaarInfo = {
    dob: string;
    aadhaarNumber: string;
    gender: string;
    name: string;
    address: string;
    mobileNumber: string;
};

export type AadhaarResponse = {
    success: boolean;
    aadharInfo: AadhaarInfo;
};
export interface Props {
    info: AadhaarInfo
}

export interface ImageUploadProps {
    label: string
    preview: string | null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemove: () => void
}