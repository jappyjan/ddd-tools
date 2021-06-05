export class ValueObjectValueValidationError extends Error {
    private readonly errors: string[];

    constructor(public readonly propertyName: string, errors: string | string[]) {
        super(`Value validation for property "${propertyName}" failed. See "errors" property for details.`);

        if (!Array.isArray(errors)) {
            errors = [errors];
        }
        this.errors = errors;
    }
}
