import { z } from "zod";

export const URLValidator = z
	.object({
		url: z
			.string({ required_error: "The request must contain URL." })
			.url({ message: "It must be a valid url" }),
	})
	.required();
