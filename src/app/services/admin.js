import { ref, get, set, update, child, onValue, off } from "firebase/database";
import { database } from "../firebase";

export const getTeams = async () => {
  try {
    const teamsRef = ref(database, "teams");
    const snapshot = await get(teamsRef);
    console.log({ teams: snapshot.val() });
    return { teams: snapshot.val() };
  } catch (error) {
    console.error(error);
  }
};

export const subscribeToTeams = (callback) => {
  const teamsRef = ref(database, "teams");

  const unsubscribe = onValue(teamsRef, (snapshot) => {
    const teamsData = snapshot.val();
    callback(teamsData ? Object.values(teamsData) : []);
  });

  // Return cleanup function to unsubscribe
  return () => off(teamsRef);
};

export const subscribeToQuestionNumber = (callback) => {
  const questionNumberRef = ref(database, "game/questionNumber");

  const unsubscribe = onValue(questionNumberRef, (snapshot) => {
    const questionNumber = snapshot.val();
    callback(questionNumber);
  });

  // Return cleanup function to unsubscribe
  return () => off(questionNumberRef);
};

export const setNextRound = async (req, res) => {
  try {
    const gameRef = ref(database, "game");
    const teamsRef = ref(database, "teams");

    const gameSnap = await get(gameRef);
    if (!gameSnap.exists()) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    // Increase questionNumber by 1
    await update(gameRef, {
      questionNumber: gameSnap.val().questionNumber + 1
    });

    // Set hasAnswered to false and nullify answer for all teams
    const teamsSnap = await get(teamsRef);
    const updates = [];
    teamsSnap.forEach((teamSnap) => {
      updates.push(
        update(child(teamsRef, teamSnap.key), {
          hasAnswered: false,
          answerLong: 0,
          answerLat: 0
        })
      );
    });
    await Promise.all(updates);
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionNumber = async () => {
  try {
    const gameRef = ref(database, "game");
    const snapshot = await get(gameRef);
    console.log(snapshot.val().questionNumber);
    return snapshot.val().questionNumber;
  } catch (error) {
    console.error(error);
  }
};

export const increaseTeamScore = async (teamName) => {
  try {
    const teamRef = ref(database, `teams/${teamName}`);
    const snapshot = await get(teamRef);
    if (!snapshot.exists()) {
      console.error("Team not found");
      return;
    }
    const currentScore = snapshot.val().score || 0;
    await update(teamRef, { score: currentScore + 1 });
    console.log("Score updated successfully");
  } catch (error) {
    console.error(error);
  }
};

export const updateTeamScore = async (teamName, newScore) => {
  try {
    const teamRef = ref(database, `teams/${teamName}`);
    const snapshot = await get(teamRef);
    if (!snapshot.exists()) {
      console.error("Team not found");
      return;
    }
    const currentScore = snapshot.val().score || 0;
    await update(teamRef, { score: currentScore + newScore });
    console.log("Score updated successfully");
  } catch (error) {
    console.error(error);
  }
};
