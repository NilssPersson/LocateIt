"use client";

import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getTeams,
  getQuestionNumber,
  setNextRound,
  updateTeamScore,
  subscribeToTeams,
  subscribeToQuestionNumber
} from "../services/admin";
import "./page.css";
import ScoreView from "./scoreView";
import AnswerView from "./answerView";
import LobbyView from "./lobbyView";
import FinishView from "./finishView";
import { calculateScore } from "../components/calculateScore";
import { questions } from "../components/questions";

export default function Admin() {
  const [teams, setTeams] = useState([]);
  const [view, setView] = useState("score");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [calculatedScores, setCalculatedScores] = useState([]);
  const [answerLong, setAnswerLong] = useState(0);
  const [answerLat, setAnswerLat] = useState(0);
  const numberOfQuestions = questions.length;

  useEffect(() => {
    console.log(questions[0]);
    console.log(questionNumber);
    setAnswerLong(questions[questionNumber].longitude);
    setAnswerLat(questions[questionNumber].latitude);
  }, [questionNumber]);

  async function updateHighestScore() {
    for (let team of calculatedScores) {
      await updateTeamScore(team.name, team.score);
      console.log(`Increased score for ${team.name} by ${team.score}`);
    }
  }

  useEffect(() => {
    if (view === "finish" || view === "answer") return;

    const handleTeamsUpdate = (teamsArray) => {
      setTeams(teamsArray);
    };

    const handleQuestionNumberUpdate = (newQuestionNumber) => {
      if (newQuestionNumber === 0) {
        setView("start");
      } else if (newQuestionNumber === numberOfQuestions) {
        setView("finish");
      } else {
        setQuestionNumber(newQuestionNumber);
      }
    };

    // Set up real-time listeners and capture cleanup functions
    const cleanupTeams = subscribeToTeams(handleTeamsUpdate);
    const cleanupQuestionNumber = subscribeToQuestionNumber(
      handleQuestionNumberUpdate
    );

    // Cleanup listeners on unmount
    return () => {
      cleanupTeams();
      cleanupQuestionNumber();
    };
  }, [numberOfQuestions, view]);

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score); // Sort the teams by score in descending order

  let previousScore = null;
  let currentColor = "gold";
  let colorCount = 0;

  const handleScoreView = () => {
    setView("answer");
    const scores = sortedTeams.map((team) => {
      const score = calculateScore(
        { lat: answerLat, lng: answerLong },
        { lat: team.answerLat, lng: team.answerLong }
      );
      return { name: team.name, score };
    });
    setCalculatedScores(scores);
  };

  const handleAnswerView = async () => {
    await updateHighestScore();
    await setNextRound();
    setView("score");
    const questionNumber = await getQuestionNumber();
    const data = await getTeams();
    if (data?.teams) {
      const teamsArray = Object.values(data.teams); // Convert the teams object to an array
      setTeams(teamsArray);
    }
    if (questionNumber === numberOfQuestions) {
      setView("finish");
      return;
    }
    setCalculatedScores([]);
    setQuestionNumber(questionNumber);
  };

  const handleStartView = async () => {
    setView("score");
    setQuestionNumber(1);
    await setNextRound();
  };

  const handleButtonClick = async () => {
    if (view === "score") {
      handleScoreView();
    } else if (view === "answer") {
      await handleAnswerView();
    } else if (view === "start") {
      await handleStartView();
    }
  };

  const renderView = () => {
    switch (view) {
      case "start":
        return <LobbyView teams={teams} />;
      case "score":
        return (
          <ScoreView
            sortedTeams={sortedTeams}
            previousScore={previousScore}
            currentColor={currentColor}
            colorCount={colorCount}
            questionNumber={questionNumber}
            numberOfQuestions={numberOfQuestions}
          />
        );
      case "answer":
        return (
          <AnswerView
            calculatedScores={calculatedScores}
            sortedTeams={sortedTeams}
            questionNumber={questionNumber}
          />
        );
      case "finish":
        return <FinishView teams={sortedTeams} />;
      default:
        return null;
    }
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
      {renderView()}
      {view !== "finish" && (
        <Button
          variant="contained"
          onClick={() => handleButtonClick()}
          sx={{
            width: "500px", // Set to the width of the cards
            height: "100px", // Set to the height of the cards
            borderRadius: "12px",
            marginTop: 8,
            marginBottom: 6
          }}
        >
          <Typography variant="h4">
            {view === "score"
              ? "Visa svar"
              : view === "start"
              ? "Starta spel"
              : "Nästa fråga"}
          </Typography>
        </Button>
      )}
    </Box>
  );
}
