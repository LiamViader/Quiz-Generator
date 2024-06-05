import React from "react";
import { Typography } from "@mui/material";

function DropStyled(){
    const backgroundImage = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%23000000FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`;
    const borderRadius = `18px`;
    
    return(
        <div
            className="drop-container"
            style={{ backgroundImage: backgroundImage, borderRadius: borderRadius }}
        >
            <div className="box-1">
            </div>
            <div className="box-2">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Drop two CSV files here
            </Typography>
            </div>
        </div>
    )
}

export default DropStyled;