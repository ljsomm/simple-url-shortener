import { NextFunction, Request, Response } from "express";

const rateLimiterControlMap = new Map<string, Array<Date>>();

export const rateLimiterMiddleware = ({
	period,
	maxRequests,
}: {
	period: number;
	maxRequests: number;
}) => {
	return function (req: Request, res: Response, next: NextFunction) {
		const clientIP = req.socket.remoteAddress as string;
		rateLimiterControlMap.has(clientIP) && !!rateLimiterControlMap.get(clientIP)
			? rateLimiterControlMap.set(clientIP, [
					new Date(),
					...(rateLimiterControlMap.get(clientIP) as Date[]).filter((date) => {
						return date >= new Date(new Date().getTime() - period);
					}),
				])
			: rateLimiterControlMap.set(clientIP, [new Date()]);

		const currentClientAccessList = rateLimiterControlMap.get(
			clientIP,
		) as Date[];

		if (currentClientAccessList.length > maxRequests)
			return res.status(429).json({ message: "Requests exceeds the limit" });

		next();
	};
};
