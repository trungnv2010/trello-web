import {ALLOW_COMMON_FILE_TYPES, LIMIT_COMMON_FILE_SIZE} from "~/utils/validators";
import ApiError from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";
import multer from "multer";

const customFileFilter = (req, file, callback) => {
    if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
        const errMessage = 'File type is invalid. Only accept jpg, jpeg and png'
        return callback(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errMessage), null)
    }

    return callback(null, true)
}

const upload = multer({
    limits: {fileSize: LIMIT_COMMON_FILE_SIZE},
    fileFilter: customFileFilter
})

export const multerUploadMiddleware = {upload}