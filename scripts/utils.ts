export function replaceInterface(
    originalContents: string,
    interfaceName: string,
    newInterfaceBody: string
): string {
    return originalContents.replace(
        new RegExp(`export interface ${interfaceName} {[\\s\\S]+?}`, 'gm'),
        `export interface ${interfaceName} {
${newInterfaceBody}
}`
    );
}

export function replaceType(
    originalContents: string,
    typeName: string,
    newTypeBody: string
): string {
    return originalContents.replace(
        new RegExp(`export declare type ${typeName} = [\\s\\S]+?;`, 'gm'),
        `export declare type ${typeName} = ${newTypeBody};`
    );
}
