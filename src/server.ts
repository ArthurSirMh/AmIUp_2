import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron";
import { connectDB } from "./config/db";
connectDB()
import { bot } from "./services/telegram.service";
bot.start();
import { monitoringJob } from "./jobs/monitoring.job";
import "./workers/monitoring.worker";
import { User } from "./models/User";
// let jobCanWork = 1
// let JobWork = 0
// cron.schedule("*/30 * * * * *", async () => {
//     if (JobWork >= jobCanWork) {
//         console.log(`${jobCanWork} Logger is still running, skipping this run...`);
//         return;
//     }
//     JobWork += 1;
//     console.log(`${JobWork}  Logger Running Now`);
//     try {
//         console.log('Logger running...');
//         await logger();
//     } catch (err) {
//         console.error("Logger error:", err);
//     } finally {
//         JobWork -= 1;
//         console.log("After finally, JobWork =", JobWork);
//     }
// });
// const getUsers = async () => {
//   const users = await User.find();
//   console.log(users); // ✅ آرایه‌ای از user‌ها
// };

// getUsers();
cron.schedule("*/1 * * * *", async () => {
    await monitoringJob()
})