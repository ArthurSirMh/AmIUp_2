import { Worker } from "bullmq";
import IORedis from "ioredis";

import { monitoringService } from "../services/monitoring.service";
import { sendTelegramAlert } from "../services/sendAlrtTelegram.service";

const connection = {
    host: "127.0.0.1",
    port: 6379,
};
console.log('hi')
new Worker(
    "monitoring",
    async (job) => {
        await monitoringService(
            job.data.websiteId
        );
    },

    { connection, concurrency: 5 }
);

new Worker(
    "sendTelegramAlertQueue",
    async (job) => {
        await sendTelegramAlert(
            job.data.websiteLogId,
            job.data.chatId
        );
    },

    { connection, concurrency: 5 }
);