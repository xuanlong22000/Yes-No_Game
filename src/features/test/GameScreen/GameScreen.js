import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { questions, questions2, saveResult, selectCount } from '../counterSlice'
import './GameScreen.css'
const GameScreen = () => {
    const [indexName, setIndexName] = useState(0)
    const [selectYes, setSelectYes] = useState(false)
    const [selectNo, setSelectNo] = useState(false)
    // const [listQuestion, setListQuestion] = useState({})
    const page = useNavigate()
    const dispatch = useDispatch()
    const players = useSelector(selectCount)
    const question = useSelector(questions)

    // const question2 = useSelector(questions2)

    // console.log(listQuestion);
    // useEffect(() => {
    //     setListQuestion(question2[Math.floor(Math.random() * question2.length)])
    // }, [])

    // console.log(players, question.quest);
    const handleSubmit = () => {
        const matchId = question.matchId
        const player = players[indexName]?.name
        if (indexName !== players.length) {
            setIndexName(prev => prev + 1)
            setSelectYes(false)
            setSelectNo(false)
            if (selectYes) {
                dispatch(saveResult({ matchId, answer: 1, player, date: new Date().toLocaleString() }))
            } else {
                dispatch(saveResult({ matchId, answer: 2, player, date: new Date().toLocaleString() }))
            }
        } else {
            page('/result')
        }
    }
    const handleClickYes = () => {
        setSelectYes(true)
        setSelectNo(false)
    }
    const handleClickNo = () => {
        setSelectYes(false)
        setSelectNo(true)
    }
    return (
        <div>
            <div className='text-match'>Match {question.matchId} : {question.quest}</div>
            <div className='text-match'>Player: {players[indexName]?.name}</div>
            <div className='answer'>
                <Stack spacing={6} direction="row">
                    <Button className={selectYes && 'active'} onClick={handleClickYes} variant="contained">Yes</Button>
                    <Button className={selectNo && 'active'} onClick={handleClickNo} variant="contained">No</Button>
                </Stack>
            </div>
            <div className='btn-submit'>
                <Stack spacing={6} direction="row">
                    <Button onClick={handleSubmit} style={{ background: 'green' }} variant="contained" disabled={!selectYes && !selectNo && indexName !== players.length}>{indexName !== players.length ? 'Submit' : 'View results'}</Button>
                </Stack>
            </div>
        </div>
    )
}

export default GameScreen