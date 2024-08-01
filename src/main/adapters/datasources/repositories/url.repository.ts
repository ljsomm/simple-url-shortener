import logger from "../../../config/logger.config";
import { URLEntity } from "../../../domain/entities/url.entity";
import { IURLPort } from "../../../ports/out/url.port";
import { connectionPool } from "../connections/mysql.connection";

export const URLRepository: IURLPort = {
	async save(url: URLEntity): Promise<URLEntity> {
		const connection = await connectionPool.getConnection();
		const insertResult = await connection.execute(
			"INSERT INTO tb_url (original) VALUES (?);",
			[url.original],
		);

		connection.release();
		return { ...url, id: btoa(`${insertResult[0]["insertId"]}`) };
	},

	async findByID(id: string): Promise<URLEntity> {
		const connection = await connectionPool.getConnection();
		const result = await connection.execute(
			`
			SELECT 
				id, original 
			FROM 
				tb_url 
			WHERE id = ?`,
			[id],
		);
		return result[0][0];
	},
};
