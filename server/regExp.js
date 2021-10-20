const userNameRegExp = /^[a-z0-9_-]{3,16}$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const passwordRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;


module.exports = { emailRegExp, userNameRegExp, passwordRegExp };