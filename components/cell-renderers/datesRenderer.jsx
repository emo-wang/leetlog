import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default (params) => {
    return (
        <>
            {params.value.map((item, index) =>
                <Stack direction="row" spacing={1} key={index}>
                    <Chip label={item} variant="outlined" size="small" />
                </Stack>
            )}
        </>)
}