import AadhaarInfo from "../interfaces/iAadhaarInfo";

export const extractAadhaarInfo = (frontText: string, backText: string): AadhaarInfo => {
    const info: AadhaarInfo = {
        dob: null,
        aadhaarNumber: null,
        gender: null,
        name: null,
        address: null,
        mobileNumber: null
    };

    const cleanText = (text: string) => text.replace(/\s+/g, ' ').trim();
    const cleanFrontText = cleanText(frontText);
    const cleanBackText = cleanText(backText);

    console.log("CLEAN FRONT TEXT:\n", cleanFrontText);
    console.log("CLEAN BACK TEXT:\n", cleanBackText);


    const namePattern = /GOVERNMENTOFINDIA\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/i;
    const nameMatch = cleanFrontText.match(namePattern);
    info.name = nameMatch ? nameMatch[1].trim() : null;


    const dobPattern = /(?:Date of Birth|DOB)[^\d]*(\d{2}\/\d{2}\/\d{4})/i;
    const dobMatch = cleanFrontText.match(dobPattern);
    info.dob = dobMatch ? dobMatch[1] : null;


    const genderPattern = /\b(Male|Female)\b/i;
    const genderMatch = cleanFrontText.match(genderPattern);
    info.gender = genderMatch ? genderMatch[1].toUpperCase() : null;


    const aadhaarPattern = /(\d{4} \d{4} \d{4})/;
    const aadhaarMatch = cleanFrontText.match(aadhaarPattern);
    info.aadhaarNumber = aadhaarMatch ? aadhaarMatch[1] : null;


    const mobilePattern = /Mobile\s*No[:\-]?\s*(\d{10})/i;
    const mobileMatch = cleanFrontText.match(mobilePattern);
    info.mobileNumber = mobileMatch ? mobileMatch[1] : null;

    const addressPattern = /(C\/O:.*?)(\d{6})/s;
    const addressMatch = cleanBackText.match(addressPattern);
    if (addressMatch) {
        const rawAddress = `${addressMatch[1]} ${addressMatch[2]}`;
        info.address = cleanText(rawAddress)
            .replace(/[^\w\s,.-]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    return info;
};
