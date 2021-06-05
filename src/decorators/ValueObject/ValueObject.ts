import {ValueObjectValueValidationError} from './ValueObjectValueValidationError';

export abstract class ValueObject<ValueType> {
    protected readonly _value: ValueType;

    public constructor(protected readonly propertyName: string, value: ValueType) {
        const validationErrors = this.validateValue(value);
        if (validationErrors && validationErrors !== '' && validationErrors.length > 0) {
            throw new ValueObjectValueValidationError(this.propertyName, validationErrors);
        }

        this._value = value;
        Object.seal(this._value);
        Object.freeze(this._value);
    }

    /**
     * Validates the value to be set into this ValueObject
     * @param value value to be validated
     * @return true if valid
     * @return string[] array of error messages/explanations if invalid
     * @private
     */
    protected validateValue(value: ValueType): void | string | string[] {
        return;
    }

    public get value() {
        return this._value;
    }

    public toString = (): string => {
        return this.toJSON();
    }

    public toJSON = (): string => {
        return JSON.stringify(this.value);
    }
}
