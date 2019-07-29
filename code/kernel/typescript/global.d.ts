declare var global: NodeJS.Global;

declare module NodeJS {
    interface Global {
        // kernel:
        semaphore: import('events').EventEmitter,
        sleep: typeof import('../functions/sleep/sleep').default,
        config: typeof import('../functions/config/config').default,
        Import: typeof import('../functions/Import/Import').default,
        callback: typeof import('../functions/callback/callback').default
    }
}

declare const semaphore: import('events').EventEmitter;
declare const sleep: typeof import('../functions/sleep/sleep').default;
declare const config: typeof import('../functions/config/config').default;
declare const Import: typeof import('../functions/Import/Import').default;
declare const callback: typeof import('../functions/callback/callback').default;