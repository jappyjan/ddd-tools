export abstract class Policy {
    // noinspection JSUnusedLocalSymbols
    public static isAllowed(...args: any[]): boolean {
        return false;
    }
}
