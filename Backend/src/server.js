
import express from 'express'
import cookieParser from "cookie-parser";
import exitHook from 'async-exit-hook'
import cors from 'cors'
import {corsOptions} from "~/config/cors";
import {APIs_V1} from "~/routes/v1";
import http from "http";
import {env} from '~/config/environment'
import {CONNECT_DB, CLOSE_DB} from '~/config/mongodb'
import {errorHandlingMiddleware} from "~/middlewares/errorHandlingMiddleware";



const START_SERVER = () => {
    const app = express()

    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })

    app.use(cookieParser())

    app.use(cors(corsOptions))

    app.use(express.json())

    app.use('/v1', APIs_V1)

    app.use(errorHandlingMiddleware)

    const server = http.createServer(app)

    if (env.BUILD_MODE === 'production') {
        console.log('this is production')
    } else {
        server.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
            console.log(`3. Local DEV: Hi ${env.AUTHOR}, Back-end Server is running successfully at Host: ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`)
        })
    }
    exitHook(async () => {
        console.log('4. Server is shutting down...')
        await CLOSE_DB()
        console.log('5. Disconnected from MongoDB Cloud Atlas')
    })
}

(async () => {
    try {
        console.log('1. Connecting to MongoDB Cloud Atlas...')
        await CONNECT_DB()
        console.log('2. Connected to MongoDB Cloud Atlas!')

        START_SERVER()
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
})()
