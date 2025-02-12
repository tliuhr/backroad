/// <reference types="node" />
import { BackroadSession } from '../server/sessions/session';
export declare class RenderQueue {
    #private;
    private backroadSession;
    queue: string[];
    flushTimeout: NodeJS.Timeout | null;
    addToQueue(payload: string): void;
    constructor(backroadSession: BackroadSession);
    flush(): any;
}
