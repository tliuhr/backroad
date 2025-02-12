export declare const socketEventHandlers: {
    getValue: import("./types").IServerSocketEventHandler<"get_value">;
    runScript: import("./types").IServerSocketEventHandler<"run_script", () => Promise<void>>;
    setValue: import("./types").IServerSocketEventHandler<"set_value", () => Promise<void>>;
    unsetValue: import("./types").IServerSocketEventHandler<"unset_value", () => Promise<void>>;
};
