import { Router } from "express";

export interface IRouterFactory {
	create(): Router;
}
