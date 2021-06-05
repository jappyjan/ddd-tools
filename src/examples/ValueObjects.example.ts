import {ValueObject} from '../decorators/ValueObject';

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


// valid example
console.clear();
console.log('Creating a Valid User ValueObject');
const name = new UserName('Name', 'Jan Jaap');
const birthday = new UserBirthday('Birthday', new Date('1996-09-17'));
const user = new User('User', {name, birthday});
console.log('Valid User:\n' + user);

console.log('\n\n');

// failing example
console.log('Creating an Invalid User ValueObject');
const invalidName = new UserName('Name', 'mail@janjaap.de');
const invalidBirthday = new UserBirthday('Birthday', new Date('some-invalid-date'));
const invalidUser = new User('User', {name: invalidName, birthday: invalidBirthday});

console.log(JSON.stringify(invalidUser));
