import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Tooltip } from "@mui/material";

export default (params) => {
    return (
        <Stack direction="row" spacing={1}>
            {params.data.dates.map((date, index) => {
                const attempt = params.data.attempts[index]
                return (
                    <Tooltip
                        onClick={e => { e.preventDefault(e) }}
                        key={index}
                        title={attempt === 0 ? 'Solved' : (attempt === 1 ? 'Unsolved' : 'Best Solution')}
                        arrow>
                        < Chip
                            size="small"
                            label={date}
                            variant="outlined"
                            color={attempt === 0 ? 'primary' : (attempt === 1 ? 'error' : 'success')}
                        />
                    </ Tooltip>)
            }
            )}
        </ Stack>)
}