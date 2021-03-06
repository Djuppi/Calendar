const bcrypt = require('bcryptjs');

cryptPassword = async(password) => {
    const saltRounds = 10;
    const hashPassword = await new Promise((resolve, reject) => {

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve(hash)
            })
        })
    })
    return hashPassword;
}

checkPassword = async(password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword)
    return match
}

module.exports = {
    cryptPassword,
    checkPassword
}