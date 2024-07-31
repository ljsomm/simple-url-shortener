import logger from "../../../config/logger.config";
import { IRouterFactory } from "../../interfaces/IRouterFactory";
import { URLRouterFactory } from "./url.router";
import { Express } from "express";

const routerFactoryList: IRouterFactory[] = [URLRouterFactory];

export function defineRoutes(application: Express) {
	logger.info("Defining routes");
	routerFactoryList.forEach((factory) => {
		application.use(factory.create());
	});
}
