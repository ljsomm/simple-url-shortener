import { IURLResponseDTO } from "../../adapters/dtos/url-response.dto";

export interface IURLPort {
	createNewShortURL(url: string): Promise<IURLResponseDTO>;
	findURL(id: string): void;
}
