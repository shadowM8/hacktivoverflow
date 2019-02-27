const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    encryptPass : (pass) => {
        return bcrypt.hashSync(pass, saltRounds)
    },
    comparePass : (inputPass, storedPass) => {
        return bcrypt.compareSync(inputPass, storedPass)
    }

}