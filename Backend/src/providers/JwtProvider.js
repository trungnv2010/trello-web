const JWT = require('jsonwebtoken')

const generateToken = async (userInfo, secretSignature, tokenLife) => {
    try {
        return JWT.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife})
    } catch (err) {
        throw new Error(err)
    }
}

const verifyToken = async (token, secretSignature) => {
    try {
        return JWT.verify(token, secretSignature)
    } catch (err) {throw new Error(err)}
}

export const JwtProvider = {
    generateToken,
    verifyToken
}