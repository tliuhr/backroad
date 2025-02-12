import { type ComponentPropsMapping, type InbuiltComponentTypes } from '@backroad/core';
import { BackroadNodeManager } from '../../backroad';
import { RenderQueue } from '../../backroad/render-queue';
export declare class BackroadSession {
    sessionId: string;
    state: {
        [key: string]: unknown;
    };
    renderQueue: RenderQueue;
    rootNodeManager: BackroadNodeManager<'base'>;
    constructor(sessionId: string);
    get mainPageNodeManager(): BackroadNodeManager<"page">;
    resetTree(): void;
    valueOf<ComponentType extends InbuiltComponentTypes>(id: string): ComponentPropsMapping[ComponentType]["value"];
    setValue(id: string, value: unknown): void;
    unsetValue(id: string): void;
    setValueIfNotSet(id: string, value: unknown): boolean;
}
