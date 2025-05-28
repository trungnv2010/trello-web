import express from "express";
import {authMiddleware} from "~/middlewares/authMiddleware";
import {boardValidation} from "~/validations/boardValidation";
import {boardController} from "~/controllers/boardController";

const Router = express.Router()

Router.route('/')
    .get(authMiddleware.isAuthorized, boardController.getBoard)
    .post(authMiddleware.isAuthorized, boardValidation.createNew, boardController.createNew)

Router.route('/:id')
    .get(authMiddleware.isAuthorized, boardController.getDetails)
    .put(authMiddleware.isAuthorized, boardValidation.update, boardController.update)

Router.route('/supports/moving_card')
    .put(authMiddleware.isAuthorized, boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)

export const boardRoute = Router