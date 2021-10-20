const { userNameRegExp, emailRegExp, passwordRegExp } = require('./regExp');

class Validator {
    dataValidation(userName, email, password) {
        if (!String(userName).toLowerCase().match(userNameRegExp)) {
            throw new Error('Incorrect userName!');
        }
        if (!String(email).toLowerCase().match(emailRegExp)) {
            throw new Error('Incorrect email address!');
        }
        if (!String(password).toLowerCase().match(passwordRegExp)) {
            throw new Error('Incorrect password!');
        }
    }
}

module.exports = Validator;