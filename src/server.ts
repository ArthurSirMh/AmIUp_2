import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron";
import { connectDB } from "./config/db";
import { logger } from "./job/logger";
connectDB()
import { bot } from "./services/telegram.service";
bot.start();

let jobCanWork = 2
let JobWork = 0
cron.schedule("*/10 * * * * *", async () => {
    if (JobWork >= jobCanWork) {
        console.log(`${jobCanWork} Logger is still running, skipping this run...`);
        return;
    }
    JobWork += 1;
    console.log(`${JobWork}  Logger Running Now`);
    try {
        console.log('Logger running...');
        await logger();
    } catch (err) {
        console.error("Logger error:", err);
    } finally {
        JobWork -= 1;
        console.log("After finally, JobWork =", JobWork);
    }
});