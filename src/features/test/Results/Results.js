import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import './Results.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAnswer, increIndexQuestion, indexQuestion, questions2, result } from '../counterSlice';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Results = () => {
    // const question = useSelector(questions)
    const question2 = useSelector(questions2)
    const indexQuestions = useSelector(indexQuestion)
    const results = useSelector(result)
    const page = useNavigate()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [changeSortScore, setChangeSortScore] = useState(true)
    const [changeSortDate, setChangeSortDate] = useState(true)
    const [changeSortPlayer, setChangeSortPlayer] = useState(true)
    const [changeSortIdPlayer, setChangeSortIdPlayer] = useState(true)

    // const filterResult = results.filter(post =>
    //     post.player.toLowerCase().includes(search.toLowerCase()) && post.matchId === question2[indexQuestions].matchId
    // )
    const [listResult, setListResult] = useState(results.filter(post =>
        post.matchId === question2[indexQuestions].matchId
    ))

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleNextPlayer = () => {
        dispatch(increIndexQuestion())
        dispatch(getAnswer())
        page('/gameScreen')
    }

    const filterResult = listResult.filter(post =>
        post.player.toLowerCase().includes(search.toLowerCase())
    )

    const sortDate = () => {
        const copyListResult = [...listResult]
        setChangeSortDate(!changeSortDate)
        copyListResult.sort((a, b) => changeSortDate ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
        setListResult(copyListResult)
    }

    const sortPlayer = () => {
        const copyListResult = [...listResult]
        setChangeSortPlayer(!changeSortPlayer)
        copyListResult.sort((a, b) => changeSortPlayer ? a.player.localeCompare(b.player) : b.player.localeCompare(a.player))
        setListResult(copyListResult)
    }

    const sortScore = () => {
        const copyListResult = [...listResult]
        setChangeSortScore(!changeSortScore)
        copyListResult.sort((a, b) => changeSortScore ? a.score - b.score : b.score - a.score);
        setListResult(copyListResult)
    }

    const sortIdPlayer = () => {
        const copyListResult = [...listResult]
        setChangeSortIdPlayer(!changeSortIdPlayer)
        copyListResult.sort((a, b) => changeSortIdPlayer ? a.idPlayer - b.idPlayer : b.idPlayer - a.idPlayer);
        setListResult(copyListResult)
    }

    return (
        <div>
            <div className='text-match'>Match {question2[indexQuestions].matchId}</div>
            <div className='wrapper-table'>
                <input value={search} className='input-search-result' placeholder='Search by player name' onChange={handleChange} />
                <div style={{ marginTop: '30px' }}>
                    {filterResult.length > 0 ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ userSelect: 'none' }}>No. <FontAwesomeIcon onClick={sortIdPlayer} icon={faSort} /></TableCell>
                                        <TableCell style={{ userSelect: 'none' }}>Player <FontAwesomeIcon onClick={sortPlayer} icon={faSort} /></TableCell>
                                        <TableCell style={{ userSelect: 'none' }}>Date <FontAwesomeIcon onClick={sortDate} icon={faSort} /></TableCell>
                                        <TableCell style={{ userSelect: 'none' }}>Answer</TableCell>
                                        <TableCell style={{ userSelect: 'none' }}>Result</TableCell>
                                        <TableCell style={{ userSelect: 'none' }}>Score <FontAwesomeIcon onClick={sortScore} icon={faSort} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterResult.map((result, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell >{result.idPlayer}</TableCell>
                                            <TableCell >{result.player}</TableCell>
                                            <TableCell >{result.date}</TableCell>
                                            <TableCell >{result.answer}</TableCell>
                                            <TableCell >{question2[indexQuestions].answer}</TableCell>
                                            <TableCell >{result.score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : 'No data'
                    }

                </div>
            </div>
            <div className='btn-next-question'>
                <Stack spacing={2} direction="row">
                    <Button onClick={handleNextPlayer} variant="contained">Next Question</Button>
                </Stack>
            </div>
        </div>
    )
}

export default Results