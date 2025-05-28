import express from "express";
import {authMiddleware} from "~/middlewares/authMiddleware";
import {columnValidation} from "~/validations/columnValidation";
import {columnController} from "~/controllers/columnController";

const Router = express.Router()

Router.route('/')
    .post(authMiddleware.isAuthorized, columnValidation.createNew, columnController.createNew)

Router.route('/:id')
    .put(authMiddleware.isAuthorized, columnValidation.update, columnController.update)
    .delete(authMiddleware.isAuthorized, columnValidation.deleteItem, columnController.deleteItem)

export const columnRoute = Router