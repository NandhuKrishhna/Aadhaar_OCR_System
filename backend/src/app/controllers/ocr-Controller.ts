import { Request, Response } from "express";
import catchErrors from "../../utils/catchError";
import throwIfInvalid from "../../utils/throwIfInvalid";
import { BAD_REQUEST, OK } from "../../utils/http";
import { extractTextFromImage } from "../../utils/extractTextFromImage";
import { extractAadhaarInfo } from "../../utils/extractAadhaarInfo";
import { IOcrController } from "../../interfaces/iOcrController";
import { detectCardSide } from "../../utils/detectCardSide";

type MulterFiles = {
    [fieldname: string]: Express.Multer.File[];
};

export class OcrController implements IOcrController {
    constructor() { }


    postAadhaar = catchErrors(async (req: Request, res: Response) => {
        const files = req.files as MulterFiles | undefined;
        // console.log("Files : ", files);
        throwIfInvalid(files, BAD_REQUEST, "No files were uploaded.");
        const frontImage = files['frontImage']?.[0];
        const backImage = files['backImage']?.[0];

        throwIfInvalid(frontImage || backImage, BAD_REQUEST, "Both front side and backside images are required.");
        const frontImageText = await extractTextFromImage(frontImage.buffer);
        const backImageText = await extractTextFromImage(backImage.buffer);
        console.log("FrontImageText : ", frontImageText)
        console.log("BackImageText : ", backImageText)
        const frontSide = detectCardSide(frontImageText);
        const backSide = detectCardSide(backImageText);
        console.log("Detected Front Side Type:", frontSide);
        console.log("Detected Back Side Type:", backSide);

        throwIfInvalid(
            frontSide !== "invalid" || backSide !== "invalid",
            BAD_REQUEST,
            "Unable to detect Aadhaar side. Please upload a valid Aadhaar front or back image."
        );
        throwIfInvalid(frontSide === "front", BAD_REQUEST, "Front image does not look like the Aadhaar front side.");
        throwIfInvalid(backSide === "back", BAD_REQUEST, "Back image does not look like the Aadhaar back side.");

        const extractedInfo = extractAadhaarInfo(frontImageText, backImageText);
        console.log("ExtractedInfo", extractedInfo)
        throwIfInvalid(extractedInfo, BAD_REQUEST, "Unable to extract Aadhaar Info.");

        return res.status(OK).json({
            success: true,
            aadharInfo: extractedInfo
        })

    })


}