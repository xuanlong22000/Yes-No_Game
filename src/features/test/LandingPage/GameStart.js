import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './GameStart.css'
const GameStart = () => {
    return (
        <div className='btn-start-game'>
            <Link style={{ textDecoration: 'none' }} to={'/addName'}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Start Game</Button>
                </Stack>
            </Link>
        </div>
    )
}

export default GameStart