import {ValueObjectValueValidationError} from './ValueObjectValueValidationError';

export class ValueObject<ValueType> {
    protected readonly _value: ValueType;

    public constructor(value: ValueType) {
        const validationErrors = this.validateValue(value);
        if (validationErrors && validationErrors !== '' && validationErrors.length > 0) {
            throw new ValueObjectValueValidationError(value, validationErrors);
        }

        this._value = value;

        Object.seal(this._value);
        Object.seal(this);

        Object.freeze(this._value);
        Object.freeze(this);
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

    public mutate(changeset: ValueType | Partial<ValueType>): ValueObject<ValueType> {
        let newValue = changeset as ValueType;
        if (this.value instanceof Object) {
            newValue = {
                ...this.value,
                ...changeset
            };
        }

        return new (this.constructor as { new (value: ValueType): ValueObject<ValueType>})(newValue);
    }

    public clone(): ValueObject<ValueType> {
        return new (this.constructor as { new (value: ValueType): ValueObject<ValueType>})(this.value);
    }
}
