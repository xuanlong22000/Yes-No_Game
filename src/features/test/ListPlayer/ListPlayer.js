import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectCount } from '../counterSlice';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListPlayer.css'

const ListPlayer = () => {
    const players = useSelector(selectCount);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >No.</TableCell>
                            <TableCell>Player</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map((player, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{index + 1}</TableCell>
                                <TableCell >{player.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='wrapper-btn-table'>
                <Stack spacing={2} direction="row">
                    <Link style={{ textDecoration: 'none' }} to={'/addName'}>
                        <Button variant="outlined">Add more player</Button>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to={'/gameScreen'}>
                        <Button variant="contained">Start the Game</Button>
                    </Link>
                </Stack>
            </div>
        </div>
    )
}

export default ListPlayer