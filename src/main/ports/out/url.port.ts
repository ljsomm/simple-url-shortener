import { URLEntity } from "../../domain/entities/url.entity";

export interface IURLPort {
	save(url: URLEntity): Promise<URLEntity>;
	findByID(id: string): Promise<URLEntity>;
}
