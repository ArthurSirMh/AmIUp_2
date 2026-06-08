import { log } from "node:console";
import { User } from "../models/User";
import { Website } from "../models/Website";
import { monitoringQueue, sendTelegramAlertQueue } from "../queues/monitoring.queue";
import { WebsiteLog } from "../models/WebsiteLog";

export const monitoringJob = async () => {
    const websites = await Website.find();

    await Promise.all(
        websites.map((website) =>
            monitoringQueue.add("check-website", {
                websiteId: website.id,
            })
        )
    );
};

export const sendTelegramAlert = async (logId: any, chatId: string) => {
    if (!logId) return;
    sendTelegramAlertQueue.add('send-telegram-alert', {
        websiteLogId: logId,
        chatId: chatId
    })

}
