import mongoose from "mongoose";
import { Website } from "./Website";
import { response } from "express";


const websiteLogSchema = new mongoose.Schema(
    {
        websiteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website",
            required: true
        },
        statusCode: Number,
        responseTime: Number,
        IsUp: { type: Boolean, default: true }
    },
    { timestamps: true }
)
export const WebsiteLog = mongoose.model('WebsiteLog', websiteLogSchema)