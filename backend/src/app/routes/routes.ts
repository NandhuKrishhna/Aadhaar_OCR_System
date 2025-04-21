import { Router } from "express";
import { OcrController } from "../controllers/ocr-Controller";
import upload from "../../utils/multer";


const ocrController = new OcrController();

const router = Router();
router.get("/test", (req, res) => {
    res.send("API is working and CORS is allowed");
});

router.post("/parsse-aadhar", upload.fields([{ name: 'frontImage' }, { name: "backImage" }]), ocrController.postAadhaar)

export default router;