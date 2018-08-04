export class Options {
    collapsed: boolean;
    compact: boolean;
    boxed: boolean;
    dark: boolean;

    static Default(): Options {
        const def = new Options();
        def.boxed = false;
        return def;
    }
}
