import { AccountsService } from "../account/accounts.service.js";
import { ActivityService } from "../activity/activity.service.js";
import { OrdersService } from "../orders/orders.service.js";
import { QuotesService } from "../quotes/quotes.service.js";
import { PluginsService } from "../plugins/plugins.service.js";
import { PositionsService } from "../positions/positions.service.js";
import { ToastsService } from "../toasts/toasts.service.js";
import { TradesService } from "../trades/trades.service.js";
import { Util } from "../../util.js";

export class StreamingService {
    static startStream(data) {
        Util.fetch("/api/startstream", {
            method: "post",
            body: JSON.stringify({
                environment: data.environment,
                accessToken: data.accessToken,
                accountId: data.accountId,
                instruments: data.instruments
            })
        }).then(() => {
            StreamingService.getStream();
        }).catch(err => {
            ToastsService.addToast(`streaming ${err.message}`);
        });
    }

    static getStream() {
        const ws = new WebSocket("ws://www.itacademy.club/stream");

        ws.onmessage = event => {
            let data,
                isTick,
                tick,
                isTransaction,
                transaction,
                refreshPlugins;

            try {
                data = JSON.parse(event.data);

                isTick = data.closeoutAsk && data.closeoutBid;
                isTransaction = data.accountID;
                refreshPlugins = data.refreshPlugins;

                if (isTick) {
                    tick = {
                        time: data.time,
                        instrument: data.instrument,
                        ask: data.asks[0] && data.asks[0].price ||
                            data.closeoutAsk,
                        bid: data.bids[0] && data.bids[0].price ||
                            data.closeoutBid
                    };

                    QuotesService.updateTick(tick);

                    TradesService.updateTrades(tick);
                    OrdersService.updateOrders(tick);
                }

                if (isTransaction) {
                    transaction = data;

                    ActivityService.addActivity(transaction);

                    AccountsService.refresh();
                    TradesService.refresh();
                    OrdersService.refresh();
                    PositionsService.refresh();
                }

                if (refreshPlugins) {
                    PluginsService.refresh();
                }
            } catch (e) {

                // Discard "incomplete" json
                // console.log(e.name + ": " + e.message);
            }
        };
    }
}
