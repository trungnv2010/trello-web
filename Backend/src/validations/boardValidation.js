import Joi from "joi";
import {BOARD_TYPES} from "~/utils/constants";
import ApiError from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";
import {OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE} from "~/utils/validators";

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().message({
            'any.required': 'Title is required',
            'string.empty': 'Title is not allowed to be empty',
            'string.min': 'Title length must be at least 3 character long',
            'string.max': 'Title length must be less than or equal to 5 characters long',
            'string.trim': 'Title must not have leading or trailing whitespace'
        }),
        description: Joi.string().required().min(3).max(255).trim().strict(),
        type: Joi.string().required().valid(...Object.values(BOARD_TYPES))
    })
    try {
        await correctCondition.validateAsync(req.body, {abortEarly: false})
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

const update = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).trim().strict(),
        description: Joi.string().min(3).max(255).trim().strict(),
        type: Joi.string().valid(...Object.values(BOARD_TYPES)),
        columnOrderIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
    })

    try {
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
        })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), new Error(error).message)
    }
}

const moveCardToDifferentColumn = async (req, res, next) => {
    const correctCondition = Joi.object({
        currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        prevCardOrderIds: Joi.array().required().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ),
        nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        nextCardOrderIds: Joi.array().required().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
    })
    try {
        await correctCondition.validateAsync(req.body, {abortEarly: false})
        next()
    } catch (err) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), new Error(err).message)
    }
}

export const boardValidation = {
    createNew,
    update,
    moveCardToDifferentColumn
}