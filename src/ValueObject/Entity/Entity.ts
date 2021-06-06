import {ValueObject} from '../ValueObject';
import {EntityIdentifier} from './EntityIdentifer';

export abstract class Entity<ValueType> extends ValueObject<ValueType> {
    protected readonly _identifier: EntityIdentifier;

    public constructor(value: ValueType, identifier?: string) {
        super(value);

        this._identifier = new EntityIdentifier(identifier);
    }
}
