export class ValueObjectValueValidationError<ValueType> extends Error {
    // noinspection JSMismatchedCollectionQueryUpdate
    private readonly errors: string[];
    private readonly value: ValueType;

    constructor(value: ValueType, errors: string | string[]) {
        super(`Value validation failed. See "errors" and "value" property for details.`);

        if (!Array.isArray(errors)) {
            errors = [errors];
        }
        this.errors = errors;
        this.value = value;
    }
}
