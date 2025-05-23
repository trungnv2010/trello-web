import {env} from '~/config/environment'
import ApiError from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";

export const corsOptions = {
    origin: function (origin, callback) {
        if (env.BUILD_MODE === 'dev') {
            return callback(null, true)
        }
        return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
    },
    credentials: true
}