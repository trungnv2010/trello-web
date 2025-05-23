import {userService} from "~/services/userService";
import {StatusCodes} from "http-status-codes";
import ms from 'ms'
import ApiError from "~/utils/ApiError";


const createNew = async (req, res, next) => {
    try {
        const createdUser = await userService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createdUser)
    } catch (error) {
        next(error)
    }
}

const verifyAccount = async (req, res, next) => {
    try {
        const result = await userService.verifyAccount(req.body)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })

        res.status(StatusCodes.OK).json(result)
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        res.status(StatusCodes.OK).json({loggedOut: true})
    } catch (err) {
        next(err)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const result = await userService.refreshToken(req?.cookies?.refreshToken)

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })

        res.status(StatusCodes.OK).json(result)
    } catch (err) {
        next(new ApiError(StatusCodes.FORBIDDEN, 'Please Sign In! (Error from refresh Token)'))
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const userAvatarFile = req.file
        const updatedUser = await userService.update(userId, req.body, userAvatarFile)
        res.status(StatusCodes.OK).json(updatedUser)
    } catch (err) { next(err) }
}

export const userController = {
    createNew,
    verifyAccount,
    login,
    logout,
    refreshToken,
    update
}