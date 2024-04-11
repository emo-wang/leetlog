import React from "react";

import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default (params) => (
    <div className="flex">
        {params.value === 2 ? (< CheckCircleIcon color="success" />) :
            params.value === 1 ? (< HighlightOffIcon color="error" />) : (< UnpublishedIcon color="success"/>)
        }
    </div>
)