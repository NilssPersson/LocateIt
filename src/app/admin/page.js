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
  const [firstAnswerTime, setFirstAnswerTime] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const [bonusPoints, setBonusPoints] = useState({});

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

      const currentTime = Date.now();
      for (let team of teamsArray) {
        if (team.hasAnswered) {
          if (!bonusPoints[team.name]) {
            // Check if the team is the first to answer
            if (firstAnswerTime === null) {
              setFirstAnswerTime(currentTime);
              setBonusPoints((prev) => ({ ...prev, [team.name]: 200 })); // 200 points for the first team
              setTimerActive(true);
            } else {
              // Calculate elapsed time since the first answer
              const elapsedTime = currentTime - firstAnswerTime;
              if (elapsedTime <= 30000) {
                // No points after 30 seconds
                const bonus = Math.max(
                  0,
                  150 - Math.floor((elapsedTime / 30000) * 150)
                );
                setBonusPoints((prev) => ({
                  ...prev,
                  [team.name]: (prev[team.name] || 0) + bonus
                }));
              }
            }
          }
        }
      }
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

    const cleanupTeams = subscribeToTeams(handleTeamsUpdate);
    const cleanupQuestionNumber = subscribeToQuestionNumber(
      handleQuestionNumberUpdate
    );

    return () => {
      cleanupTeams();
      cleanupQuestionNumber();
    };
  }, [numberOfQuestions, view, firstAnswerTime, bonusPoints]); // Removed bonusPoints from dependencies

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
    setFirstAnswerTime(null);
    setTimerActive(false);
    setTimer(30);
    setQuestionNumber(questionNumber);
    setBonusPoints({});
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
            bonusPoints={bonusPoints}
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
