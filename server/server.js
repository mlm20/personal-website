// Import Express Framework
import express from "express";

// Import Middleware
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

// Import From Local Files
import Handler from "./handler.js";

// Setup default PORT
const PORT = process.env.PORT || 4000;

// Create express app
const app = express();

// Implement Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
    app.get("*", (req, res) => {
        res.sendFile("build/index.html", { root: __dirname });
    });
}

// Implement Handler for server-side algorithms
app.use("/", express.json());
app.post("/", function (req, res) {
    const request_object = req.body;

    Handler[request_object.type](request_object).then(
        function (response_object) {
            res.json(response_object);
        }
    );
});

app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT} – http://localhost:${PORT}`);
});