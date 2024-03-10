"use client";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import AddTeam from "./addTeam";
import GameView from "./gameView";
import { Box } from "@mui/material";

export default function Player() {
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const cookieTeamName = Cookies.get("teamName");
    if (cookieTeamName) {
      setTeamName(cookieTeamName);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return teamName === "" ? (
    <AddTeam teamName={teamName} setTeamName={setTeamName} />
  ) : (
    <Box>
      <GameView teamName={teamName} />
    </Box>
  );
}
