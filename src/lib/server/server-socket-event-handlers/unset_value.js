"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetValue = void 0;
const unsetValue = (socket, backroadSession, runExecutor) => async (props, callback) => {
    backroadSession.unsetValue(props.id);
    // if (props.triggerRerun === true || props.triggerRerun === undefined) {
    // console.log('triggering rerun');
    // backroadSession.setRunnerProcess({
    //   scriptPath: context.scriptPath,
    //   serverPort: context.serverPort,
    // });
    await runExecutor();
    callback();
    // socket.emit('running', null, () => {
    //   console.log('running event emitted');
    // });
    // }
};
exports.unsetValue = unsetValue;
//# sourceMappingURL=unset_value.js.map