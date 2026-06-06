import { WebsiteLog } from "../models/WebsiteLog";

export const createLog = async (websiteId: string, statusCode: number, responseTime: Number, isUp: boolean) => {
    try {
        WebsiteLog.create({
            websiteId: websiteId,
            statusCode: statusCode,
            responseTime: responseTime,
            IsUp: isUp
        })
    } catch { }
}

