import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Results.css'
import { useSelector } from 'react-redux';
import { questions, result } from '../counterSlice';
const Results = () => {
    const question = useSelector(questions)
    const results = useSelector(result)
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filterResult = results.filter(post => post.player.toLowerCase().includes(search.toLowerCase()))
    return (
        <div>
            <div className='text-match'>Match {question.matchId}</div>
            <div className='wrapper-table'>
                <input value={search} className='input-search-result' placeholder='Search by player name' onChange={handleChange} />
                <div style={{ marginTop: '30px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Player</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Answer</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterResult.map((result, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >{index + 1}</TableCell>
                                        <TableCell >{result.player}</TableCell>
                                        <TableCell>{result.date}</TableCell>
                                        <TableCell >{result.answer === 1 ? 'Yes' : 'No'}</TableCell>
                                        <TableCell >{question.answer === 1 ? 'Yes' : 'No'}</TableCell>
                                        <TableCell >{result.answer === question.answer ? '1' : '0'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default Results