import React from "react"
import { Props } from "../types/aadhaar-types"

const AadhaarInfoCard: React.FC<Props> = ({ info }) => {
    return (
        <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-indigo-800">{info.name}</h3>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {info.gender}
                </span>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Aadhaar Number</p>
                        <p className="font-medium text-gray-800">{info.aadhaarNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium text-gray-800">{info.dob}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium text-gray-800">{info.mobileNumber}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800 whitespace-pre-line">{info.address}</p>
                </div>

                <div className="pt-4 flex justify-end">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AadhaarInfoCard
