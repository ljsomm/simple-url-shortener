import { Router } from "express";
import { URLController } from "../controllers/url.controller";
import { IRouterFactory } from "../../interfaces/IRouterFactory";

export const URLRouterFactory: IRouterFactory = {
	create(): Router {
		const router = Router();
		router.get("/:shorten", URLController.show);
		router.post("/shorten", URLController.create);
		return router;
	},
};
