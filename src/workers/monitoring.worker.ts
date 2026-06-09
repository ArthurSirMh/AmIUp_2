import { Worker } from "bullmq";
import IORedis from "ioredis";

import { monitoringService } from "../services/monitoring.service";
import { sendTelegramAlert } from "../services/sendAlrtTelegram.service";
import { sendEmailAlert } from "../services/email.service";
import { sendReport } from "../services/sendReport";

const connection = {
    host: "127.0.0.1",
    port: 6379,
};
new Worker(
    "monitoring",
    async (job) => {
        await monitoringService(
            job.data.websiteId
        );
    },

    { connection, concurrency: 1 }
);

new Worker(
    "sendTelegramAlertQueue",
    async (job) => {
        await sendTelegramAlert(
            job.data.websiteLogId,
            job.data.chatId
        );
    },

    { connection, concurrency: 1 }
);
new Worker(
    "sendEmailAlertQueue",
    async (job) => {
        await sendEmailAlert(
            job.data.email,
            job.data.subject,
            job.data.text
        );
    },
    { connection, concurrency: 1 } 
);
new Worker(
    "sendReportQueue",
    async (job) => {
        await sendReport(
            job.data.userId,
            job.data.chatId,
        );
    },
    { connection, concurrency: 1 } 
);
