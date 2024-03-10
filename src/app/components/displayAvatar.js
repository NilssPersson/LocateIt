import React from "react";
import { Box } from "@mui/material";
import avatar from "animal-avatar-generator";

function DisplayAvatar({ avatarString, avatarSize }) {
  const svg = avatar(avatarString, { size: avatarSize });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))" }}
      />
    </Box>
  );
}

export default DisplayAvatar;
