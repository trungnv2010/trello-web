import {cardService} from "~/services/cardService";
import {StatusCodes} from "http-status-codes";

const createNew = async (req, res, next) => {
    try {
        const createdCard = await cardService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createdCard)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const cardId = req.params.id
        const cardCoverFile = req.file
        const userInfo = req.jwtDecoded
        const updatedCard = await cardService.update(cardId, req.body, cardCoverFile, userInfo)
        res.status(StatusCodes.OK).json(updatedCard)
    } catch (error) {next(error)}
}

export const cardController = {
    createNew,
    update
}