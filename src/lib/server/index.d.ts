import { Namespace } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from '@backroad/core';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
export declare const startBackroadServer: (options: {
    port: number;
}) => Promise<Namespace<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>>;
