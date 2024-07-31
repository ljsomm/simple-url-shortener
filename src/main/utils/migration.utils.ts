import fs from "fs/promises";
import { Pool } from "mysql2/promise";
import logger from "../config/logger.config";

export async function runMigrations(
	connectionPool: Pool,
	migrationsPath: string,
	migrationsFiles: string[],
) {
	logger.info("Running migrations");
	const connection = await connectionPool.getConnection();

	migrationsFiles.forEach((file) => {
		const filePath = `${migrationsPath}/${file}`;
		fs.readFile(filePath).then(async (buffer) => {
			try {
				await connection.query(buffer.toString());
			} catch (error) {
				logger.error(`Error on run the migration ${filePath} ==> ${error}`);
			}
		});
	});

	logger.info("Migrations execution finished!");
}
