import { config } from "dotenv";

config();

const configurations = {
	DB_NAME: process.env.DB_NAME || "db_url",
	DB_USERNAME: process.env.DB_USERNAME || "root",
	DB_PASSWORD: process.env.DB_PASSWORD || "strongpassword123",
	DB_HOST: process.env.DB_HOST || "localhost",
	SERVER_PORT: process.env.SERVER_PORT || 3030,
	MIGRATIONS_PATH: "",
	APP_URL: process.env.APP_URL || "localhost",
	RATE_LIMIT_PERIOD_SECONDS: parseInt(
		process.env.RATE_LIMIT_PERIOD_SECONDS || "60",
	),
	RATE_LIMIT_MAX_REQUEST_NUMBER: parseInt(
		process.env.RATE_LIMIT_MAX_REQUEST_NUMBER || "10",
	),
};

export default configurations;
