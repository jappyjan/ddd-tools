import {ValueObject} from '../src';

class UserName extends ValueObject<string> {
    protected validateValue(value: string): string | string[] {
        if (!value) {
            return 'value is falsy';
        }

        const forbiddenCharacters = ['@', '*', '#', '?', '!', '^', '°'];

        let errors: string[] = [];
        forbiddenCharacters.forEach((forbiddenCharacter) => {
            if (value.includes(forbiddenCharacter)) {
                errors.push(`Username may not contain the character "${forbiddenCharacter}"`);
            }
        });

        return errors;
    }
}

class UserBirthday extends ValueObject<Date> {
    protected validateValue(value: Date): null | string | string[] {
        if (!value) {
            return 'value is falsy';
        }

        const isValidDate = value instanceof Date && !isNaN(value.getTime());
        if (!isValidDate) {
            return 'Birthday is not a valid Date';
        }

        const now = new Date();
        if (now.getTime() < value.getTime()) {
            return 'Birthday may not be in the future';
        }
    }
}

interface UserProperties {
    name: UserName;
    birthday: UserBirthday;
}

class User extends ValueObject<UserProperties> {
}

function cloneExample() {
    const original = new UserName('Jan Jaap');
    const cloned = original.clone();

    console.log('original === original ? ', original === original ? 'yes' : 'no');
    console.log('clone === original ? ', original === cloned ? 'yes' : 'no');
    console.log('clone === clone ? ', cloned === cloned ? 'yes' : 'no');
    console.log('clone.toJSON === original.toJSON ? ', cloned.toJSON() === original.toJSON() ? 'yes' : 'no');
    console.log('\n\n');
}
cloneExample();


function mutationExample() {
    const original = new User({name: new UserName('Jan Jaap'), birthday: new UserBirthday(new Date('1996-09-17'))});
    const mutated = original.mutate({name: new UserName('Jan Bauer')});

    console.log('original === original ? ', original === original ? 'yes' : 'no');
    console.log('mutated === original ? ', original === mutated ? 'yes' : 'no');
    console.log('mutated === mutated ? ', mutated === mutated ? 'yes' : 'no');
    console.log('mutated.toJSON === original.toJSON ? ', mutated.toJSON() === original.toJSON() ? 'yes' : 'no');
    console.log('\n\n');
}
mutationExample();


function validValidationExample() {
    console.log('Creating a Valid User ValueObject');
    const name = new UserName('Jan Jaap');
    const birthday = new UserBirthday(new Date('1996-09-17'));
    const user = new User({name, birthday});
    console.log('Valid User:\n' + user);
    console.log('\n\n');
}
validValidationExample();

function invalidValidationExample() {
    try {
        console.log('Creating an Invalid User ValueObject');
        const invalidName = new UserName('mail@janjaap.de');
        const invalidBirthday = new UserBirthday(new Date('some-invalid-date'));
        const invalidUser = new User({name: invalidName, birthday: invalidBirthday});

        console.log(JSON.stringify(invalidUser));
    } catch (e) {
        console.error(e);
    } finally {
        console.log('\n\n');
    }
}
invalidValidationExample();
