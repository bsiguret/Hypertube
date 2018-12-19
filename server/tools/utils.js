const purifyString = (str, defaultLowerCase = true) => {
    str = defaultLowerCase ?  str.toLowerCase().trim() : str.trim()
    str = str.replace(/ +/g, "")
    return str
};

const isValidString = (str, username = false) => {
    if (username) {
        return (str.match(/^[A-Za-z0-9._-\s]{2,30}$/) ? true : false)
    } else {
        return (str.match(/^[A-Za-z\s]{2,20}$/) ? true : false)
    }
};

const isValidPassword = (password) => {
    return (password.match(/^\S*(?=\S{6,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/) ? true : false)
}

const isValidEmail = (email) => {
    return (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) ? true : false)
}

module.exports = {
    purifyString,
    isValidString,
    isValidPassword,
    isValidEmail
}