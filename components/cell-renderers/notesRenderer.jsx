import React from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(14),
        border: '1px solid #dadde9',
    },
}));

export default (params) => {
    return (
        params.value ? (<HtmlTooltip
            title={
                <React.Fragment>
                    {params.value}
                </React.Fragment>
            }
        >
            <DescriptionIcon />
        </HtmlTooltip>) : <></>
    )

}