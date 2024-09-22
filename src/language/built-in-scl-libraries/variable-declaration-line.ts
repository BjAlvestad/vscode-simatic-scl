export class VariableDeclarationLine {
    name: string;
    dataType: string;
    defaultValue: string;
    comment: string;

    constructor(
        name: string,
        dataType: string,
        defaultValue?: string,
        comment?: string,
    ) {
        this.name = name;
        this.dataType = dataType;
        this.defaultValue = defaultValue ?? '';
        this.comment = comment ?? '';
    }

    public toString(): string {
        return `${this.name} : ${this.dataType}${this.defaultValue ? ` := ${this.defaultValue}` : ''};${this.comment ? `   // ${this.comment}` : ''}`
    }
}
