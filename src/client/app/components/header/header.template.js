import { Util } from "../../util.js";

export class HeaderTemplate {
    static update(render, state, events) {
        /* eslint-disable indent */
        render`
            <nav class="flex flex-row bt bb tc mw9 center shadow-2">

                <div class="flex flex-wrap flex-row justify-around items-center min-w-95">
                       

                        <span class="b">ITEX WEB TRADING PLATFORM</span>

                        <div style="${Util.show(state.tokenInfo.token)}">
                            Active environment: <span class="b">${state.tokenInfo.environment}</span>
                        </div>

                        <div style="${Util.show(state.tokenInfo.accountId)}">
                            Account Id: <span class="b">${state.tokenInfo.accountId}</span>
                        </div>

                        <div style="${Util.show(!state.tokenInfo.token)}">
                            To start test trading, please press button 'start trading'  <br> <b></b> 
                        </div>

                        <a id="openSettings" class="pointer f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
                            style="${Util.show(state.tokenInfo.accountId)}"
                            onclick="${events}">
                                Settings
                        </a>
                        <a class="pointer f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
                            style="${Util.show(!state.tokenInfo.token)}"
                            onclick="${() => {
                                state.tokenModalIsOpen = true;
                            }}">
                                Start Trading
                        </a>
                </div>

                <div class="flex flex-row items-center min-w-5">
                    <span class="${Util.spinnerState.isLoadingView ? "spinner" : ""}"></span>
                </div>

            </nav>

            <token-dialog></token-dialog>
            <settings-dialog></settings-dialog>
        `;
        /* eslint-enable indent */
    }
}
