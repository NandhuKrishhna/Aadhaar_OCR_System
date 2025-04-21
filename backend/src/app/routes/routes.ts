import { Router } from "express";
import { OcrController } from "../controllers/ocr-Controller";
import upload from "../../utils/multer";

const ocrController = new OcrController();

const router = Router();
router.get("/test", (req, res) => {
    res.status(200).json({ message: "Hello from OCR API" });
});
router.post("/parsse-aadhar", upload.fields([{ name: 'frontImage' }, { name: "backImage" }]), ocrController.postAadhaar);

export default router;
