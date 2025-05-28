import express from "express";
import {StatusCodes} from "http-status-codes";
import {userRoute} from "~/routes/v1/userRoute";
import {boardRoute} from "~/routes/v1/boardRoute";
import {cardRoute} from "~/routes/v1/cardRoute";
import {columnRoute} from "~/routes/v1/columnRoute";
import {invitationRoute} from "~/routes/v1/invitationRoute";

const Router = express.Router()

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({message: "Apis V1 are ready to use" })
})

Router.use('/users', userRoute)
Router.use('/boards', boardRoute)
Router.use('/cards', cardRoute)
Router.use('/columns', columnRoute)
Router.use('/invitations', invitationRoute)

export const APIs_V1 = Router