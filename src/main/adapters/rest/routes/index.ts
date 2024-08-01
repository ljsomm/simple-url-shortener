import config from "../../../config";
import logger from "../../../config/logger.config";
import { IRouterFactory } from "../../interfaces/IRouterFactory";
import { rateLimiterMiddleware } from "../middlewares/rate-limiter.middleware";
import { URLRouterFactory } from "./url.router";
import { Express, json, urlencoded } from "express";

const routerFactoryList: IRouterFactory[] = [URLRouterFactory];
const middlewareList: any[] = [
	json(),
	urlencoded({ extended: false }),
	rateLimiterMiddleware({
		maxRequests: config.RATE_LIMIT_MAX_REQUEST_NUMBER,
		period: config.RATE_LIMIT_PERIOD_SECONDS * 1000,
	}),
];

export function defineRoutesAndMiddlewares(application: Express) {
	logger.info("Defining middlewares");
	middlewareList.forEach((middlware) => {
		application.use(middlware);
	});
	logger.info("Defining routes");
	routerFactoryList.forEach((factory) => {
		application.use(factory.create());
	});
}
