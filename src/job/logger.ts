import axios from "axios";
import { Website } from "../models/Website";
import { url } from "node:inspector";
import { createLog } from "../controllers/websiteLog.controller";
import { bot } from "../services/telegram.service";
import { User } from "../models/User";
export const logger = async () => {
    const urls = await Website.find({});

    for (const url of urls) {


        const startTime = Date.now();
        const response = await axios.get(url.url, { timeout: 5000 });
        const responseTime = Date.now() - startTime;
        if (response.status != 200) {
            await createLog(url.id, response.status, responseTime, false)
            const user = await User.findById(url.userId)
            if (user) {
                await bot.api.sendMessage(user.chatId, `⚠️ Website DOWN: ${url.url} (Status: ${response.status})`)
            }
        }

    }
}