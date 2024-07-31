import express from "express";
import config from "./config";
import { defineRoutes } from "./adapters/rest/routes";
import logger from "./config/logger.config";

const app = express();

defineRoutes(app);

app.listen(config.SERVER_PORT, () => {
	logger.info(`URL Shortener API running on port ${config.SERVER_PORT}`);
});
