// backend/api/parse-aadhar.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import { BAD_REQUEST, OK } from '../src/utils/http';
import throwIfInvalid from '../src/utils/throwIfInvalid';
import { extractTextFromImage } from '../src/utils/extractTextFromImage';
import { detectCardSide } from '../src/utils/detectCardSide';
import { extractAadhaarInfo } from '../src/utils/extractAadhaarInfo';

const upload = multer();

type MulterFiles = {
    [fieldname: string]: Express.Multer.File[];
};

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    upload.fields([{ name: 'frontImage' }, { name: 'backImage' }])(
        req as any,
        res as any,
        async (err) => {
            if (err) return res.status(500).json({ message: "Multer error", err });

            const files = (req as any).files as MulterFiles;
            const frontImage = files?.frontImage?.[0];
            const backImage = files?.backImage?.[0];

            try {
                throwIfInvalid(files, BAD_REQUEST, "No files were uploaded.");
                throwIfInvalid(frontImage || backImage, BAD_REQUEST, "Both front and back images are required.");

                const frontText = await extractTextFromImage(frontImage.buffer);
                const backText = await extractTextFromImage(backImage.buffer);

                const frontSide = detectCardSide(frontText);
                const backSide = detectCardSide(backText);

                throwIfInvalid(
                    frontSide !== "invalid" || backSide !== "invalid",
                    BAD_REQUEST,
                    "Unable to detect Aadhaar side. Please upload a valid Aadhaar front or back image."
                );
                throwIfInvalid(frontSide === "front", BAD_REQUEST, "Front image does not look like the Aadhaar front side.");
                throwIfInvalid(backSide === "back", BAD_REQUEST, "Back image does not look like the Aadhaar back side.");

                const extractedInfo = extractAadhaarInfo(frontText, backText);
                throwIfInvalid(extractedInfo, BAD_REQUEST, "Unable to extract Aadhaar Info.");

                return res.status(OK).json({
                    success: true,
                    aadharInfo: extractedInfo
                });
            } catch (err: any) {
                return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
            }
        }
    );
}
