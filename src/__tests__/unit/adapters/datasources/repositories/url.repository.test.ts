import { URLRepository } from "../../../../../main/adapters/datasources/repositories/url.repository";

const execute = jest.fn();

jest.mock("../../../../../main/adapters/datasources/connections/mysql.connection", () => {
	return {
		connectionPool: {
			getConnection() {
				console.log('gettign');
				return {
					execute,
					release: jest.fn()
				}
			}
		}
	}
})

describe('URLRepository', () => {
	it('should query and retrieve the data from database', async () => {
		execute.mockImplementation(() => {
			console.log(321)
			return [[{
				id: 1,
				original: ""
			}]]
		});
		expect((await URLRepository.findByID('1')).id).toBe(1);
	})
})