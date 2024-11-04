import { Box, Button, TextField, Typography, Collapse } from "@mui/material";
import { useState } from "react";
import Cookies from "js-cookie";
import { addTeam, getOneTeam } from "../services/player.js";
import "./addTeam.css";
import { Globe } from "../components/Globe.js";
import SelectAvatar from "../components/selectAvatar.js";

export default function AddTeam({ setTeamName }) {
  const [inputName, setInputName] = useState("");
  const [avatarString, setAvatarString] = useState(Math.random().toString());

  const handleBlur = () => {
    setTimeout(() => {
      window.scrollTo({ top: -1, behavior: "smooth" });
    }, 1);
  };

  const newTeam = async () => {
    const teamExists = await getOneTeam(inputName);
    if (!teamExists) {
      console.log(avatarString);
      await addTeam(inputName, avatarString);
    }
    setTeamName(inputName);
    Cookies.set("teamName", inputName);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <Box>
        <img
          src="/Logo3.png"
          alt="Logo"
          style={{
            width: "85%",
            display: "block",
            margin: "auto",
            marginTop: "70px"
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "100px",
          width: "70%",
          backgroundColor: "#F4F3F2",
          p: 1.2,
          borderRadius: "8px"
        }}
      >
        <TextField
          label="Lagnamn"
          value={inputName}
          onBlur={handleBlur}
          onChange={(e) => setInputName(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Collapse in={inputName !== ""} timeout={300}>
          <SelectAvatar
            avatarString={avatarString}
            setAvatarString={setAvatarString}
          />
        </Collapse>
        <Button
          onClick={() => newTeam()}
          variant="contained"
          disabled={inputName === ""}
          style={{ marginTop: "10px", width: "100%", height: "50px" }}
        >
          Spela
        </Button>
      </Box>
      <Globe />
    </Box>
  );
}
