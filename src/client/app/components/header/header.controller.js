import Introspected from "introspected";

import { AccountsService } from "../account/accounts.service.js";
import { SettingsDialogComponent } from "../settings-dialog/settings-dialog.component.js";
import { TokenDialogComponent } from "../token-dialog/token-dialog.component.js";
import { ActivityService } from "../activity/activity.service.js";
import { ChartsComponent } from "../charts/charts.component.js";
import { ExposureService } from "../exposure/exposure.service.js";
import { NewsService } from "../news/news.service.js";
import { OrdersService } from "../orders/orders.service.js";
import { PositionsService } from "../positions/positions.service.js";
import { SessionService } from "../session/session.service.js";
import { StreamingService } from "../streaming/streaming.service.js";
import { ToastsService } from "../toasts/toasts.service.js";
import { TradesService } from "../trades/trades.service.js";
import { Util } from "../../util.js";

export class HeaderController {
    constructor(render, template) {
        const events = (e, payload) => Util.handleEvent(this, e, payload);

        const instrsStorage = window.localStorage.getItem("argo.instruments");

        const instrs = JSON.parse(instrsStorage) || {
            EURUSD: true,
           
            GBPUSD: true,
            USDCHF: true,
           USDCAD: true,
           
            
            AUDUSD: true,
            NZDUSD: true,
            USDXAG: true,
            USDXAU: true            
                                                
        };

        this.state = Introspected({
            spinner: {
                isLoadingView: false
            },
            tokenModalIsOpen: false,
            tokenInfo: {
                environment: "practice",
                token: "",
                accountId: ""
            },
            settingsModalIsOpen: false,
            accounts: [],
            instrs
        }, state => template.update(render, state, events));

        Util.spinnerState = this.state.spinner;

        TokenDialogComponent.bootstrap(this.state);
        SettingsDialogComponent.bootstrap(this.state);
        
       

        const tokenInfo = {
            environment: "practice",
            token: "37f1cf4806d56eb3670e44db0020c1bf-90302de9059ad4293bd599f8815f2e85",
            accountId: this.state.tokenInfo.accountId+"000",
            instrs: Proxy
        };
    //    console.log(tokenInfo);
      //  environment: "practice", token: "37f1cf4806d56eb3670e44db0020c1bf-90302de9059ad4293bd599f8815f2e85", accountId: "101-004-9817124-001", instrs: Proxy

      SessionService.setCredentials(tokenInfo);

        AccountsService.getAccounts(tokenInfo).then(() => {
            const instruments = AccountsService
                .setStreamingInstruments(this.state.instrs);

            StreamingService.startStream({
                environment: tokenInfo.environment,
                accessToken: tokenInfo.token,
                accountId: tokenInfo.accountId,
                instruments
            });

            ActivityService.refresh();
            TradesService.refresh();
            OrdersService.refresh();
            PositionsService.refresh();
            ExposureService.refresh();
            NewsService.refresh();

            ChartsComponent.bootstrap();

            this.state.tokenModalIsOpen = false;
        }).catch(err => {
            ToastsService.addToast(err);
            this.state.tokenModalIsOpen = false;
        });
    }
    
   
    
      onLoginOkClick() {
        AccountsService.getAccounts({
            environment: this.state.tokenInfo.environment,
            token: this.state.tokenInfo.token
        }).then(accounts => {
            const message = "If your account id contains only digits " +
                "(ie. 2534233), it is a legacy account and you should use " +
                "release 3.x. For v20 accounts use release 4.x or higher. " +
                "Check your token.";

            if (!accounts.length) {
                throw new Error(message);
            }
            accounts.forEach(item => {
                this.state.accounts.push(item);
            });
        }).catch(err => {
            this.state.tokenModalIsOpen = false;
            this.state.tokenInfo.token = "";
            ToastsService.addToast(err);
        });
    }

    onOpenSettingsClick() {
        const allInstrs = AccountsService.getAccount().instruments;

        allInstrs.forEach(instrument => {
            if (!this.state.instrs[instrument.name].toString()) {
                this.state.instrs[instrument.name] = false;
            }
        });

        this.state.settingsModalIsOpen = true;
    }
}
