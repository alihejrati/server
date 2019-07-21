declare type Specification = {
    asyncFunction: boolean;
    project: string;
    path: {
        absolute: string;
        reletive: string;
        module: string;
        format: string;
    },
    function: {
        name: string;
        arguments: string[];
        parameters: any[];
        return?: any;
    },
    _: {
        precall: any;
        postReturn: any;
    };
    callback: Function;
    overhead: any;
    report: import('events').EventEmitter;
    forceStop: boolean;
    error: Error;
};
declare type options = {
    preCall: any,
    specification: Specification,
};