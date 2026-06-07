import { bot } from "../services/telegram.service";
import { getLog } from "../controllers/websiteLog.controller";
import { log } from "node:console";

export const sendAlert = async (userId: string, chatId: string) => {
    const data = await getLog(userId)
    console.log(data)
    const logs = data?.data || [];
    if (logs.length === 0) {
        console.log("No logs to monitor.");
        return;
    }
    for (const log of logs) {
        await bot.api.sendMessage(
            chatId,
            `Website: ${log.website}\nLogs: ${JSON.stringify(log.logs, null, 2)}`
        );
    }

}