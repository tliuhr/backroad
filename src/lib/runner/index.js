"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const socket_manager_1 = require("../backroad/socket-manager");
const server_1 = require("../server");
const session_manager_1 = require("../server/sessions/session-manager");
const server_socket_event_handlers_1 = require("../server/server-socket-event-handlers");
const run = async (executor, backroadOptions) => {
    const port = backroadOptions?.server?.port || 3333;
    (await (0, server_1.startBackroadServer)({
        port: port,
    })).on('connection', async (socket) => {
        const backroadSession = session_manager_1.sessionManager.getSession(socket.nsp.name.slice(1), {
            upsert: true,
        });
        socket_manager_1.SocketManager.register(backroadSession.sessionId, socket);
        const runExecutor = async () => {
            backroadSession.resetTree();
            await executor(backroadSession.mainPageNodeManager);
        };
        // execute once to populate defaults and stuff
        // socket.on(
        //   'get_value',
        //   socketEventHandlers.getValue(socket, backroadSession)
        // );
        socket.on('set_value', server_socket_event_handlers_1.socketEventHandlers.setValue(socket, backroadSession, runExecutor));
        socket.on('run_script', server_socket_event_handlers_1.socketEventHandlers.runScript(socket, backroadSession, runExecutor));
        socket.on('unset_value', server_socket_event_handlers_1.socketEventHandlers.unsetValue(socket, backroadSession, runExecutor));
        socket.emit('backroad_config', backroadOptions, () => {
            console.log('sent backroad config to frontend');
        });
        // socket.on("get_tree", socketEventHandlers.getTree(socket, backroadSession));
    });
};
exports.run = run;
//# sourceMappingURL=index.js.map