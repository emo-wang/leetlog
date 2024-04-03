import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { formatDate } from "@utils/formatDate";

export default (params) => {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Stack direction="row" spacing={1}>
            <Chip label={formatDate(new Date(params.value))} variant="outlined" size="small" />
        </Stack>
    );
}