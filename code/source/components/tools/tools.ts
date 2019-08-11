class Tools {
    constructor() {
        
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