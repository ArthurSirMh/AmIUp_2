
import { Website } from "../models/Website";
import { WebsiteLog } from "../models/WebsiteLog";
import { bot } from "./telegram.service"
export const sendTelegramAlert = async (logId: string, chatId: string) => {
    const websiteLog = await WebsiteLog.findById(logId)
    if (!websiteLog) return;
    const website = await Website.findById(websiteLog.websiteId)
    const message = websiteLog.IsUp ? `${website.url} is Up` : `${website.url} is Down`
    try { await bot.api.sendMessage(chatId, message); } catch {
        console.log('telegram error')
    }
}
