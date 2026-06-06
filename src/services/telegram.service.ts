import { Bot } from "grammy";
import { User } from "../models/User"
import { Website } from "../models/Website";
import { createUser } from "../controllers/user.controller";
import { addUrl } from "../controllers/web.controller";
export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!)

bot.command("start", async (ctx) => {
  await ctx.reply('You welcome . enter your email')
  await ctx.reply('help menu : \n for add url : addUrl_yourUrl \n for delete url : deleteUrl_yourUrl')
})


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
  await ctx.reply("Unrecognized input. Send a URL to add a website.");
});






