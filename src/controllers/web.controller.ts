import { Website } from "../models/Website";
export const addUrl = async (userId: string, url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
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

export const getUrl = async (id = null) => {
    try {
        if (id) {
            const url = await Website.findById(id)
            if (url) return {
                success: true,
                message: "url fetch successfully",
                data: [url]
            }
            return {
                success: false,
                message: "url not found",
                data: []
            }
        }
        else {

        }
    } catch (err) {
        console.log({
            success: true,
            message: "url fetch failed",
            error: err
        })
    }
}
export const getUrls = async () => {
    try {
        const urls = await Website.find()
        return {
            success: true,
            message: "url fetch successfully",
            data: urls
        }
    } catch (err) {
        console.log({
            success: false,
            message: "url fetch failed",
            error: err
        })
    }
}

export const deleteUrl = async (url: string) => {
    try {
        const urlExist = await Website.findOne({url})
        if (!urlExist) return {
            success: false,
            message: 'url not found',
            url: url
        }
        const test = await Website.deleteOne({ url: url })
        return {
            success: " true",
            message: 'Delete url compeleted',
            url: url
        }
    } catch (err) {
        console.log(err)
        return {
            success: " true",
            message: 'Delete url failed',
            url: url
        }
    }
}