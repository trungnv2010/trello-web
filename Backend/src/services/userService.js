import {userModel} from "~/models/userModel";
import {StatusCodes} from "http-status-codes";
import ApiError from "~/utils/ApiError";
import {v4 as uuidv4} from 'uuid'
import bcryptjs from 'bcryptjs'
import {WEBSITE_DOMAIN} from "~/utils/constants";
import { NodeEmailProvider} from "~/providers/NodeEmailProvider";
import {pickUser} from "~/utils/formatters";
import {JwtProvider} from "~/providers/JwtProvider";
import {env} from "~/config/environment";
import {CloudinaryProvider} from "~/providers/CloundinaryProvider";

const createNew = async (reqBody) => {
    try {
        const existUser = await userModel.findOneByEmail(reqBody.email)
        if (existUser) {
            throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
        }
        const nameFromEmail = reqBody.email.split('@')[0]
        const newUser = {
            email: reqBody.email,
            password: bcryptjs.hashSync(reqBody.password, 8),
            username: nameFromEmail,
            displayName: nameFromEmail,
            verifyToken: uuidv4()
        }

        const createdUser = await userModel.createNew(newUser)
        const getNewUser = await userModel.findOneById(createdUser.insertedId)

        const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${getNewUser.email}&token=${getNewUser.verifyToken}`
        const customSubject = 'Please verify your email before using our service!'
        const htmlContent = `
            <h3>Here is your verification link: </h3>
            <h3>${verificationLink}</h3>
            <h3>Sincerely, <br/> - Trungnv2010 - </h3>
        `
        await NodeEmailProvider.sendEmail(getNewUser.email, customSubject, htmlContent)

        return pickUser(getNewUser)
    } catch (error) {
        throw error
    }
}

const verifyAccount = async (reqBody) => {
    try {
        const existUser = await userModel.findOneByEmail(reqBody.email)

        if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
        if (existUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is already active!')
        if (reqBody.token !== existUser.verifyToken) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token is invalid')
        }

        const updateData = {
            isActive: true,
            verifyToken: null
        }

        const updatedUser = await userModel.update(existUser._id, updateData)
        return pickUser(updatedUser)
    } catch (error) {
        throw error
    }
}

const login = async (reqBody) => {
    try {
        const existUser = await userModel.findOneByEmail(reqBody.email)
        if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
        if (!existUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is not active!')
        if (!bcryptjs.compareSync(reqBody.password, existUser.password)) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your Email or Password is incorrect!')
        }

        const userInfo = {_id: existUser._id, email: existUser.email}

        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )

        const refreshToken = await JwtProvider.generateToken(
            userInfo,
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        return {
            accessToken,
            refreshToken,
            ...pickUser(existUser)
        }
    } catch (error) {
        throw error
    }
}

const refreshToken = async (clientRefreshToken) => {
    try {
        const refreshTokenDecoded = await JwtProvider.verifyToken(
            clientRefreshToken,
            env.REFRESH_TOKEN_SECRET_SIGNATURE
        )

        const userInfo = {_id: refreshTokenDecoded._id, email: refreshTokenDecoded.email}

        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )

        return {accessToken}
    } catch (err) { throw err }
}

const update = async (userId, reqBody, userAvatarFile) => {
    try {
        const existUser = await userModel.findOneById(userId)
        if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
        if (!existUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account is not active!')

        let updatedUser = {}

        if (reqBody.current_password && reqBody.new_password) {
            if (!bcryptjs.compareSync(reqBody.current_password, existUser.password)) {
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your current password is incorrect!')
            }
            updatedUser = await userModel.update(existUser._id, {
                password: bcryptjs.hashSync(reqBody.new_password, 8)
            })
        } else if (userAvatarFile) {
            const uploadResult = await CloudinaryProvider.streamUpload(userAvatarFile.buffer, 'users')
            updatedUser = await userModel.update(existUser._id, {
                avatar: uploadResult.secure_url
            })
        } else {
            updatedUser = await userModel.update(existUser._id, reqBody)
        }
        return pickUser(updatedUser)
    } catch (err) { throw err }
}

export const userService = {
    createNew,
    verifyAccount,
    login,
    refreshToken,
    update
}
