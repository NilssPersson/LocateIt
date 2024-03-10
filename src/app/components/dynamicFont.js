import React, { useEffect, useRef } from "react";
import fitty from "fitty";
import { Box, Typography } from "@mui/material";

function TeamName({ team }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      fitty(textRef.current, {
        minSize: 12,
        maxSize: 50
      });
    }
  }, [team]);

  return (
    <Box
      sx={{
        width: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography ref={textRef} sx={{ textAlign: "center" }}>
        {team.name}
      </Typography>
    </Box>
  );
}

export default TeamName;
