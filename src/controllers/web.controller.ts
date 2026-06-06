import { url } from "node:inspector";
import { Website } from "../models/Website";

export const addUrl = async (userId: string, url: string) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
        const checkExist = await Website.findOne({ url });
        if (checkExist) {
            return {
                success: false,
                message: "Url already exists"
            };        
        }
        try {
            const website = await Website.create({ userId, url });
            return {
                success: true,
                message: "added url successfully"
            };
        } catch {
            return {
                success: false,
                message: "added url unsuccess"
            };
        }
    } else return {
        success: false,
        message: "invalid url"
    }
}