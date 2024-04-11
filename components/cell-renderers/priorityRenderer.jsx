import React from "react";
import Chip from '@mui/material/Chip';

export default (params) => {

    switch (params.value) {
        case 0: {
            return (
                <Chip label={'low'} style={{ color: 'white', backgroundColorL: '#45a779' }} color="success" size="small" />
            );
        }
        case 1: {
            return (
                <Chip label={'medium-'} style={{ color: 'white', backgroundColor: '#82a745' }} color="success" size="small" />
            );
        }
        case 2: {
            return (
                <Chip label={'medium'} style={{ color: 'white', backgroundColor: '#a7a345' }} size="small" />
            );
        }
        case 3: {
            return (
                <Chip label={'medium+'} style={{ color: 'white', backgroundColor: "#df5406" }} size="small" />
            );
        }
        case 4: {
            return (
                <Chip label={'high'} style={{ color: 'white', backgroundColor: "#df0606" }} size="small" />
            );
        }
    }
}