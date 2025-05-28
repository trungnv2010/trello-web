import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios.js";
import {API_ROOT} from "~/utils/constants.js";
import {mapOrder} from "~/utils/sorts.js";
import {isEmpty} from 'lodash'
import {generatePlaceholderCard} from "~/utils/formatters.js";

const initialState = {
    currentActiveBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data
    }
)

export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            const board = action.payload
            state.currentActiveBoard = board
        },
        updateCardInBoard: (state, action) => {
            const inComingCard = action.payload

            const column = state.currentActiveBoard.columns.find(i => i._id === inComingCard.columnId)
            if (column) {
                const card = column.cards.find(i => i._id === inComingCard._id)
                if (card) {
                    Object.keys(inComingCard).forEach(key => {
                        card[key] = inComingCard[key]
                    })
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            let board = action.payload
            board.FE_allUser = board.owners.concat(board.members)
            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })
            state.currentActiveBoard = board
        })
    }
})

export const {updateCurrentActiveBoard, updateCardInBoard} = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeBoardSlice.reducer

