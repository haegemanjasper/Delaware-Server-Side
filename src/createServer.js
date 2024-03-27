const Koa = require("koa");
const config = require("config");
const installMiddlewares = require("./core/installMiddlewares");
const installRest = require("./rest");
const { initializeLogger, getLogger } = require("./core/logging");
const { disconnect } = require("./data/DatabaseAccessor");

//const WebSocket = require("ws");

const NODE_ENV = config.get("env");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

module.exports = async function createServer() {
    initializeLogger({
        level: LOG_LEVEL,
        disabled: LOG_DISABLED,
        defaultMeta: {
            NODE_ENV,
        },
    });

    const app = new Koa();
    installMiddlewares(app);
    installRest(app);

    /* const wss = new WebSocket.Server({ noServer: true });

    app.server.on("upgrade", (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    });

    wss.on("connection", (ws) => {
        ws.on("message", (message) => {
            console.log("Ontvangen bericht van client:", message);
            ws.send("Bericht ontvangen door server");
        });
    }); */

    return {
        getApp() {
            return app;
        },
        async start() {
            const port = config.get("port");
            return new Promise((resolve) => {
                app.server = app.listen(port, () => {
                    getLogger().info(
                        `Server luistert op http://localhost:${port}`
                    );
                    resolve();
                });
            });
        },
        async stop() {
            app.removeAllListeners();
            await disconnect();
            getLogger().info("Server gestopt");
        },
    };
};
