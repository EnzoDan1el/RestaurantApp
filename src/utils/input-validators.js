export const passwordValidation = (password) => {
    const returnValue = password.trim().length < 4 ? false : true;

    return returnValue;
}

export const emailValidation = (email) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    if (regEx.test(email)) {
        return true;
    } else {
        return false;
    }
}
