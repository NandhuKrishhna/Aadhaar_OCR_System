import { VercelRequest, VercelResponse } from "@vercel/node";
import App from "./app";

const app = new App();

export default (req: VercelRequest, res: VercelResponse) => {
    // This will handle the request using your Express app.
    app.app(req, res);
};
