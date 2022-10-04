import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswer, selectCount } from '../counterSlice';
import { Box, Button, Modal, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListPlayer.css'
import PopUpAddPlayer from '../LandingPage/PopUpAddPlayer';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ListPlayer = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const players = useSelector(selectCount);
    const dispatch = useDispatch()
    const handleStart = () => {
        dispatch(getAnswer())
    }

    return (
        <div>
            {players.length > 0
                ?
                <>
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
                                        <TableCell >{player.id}</TableCell>
                                        <TableCell >{player.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='wrapper-btn-table'>
                        <Stack spacing={2} direction="row">

                            <Button onClick={handleOpen} variant="outlined">Add more player</Button>

                            <Link style={{ textDecoration: 'none' }} to={'/gameScreen'}>
                                <Button onClick={handleStart} variant="contained">Start the Game</Button>
                            </Link>
                        </Stack>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <PopUpAddPlayer handleClose={handleClose} />
                            </Box>
                        </Modal>
                    </div>

                </>
                :
                <span style={{ textAlign: 'center', fontSize: '20px', marginTop: '50px' }}>
                    No Data Player
                </span>}

        </div>
    )
}

export default ListPlayer