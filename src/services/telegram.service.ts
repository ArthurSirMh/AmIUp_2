import { Bot } from "grammy";
import { User } from "../models/User"
import { Website } from "../models/Website";
import { createUser, EditUser } from "../controllers/user.controller";
import { addUrl, deleteUrl } from "../controllers/web.controller";
import { sendReport } from "../jobs/monitoring.job";
export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!)

bot.command("start", async (ctx) => {
  try {
    const chatId = String(ctx.chat?.id);
    if (!chatId) {
      console.log("No chat id found in context");
      return;
    }
    const user = await User.findOne({ chatId });
    const addOnMessage = user ? "" : "please enter your email";
    await ctx.reply(`Welcome! ${addOnMessage}`);
    const helpMessage = `
Help Menu:
- Add a URL: addUrl_yourUrl
- View website logs: showLogs
- Delete a URL : deleteUrl_yourUrl
- Change Email : changeEmail_yourEmail
`;
    await ctx.reply(helpMessage.trim());
  } catch (error) {
    console.error("Error in start command:", error);
    await ctx.reply("⚠️ Something went wrong. Please try again later.");
  }
});

bot.on("message:text", async (ctx) => {
  const chatId = String(ctx.chat.id);
  const text = ctx.message.text.trim();
  const user = await User.findOne({ chatId });
  if (text.startsWith("/")) return
  // creating user befor anything
  if (!user) {
    try {
      let res = await createUser(chatId, text)
      await ctx.reply(res.message);

    } catch (err) {
      await ctx.reply("Creating Account failed  ❌");
      return;
    }
  }
  // add url 
  else if (text.startsWith("addUrl_")) {
    const url = text.replace("addUrl_", "").trim()
    let res = await addUrl(user.id, url)
    await ctx.reply(res.message);
    return;
  }
  // show Url
  else if (text.startsWith("showLogs")) {
    await sendReport(user.id, chatId)
    return;
  }
  // delete url
  else if (text.startsWith("deleteUrl_")) {
    const url = text.replace("deleteUrl_", "").trim()
    let res = await deleteUrl(url)
    await ctx.reply(`${res.message}\n
      ${url}`);
    return;
  }
  else if (text.startsWith("changeEmail_")) {
    const email = text.replace("changeEmail_", "").trim()
    let res = await EditUser(user.id,email)
    await ctx.reply(`${res.message}`);
    return;
  }
  await ctx.reply("Unrecognized input. Send a URL to add a website.");
});






