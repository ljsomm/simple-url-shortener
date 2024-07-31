import logger from "../../../config/logger.config";
import { URLEntity } from "../../../domain/entities/url.entity";
import { IURLPort } from "../../../ports/out/url.port";
import { connectionPool } from "../connections/mysql.connection";

export const URLRepository: IURLPort = {
	async save(url: URLEntity): Promise<URLEntity> {
		const connection = await connectionPool.getConnection();
		console.log(await connection.execute("SELECT 1;"));
		return null;
	},

	async findByID(id: string): Promise<URLEntity> {
		const connection = await connectionPool.getConnection();
		const result = await connection.execute(`
			SELECT 
				id, original 
			FROM 
				tb_url 
			WHERE id = ?`, [id]);
		console.log(result);
		return null;
	},
};
