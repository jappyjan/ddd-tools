import {v4 as generateUUID} from 'uuid';
import {ValueObject} from '../ValueObject';

export class EntityIdentifier extends ValueObject<string> {
    public constructor(uniqueEntityIdentifier?: string) {
        if (!uniqueEntityIdentifier) {
            uniqueEntityIdentifier = generateUUID();
        }

        super(uniqueEntityIdentifier);

        Object.freeze(this);
    }
}
