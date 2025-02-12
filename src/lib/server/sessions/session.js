"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackroadSession = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@backroad/core");
const backroad_1 = require("../../backroad");
const render_queue_1 = require("../../backroad/render-queue");
const superjson_1 = tslib_1.__importDefault(require("superjson"));
// import { UploadManager } from './upload-manager';
class BackroadSession {
    sessionId;
    state = {};
    renderQueue;
    rootNodeManager;
    // uploadManager: UploadManager;
    constructor(sessionId) {
        // this.uploadManager = new UploadManager();
        this.sessionId = sessionId;
        this.rootNodeManager = new backroad_1.BackroadNodeManager((0, core_1.getInitialTreeStructure)(), this);
        this.renderQueue = new render_queue_1.RenderQueue(this);
    }
    get mainPageNodeManager() {
        return new backroad_1.BackroadNodeManager(this.rootNodeManager.container.children[0], this); // this should always be the main page
    }
    resetTree() {
        this.renderQueue.flush(); // get rid of all pending flush commands
        this.rootNodeManager.reset((0, core_1.getInitialTreeStructure)());
    }
    valueOf(id) {
        if (id in this.state) {
            return this.state[id];
        }
        throw new Error(`No value found for ${id}`);
    }
    setValue(id, value) {
        this.state[id] = superjson_1.default.parse(superjson_1.default.stringify(value));
        // this.onRunRequest()
    }
    unsetValue(id) {
        delete this.state[id];
    }
    // notify
    setValueIfNotSet(id, value) {
        if (id in this.state) {
            return false;
        }
        this.setValue(id, value);
        return true;
    }
}
exports.BackroadSession = BackroadSession;
//# sourceMappingURL=session.js.map