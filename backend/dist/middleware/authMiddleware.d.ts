import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    userId?: number;
    userEmail?: string;
    user?: any;
}
declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export default authMiddleware;
