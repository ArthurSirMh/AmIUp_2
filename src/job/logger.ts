import axios from "axios";
import { getUrls } from "../controllers/web.controller";
import { createLog } from "../controllers/websiteLog.controller";
import { bot } from "../services/telegram.service";
import { User } from "../models/User";
import { sendAlertEmail } from "../services/email.service";

export const logger = async () => {
    const data = await getUrls();
    const urls = data?.data || [];

    if (urls.length === 0) {
        console.log("No websites to monitor.");
        return;
    }
    for (const url of urls) {
        let startTime = Date.now();
        let responseTime = 0;
        let statusCode = 0;
        let isUp = false;
        try {
            const response = await axios.get(url.url, { timeout: 10000 });
            responseTime = Date.now() - startTime;
            statusCode = response.status;
            isUp = statusCode === 200;
        } catch (err: any) {
            responseTime = Date.now() - startTime
            if (axios.isAxiosError(err)) {
                statusCode = err.response?.status ?? 0;

                if (err.code === "ECONNABORTED") statusCode = 408;
            } else {
                statusCode = 0; // 
            }
            sendAlertEmail("mahmoodimahdi588@gmail.com",`${url.url} is Down⚠️`,'your server is down NOW❌!!!');
        }
        const user = await User.findById(url.userId);
        if (!user) {
            console.log({
                success: false,
                message: 'user not found',
                website: url.url
            });
            continue;
        }
        await createLog(url.id, statusCode, responseTime, isUp);
        const message = isUp
            ? `✅ Website is Up: ${url.url} (Status: ${statusCode})`
            : `⚠️ Website DOWN: ${url.url} (Status: ${statusCode})`;
        try { await bot.api.sendMessage(user.chatId, message); } catch {
            console.log('telegram error')
            continue
        }

    }
};