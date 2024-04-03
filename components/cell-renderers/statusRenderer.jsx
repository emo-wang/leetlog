import React from "react";

import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default (params) => (
    <div className="flex">
        {params.value === 'Solved' ? (< CheckCircleIcon color="success" />) :
            params.value === 'Unsolved' ? (< HighlightOffIcon color="error" />) : (< UnpublishedIcon color="success"/>)
        }
    </div>
)