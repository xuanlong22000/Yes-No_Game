import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { icreIdPlayer, idInitPlayer, savePlayer } from '../counterSlice'

const PopUpAddPlayer = ({ handleClose }) => {
    const [name, setName] = useState('')
    const idPlayer = useSelector(idInitPlayer)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const saveNamePlayer = () => {
        dispatch(savePlayer({ id: idPlayer, name }))
        dispatch(icreIdPlayer())
        handleClose()
    }
    return (
        <div>
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
        </div>
    )
}

export default PopUpAddPlayer