import axios from "axios";

import { Website } from "../models/Website";
import { User } from "../models/User";
import { WebsiteLog } from "../models/WebsiteLog";
import { sendEmailAlert, sendTelegramAlert } from "../jobs/monitoring.job";
import { url } from "node:inspector";

export const monitoringService = async (websiteId: string) => {
    const website = await Website.findById(websiteId);
    if (!website) return;

    const user = await User.findById(website.userId);
    if (!user) return;

    const start = Date.now();

    let statusCode = 0;
    let isUp = false;
    let responseTime = 0;
    try {
        const response = await axios.get(website.url, {
            timeout: 10000,
        });
        statusCode = response.status;
        isUp = response.status === 200;
        responseTime = Date.now() - start;
        console.log(
            website.url,
            response.status,
            responseTime,

        )
    } catch (error: any) {
        responseTime = Date.now() - start;
        if (axios.isAxiosError(error)) {
            statusCode = error.response?.status ?? 0;
        } else {
            statusCode = 0;
        }
        isUp = false;
        console.log(
            website.url,
            responseTime,
        )
        sendEmailAlert(user.email, `Website ${website.url} is Down`, "Your WEBSITE is Down Now!!!")
    }
    try {
        const websiteLog = await WebsiteLog.create({
            websiteId: website.id,
            statusCode,
            responseTime,
            IsUp: isUp,
        });
        await sendTelegramAlert(websiteLog.id, user.chatId);

    } catch (err) {
        console.log("DB error:", err);
    }
};