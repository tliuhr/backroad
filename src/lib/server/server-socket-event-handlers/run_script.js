"use strict";
// import { IServerSocketEventHandler } from './types';
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScript = void 0;
const runScript = (socket, backroadSession, context) => () => {
    context();
    socket.emit('running', null, () => {
        console.log('running event emitted');
    });
};
exports.runScript = runScript;
//# sourceMappingURL=run_script.js.map