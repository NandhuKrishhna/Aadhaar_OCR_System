import App from "./app";
import { PORT } from "./utils/env";

const port = Number(PORT)
const app = new App();

app.startServer(port)