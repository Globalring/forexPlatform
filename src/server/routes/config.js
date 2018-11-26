"use strict";

const path = require("path");

exports.port =80;

exports.staticFiles = path.resolve(__dirname, "../../client/");
exports.vendorFiles = path.resolve(__dirname, "../../../node_modules/");
exports.buildFiles = path.resolve(__dirname, "../../../build/");
 
exports.apiUrl = "/api";
exports.streamUrl = "/stream";

exports.environment = process.env.OANDA_ENVIRONMENT || "practice";
exports.accessToken = process.env.OANDA_TOKEN || "37f1cf4806d56eb3670e44db0020c1bf-90302de9059ad4293bd599f8815f2e85";
exports.accountId = process.env.OANDA_ACCOUNTID || "1234567890";

exports.instruments = [
   "EURUSD",
    "GBPUSD",
    "USDCHF",
    "USDCAD",
    "AUDUSD",
    "NZDUSD",
    "USDXAG",
    "USDXAU"
];

exports.getUrl = getUrl;

function getUrl(environment, type) {
    const endpoints = {
        live: {
            stream: "https://stream-fxtrade.oanda.com",
            api: "https://api-fxtrade.oanda.com"
        },
        practice: {
            stream: "https://stream-fxpractice.oanda.com",
            api: "https://api-fxpractice.oanda.com"
        }
    };

    return endpoints[environment][type];
}
