import { BackroadConfig } from '@backroad/core';
import { BackroadNodeManager } from '../backroad';
export declare const run: (executor: (nodeManager: BackroadNodeManager) => void | Promise<void>, backroadOptions?: BackroadConfig) => Promise<void>;
