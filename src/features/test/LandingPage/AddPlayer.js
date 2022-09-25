import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import './AddPlayer.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { icreIdPlayer, idInitPlayer, savePlayer } from '../counterSlice';
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
const AddGame = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const idPlayer = useSelector(idInitPlayer)
    const dispatch = useDispatch()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setName(e.target.value)
    }
    const saveNamePlayer = () => {
        dispatch(savePlayer({ id: idPlayer, name }))
        dispatch(icreIdPlayer())
    }
    return (
        <div className='btn-add-player'>

            <Stack spacing={2} direction="row">
                <Button onClick={handleOpen} variant="contained">Add Player</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='add-player-header'>Please enter a new name</div>
                    <div style={{ marginBottom: '20px' }}>New name:</div>
                    <input className='input-add-player' onChange={handleChange} value={name} />
                    <div className='btn-add-player-wrapper'>
                        <Stack spacing={2} direction="row">
                            <Link style={{ textDecoration: 'none' }} to={'/listPlayer'}>
                                <Button onClick={saveNamePlayer} variant="contained">OK</Button>
                            </Link>
                            <Button onClick={handleClose} variant="outlined">Cancel</Button>
                        </Stack>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}

export default AddGame