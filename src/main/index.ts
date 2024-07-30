import express from "express";

import { config } from "dotenv";

config();

const app = express();

app.post("/shorten", (request, response) => {
    response.json({
        newUrl: "mock.js"
    });
});

app.get("/:short_url", (request, response) => {
    response.json({
        newUrl: "mock.js"
    });
});

app.listen(process.env.SERVER_PORT || 3030, () => {
    console.log("URL SHORTENER HAS BEEN INITILAIZED");
});