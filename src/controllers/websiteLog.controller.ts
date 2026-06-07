import { Website } from "../models/Website";
import { WebsiteLog } from "../models/WebsiteLog";

export const createLog = async (websiteId: string, statusCode: number, responseTime: Number, isUp: boolean) => {
    try {
        await WebsiteLog.create({
            websiteId: websiteId,
            statusCode: statusCode,
            responseTime: responseTime,
            IsUp: isUp
        })
    } catch { }
}
export const getLog = async (user_id: string) => {
    try {
        const urls = await Website.find({ userId: user_id })
        const timeHaveToCheck = new Date(Date.now() - 30 * 60 * 1000)
        const logs: any[] = [];
        for (const url of urls) {
            const log = await WebsiteLog.find({ websiteId: url.id, createdAt: { $gte: timeHaveToCheck } }).sort({ createdAt: -1 });
            logs.push({
                website: url.url,
                logs: {
                    StatusCode: log[0].statusCode,
                    isUp: log[0].IsUp,
                    responseTime: log[0].responseTime
                }
            });
        }
        return {
            success: true,
            message: 'logs fetch successfully',
            data: logs
        }
    } catch { }
}

