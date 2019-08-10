class Tools {
    constructor() {
        
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
    public static tag(vector: string[]): string {
        return vector.reduce((filtered: string[], element) => { typeof element == 'string' && element ? filtered.push(`\.*${element}\.*`) : null; return filtered; }, []).join('|') || '^$';
    }
}



export default Tools;