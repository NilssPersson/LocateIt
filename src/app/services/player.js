import { useState, useEffect } from "react";
import { ref, set, get, update, onValue, off } from "firebase/database";
import { database } from "../firebase";

export const addTeam = async (teamName, avatar) => {
  try {
    const teamRef = ref(database, `teams/${teamName}`);
    await set(teamRef, {
      score: 0,
      hasAnswered: false,
      answerLat: 0,
      answerLong: 0,
      name: teamName,
      avatar: avatar
    });
  } catch (error) {
    console.error(error);
  }
};

export const addTeamAnswer = async (teamName, answer) => {
  try {
    const teamRef = ref(database, `teams/${teamName}`);
    await update(teamRef, {
      answerLat: answer.lat,
      answerLong: answer.lng,
      hasAnswered: true
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOneTeam = async (teamName) => {
  try {
    const teamRef = ref(database, `teams/${teamName}`);
    const snapshot = await get(teamRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getGameStatus = async (teamName) => {
  try {
    const teamRef = ref(database, `teams/${teamName}`);
    const gameRef = ref(database, "game");

    const teamSnap = await get(teamRef);
    if (!teamSnap.exists()) {
      console.error("Team not found");
      return null;
    }

    const gameSnap = await get(gameRef);
    if (!gameSnap.exists()) {
      console.error("Game not found");
      return null;
    }

    return {
      score: teamSnap.val().score,
      hasAnswered: teamSnap.val().hasAnswered,
      questionNumber: gameSnap.val().questionNumber
    };
  } catch (error) {
    console.error(error);
  }
};

export const useGameStatus = (teamName) => {
  const [hasAnswered, setHasAnswered] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(null);

  useEffect(() => {
    const teamRef = ref(database, `teams/${teamName}`);
    const gameRef = ref(database, "game");

    const handleTeamChange = (snapshot) => {
      if (snapshot.exists()) {
        const teamData = snapshot.val();
        setHasAnswered(teamData.hasAnswered);
      } else {
        console.error("Team not found");
      }
    };

    const handleGameChange = (snapshot) => {
      if (snapshot.exists()) {
        const gameData = snapshot.val();
        setQuestionNumber(gameData.questionNumber);
      } else {
        console.error("Game not found");
      }
    };

    onValue(teamRef, handleTeamChange);
    onValue(gameRef, handleGameChange);

    return () => {
      off(teamRef, "value", handleTeamChange);
      off(gameRef, "value", handleGameChange);
    };
  }, [teamName]);

  return { hasAnswered, questionNumber, setHasAnswered };
};
