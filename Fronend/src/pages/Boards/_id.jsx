import {useDispatch, useSelector} from "react-redux";
import {fetchBoardDetailsAPI, selectCurrentActiveBoard, updateCurrentActiveBoard} from "~/redux/activeBoard.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import { Container} from "@mui/material";
import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar.jsx";
import {moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI} from "~/apis/index.jsx";
import {cloneDeep} from "lodash";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner.jsx";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent.jsx";

const Board = () => {
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)
    const {boardId} = useParams()

    useEffect(() => {
        dispatch(fetchBoardDetailsAPI(boardId))
    }, [dispatch, boardId])

    const moveColumns = (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        const newBoard = {...board}
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        dispatch(updateCurrentActiveBoard(newBoard))
        updateBoardDetailsAPI(newBoard._id, {columnOrderIds: dndOrderedColumnsIds})
    }

    const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        dispatch(updateCurrentActiveBoard(newBoard))
        updateColumnDetailsAPI(columnId, {cardOrderIds: dndOrderedCardIds})
    }

    const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(i => i._id)

        const newBoard = {...board}
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        dispatch(updateCurrentActiveBoard(newBoard))

        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
        moveCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
        })
    }

    if (!board) {
        return <PageLoadingSpinner caption={"Loading Board..."} />
    }

    return (
        <Container disableGutters maxWidth={false} sx={{height: '100vh'}}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
            />
        </Container>
    )

}

export default Board