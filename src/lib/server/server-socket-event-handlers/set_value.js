"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValue = void 0;
const tslib_1 = require("tslib");
const superjson_1 = tslib_1.__importDefault(require("superjson"));
const setValue = (socket, backroadSession, runExecutor) => async (props, callback) => {
    // console.log(
    //   'setting value before triggering rerun, new value for ',
    //   props.id,
    //   ' is ',
    //   props.value
    // );
    backroadSession.setValue(props.id, superjson_1.default.parse(props.value));
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
exports.setValue = setValue;
//# sourceMappingURL=set_value.js.map