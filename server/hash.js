const crypto = require('crypto')
const jwt = require('jsonwebtoken')


const hash = args => {
    let key = args.key

    if (!key) key = crypto.randomBytes(16).toString('hex')

    const hashedValue = crypto.createHmac('SHA512', key).update(args.value).digest('base64')

    return {
        key,
        hashedValue,
        fullHash: key + '$' + hashedValue
    }
}

module.exports = hash;