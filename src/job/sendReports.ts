import { bot } from "../services/telegram.service";
import { getLog } from "../controllers/websiteLog.controller";
import { error, log } from "node:console";

export const sendAlert = async (userId: string, chatId: string) => {
    const data = await getLog(userId)
    const logs = data?.data || [];
    if (logs.length === 0) {
        console.log("No logs to monitor.");
        return;
    }
    for (const log of logs) {
        try {
            await bot.api.sendMessage(
                chatId,
                `Website: ${log.website}\nLogs: ${JSON.stringify(log.logs, null, 2)}`
            );
        }
        catch(err) { 
            console.log(`error to sendReport  ${err}`)
        }
    }
}