class Tools {
    constructor() {
        
    }

    /**
     * cast output to mongoose sort 
     */
    public static cast2Number(input) {
        return isNaN(Number(input)) ? 0 : Number(input);
    }

    /**
     * cast output to mongoose sort 
     */
    public static cast2mongooseSort(input) {
        return input ? /^\-/g.test(input) ? {[`${input.substr(1)}`] : -1} : {[`${input}`] : 1} : undefined;
    }

    /**
    * casting output to boolean
    */
    public static isBoolean(input): boolean {
        return typeof input == 'boolean' ? input : false;
    }

    /**
    * casting output to json
    */
    public static isJson(input) {
        return npm.isPlainObject(input) ? input : {};
    }

    /**
     * casting output to string
     */
    public static isString(input): string {
        return typeof input == 'string' ? input : '';
    }

    /**
     * casting output to number
     */
    public static isNumber(input): number {
        return typeof input == 'number' ? input : 0;
    }

    /**
    * casting output to array 
    */
    public static isArray(input) {
        return Array.isArray(input) ? input : [];
    }

    /**
    * Creates a regex for taking a query on tags
    */
    public static vector2regex(vector: string[]): string {
        return vector.reduce((filtered: string[], element) => { typeof element == 'string' && element ? filtered.push(`\.*${element}\.*`) : null; return filtered; }, []).join('|') || '^$';
    }
}



export default Tools;