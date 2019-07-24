declare module NodeJS {
    interface Global {
        // server/http:
        cookie: {
            set: typeof import('../components/cookie/set').default,
            get: typeof import('../components/cookie/get').default
        },
        response: {
            attach: typeof import('../components/response/attach').default,
            send: typeof import('../components/response/send').default
        }
    }
}
declare const cookie: {
    set: typeof import('../components/cookie/set').default,
    get: typeof import('../components/cookie/get').default
}
declare const response: {
    attach: typeof import('../components/response/attach').default,
    send: typeof import('../components/response/send').default
}