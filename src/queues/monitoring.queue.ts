import { Queue } from "bullmq";
import { Redis } from "ioredis";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

export const monitoringQueue = new Queue("monitoring", {
  connection,
});
export const sendTelegramAlertQueue = new Queue("sendTelegramAlertQueue", {
  connection,
});
export const sendEmailAlertQueue = new Queue("sendEmailAlertQueue", {
  connection,
});
export const sendReportQueue = new Queue("sendReportQueue", {
  connection,
});