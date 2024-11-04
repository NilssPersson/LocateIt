import React from "react";
import { Box, Button, Typography } from "@mui/material";
import avatar from "animal-avatar-generator";

export default function SelectAvatar({ avatarString, setAvatarString }) {
  const [avatarSVG, setAvatarSVG] = React.useState(
    avatar(avatarString, { size: 80 })
  );

  const handleNewAvatar = () => {
    const newString = Math.random().toString();
    setAvatarString(newString);
    const newAvatar = avatar(newString, { size: 80 });
    setAvatarSVG(newAvatar);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px"
      }}
    >
      <Typography variant="h6">Välj maskot</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div id="avatar" dangerouslySetInnerHTML={{ __html: avatarSVG }} />
      </Box>
      <Button onClick={handleNewAvatar}>Generera ny</Button>
    </Box>
  );
}
