import { URLEntity } from "../../../../main/domain/entities/url.entity";
import { URLUseCase } from "../../../../main/domain/usecases/url.usecase";

jest.mock(
	"../../../../main/adapters/datasources/repositories/url.repository",
	() => {
		return {
			URLRepository: {
				async save(url: URLEntity): Promise<URLEntity> {
					return { ...url, id: btoa(`1`) };
				},
				async findByID(id: number): Promise<URLEntity> {
					return { original: "https://lucasjsdev.com" };
				},
			},
		};
	},
);

describe("URLUseCase", () => {
	it("should create and retrieve shortened URL", async () => {
		expect(
			await URLUseCase.createNewShortURL("https://lucasjsdev.com"),
		).toEqual({ shortened: `http://localhost:3030/${btoa("1")}` });
	});

	it("should retrieve the original URL", async () => {
		console.log(`http://localhost:3030/${btoa("1")}`);
		expect(await URLUseCase.findOriginalURL(`${btoa("1")}`)).toEqual(
			`https://lucasjsdev.com`,
		);
	});
});
