import { ZodError } from "zod";

export function ZodErrorFormater(zodError: ZodError): string {
	return JSON.parse(zodError.message).reduce((accumulator, current) => {
		return {
			message: `${accumulator.message};${current.message}`,
		};
	}).message;
}
