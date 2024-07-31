import { createPool } from "mysql2/promise";
import config from "../../../config";
import { runMigrations } from "../../../utils/migration.utils";
import path from "path";

export const connectionPool = createPool({
	host: config.DB_HOST,
	user: config.DB_USERNAME,
	password: config.DB_PASSWORD,
	database: config.DB_NAME,
});

const migrations = ["url_create_table.sql"];

runMigrations(
	connectionPool,
	config.MIGRATIONS_PATH || path.resolve(__dirname, "../sql/migrations"),
	migrations,
);

export default {
	connectionPool,
};
