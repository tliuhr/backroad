"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueue = void 0;
const socket_manager_1 = require("./socket-manager");
class RenderQueue {
    backroadSession;
    queue = [];
    flushTimeout = null;
    addToQueue(payload) {
        this.queue.push(payload);
        if (this.flushTimeout) {
            clearTimeout(this.flushTimeout);
        }
        this.flushTimeout = setTimeout(() => {
            this.#flushToFrontend();
        }, 500);
    }
    constructor(backroadSession) {
        this.backroadSession = backroadSession;
    }
    flush() {
        if (this.flushTimeout) {
            clearTimeout(this.flushTimeout);
        }
        const queue = JSON.parse(JSON.stringify(this.queue));
        this.queue = [];
        return queue;
    }
    #flushToFrontend() {
        const socket = socket_manager_1.SocketManager.getSocket(this.backroadSession.sessionId);
        const nodesToEmit = this.flush();
        socket.emit('render', nodesToEmit, () => {
            console.log('batched render request acked by frontend');
        });
    }
}
exports.RenderQueue = RenderQueue;
//# sourceMappingURL=render-queue.js.map