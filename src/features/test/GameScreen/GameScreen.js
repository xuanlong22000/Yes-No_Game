import { Button, CircularProgress, Stack } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { indexQuestion, questions2, saveResult, selectCount } from '../counterSlice'
import './GameScreen.css'
const GameScreen = () => {
    const [indexName, setIndexName] = useState(0)
    const [answer, setAnswer] = useState('')
    const [selectYes, setSelectYes] = useState(false)
    const [selectNo, setSelectNo] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [displayNextPlayer, setDisplayNextPlayer] = useState(false)
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const [gif, setGif] = useState('')

    const players = useSelector(selectCount)
    // const results = useSelector(result)
    // const [score, setScore] = useState(results[indexName]?.score || 0)
    // const question = useSelector(questions)
    const question2 = useSelector(questions2)
    const indexQuestions = useSelector(indexQuestion)

    const page = useNavigate()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (answer === question2[indexQuestions].answer) {

    //     }
    // })

    const handleSubmit = async () => {
        try {
            const matchId = question2[indexQuestions].matchId
            const player = players[indexName]?.name
            const idPlayer = players[indexName]?.id
            setIsLoading(true)

            await axios.get(' https://yesno.wtf/api').then(res => setGif(res.data.image))

            // if (answer === question2[indexQuestions].answer) {
            //     setScore(score + 1)
            //     console.log(score, indexName);
            // }

            if (indexName !== players.length) {
                dispatch(saveResult({ matchId, idPlayer, answer: answer, player, date: new Date().toLocaleString(), score: answer === question2[indexQuestions].answer ? 1 : 0 }))
            } else {
                page('/result')
            }
            setDisplayNextPlayer(true)
            setDisabledSubmit(true)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }

    }
    const handleNextPlayer = () => {
        setDisabledSubmit(false)
        setGif('')
        setDisplayNextPlayer(false)
        setSelectYes(false)
        setSelectNo(false)
        setIndexName(prev => prev + 1)
    }
    const handleClickYes = () => {
        setAnswer('yes')
        setSelectYes(true)
        setSelectNo(false)
    }
    const handleClickNo = () => {
        setAnswer('no')
        setSelectYes(false)
        setSelectNo(true)
    }
    return (
        <div>
            <div className='text-match'>Match {question2[indexQuestions].matchId} : {question2[indexQuestions].quest}</div>
            <div className='text-match'>Player: {players[indexName]?.name ? players[indexName]?.name : 'Het roi'}</div>
            {
                indexName < players.length && (
                    <div className='answer'>
                        <Stack spacing={6} direction="row">
                            <Button className={selectYes && 'active'} onClick={handleClickYes} variant="contained" disabled={disabledSubmit}>Yes</Button>
                            <div className={disabledSubmit ? 'displayPopup' : 'hiddenPopup'}>
                                <div className={question2[indexQuestions].answer === answer ? 'correct' : 'incorrect'}>
                                    <span>{question2[indexQuestions].answer === answer ? 'Correct' : 'Incorrect'}</span>
                                </div>
                            </div>
                            <Button className={selectNo && 'active'} onClick={handleClickNo} variant="contained" disabled={disabledSubmit}>No</Button>
                        </Stack>
                    </div>
                )
            }
            <div className='gif'>
                <img src={gif} alt='' />
            </div>
            <div className='btn-submit'>
                <Stack spacing={6} direction="row">
                    <Button
                        onClick={handleSubmit}
                        style={{ background: 'green' }}
                        variant="contained"
                        disabled={(!selectYes && !selectNo && indexName !== players.length) || disabledSubmit}>
                        {isLoading && <CircularProgress style={{ width: '20px', height: '20px', color: 'red', marginRight: '15px' }} />}
                        {indexName < players.length ? 'Submit' : 'View results'}
                    </Button>
                    <Button
                        className={!displayNextPlayer ? 'btn-next-player' : 'btn-next-player2'}
                        onClick={handleNextPlayer}
                        style={{ background: 'gray' }}
                        variant="contained"
                    >
                        Next Player
                    </Button>
                </Stack>
            </div>
        </div>
    )
}

export default GameScreen