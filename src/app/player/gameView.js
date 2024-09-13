import {
  Box,
  Typography,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";
import "./gameView.css";
import { useState } from "react";
import { addTeamAnswer, useGameStatus } from "../services/player";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { costomMapStyle } from "../components/mapStyle";
import React, { useRef } from "react";
import { Globe } from "../components/Globe";
import { questions } from "../components/questions";

const theme = createTheme({
  palette: {
    background: {
      default: "#64b5f6", // replace #yourColor with your desired color
      paper: "#F4F3F2"
    }
  }
});

const containerStyle = {
  width: "100%",
  height: "100%",
  zIndex: 1
};

const center = {
  lat: 50.06864452482607,
  lng: 19.947547539452582
};

export default function GameView({ teamName }) {
  const { hasAnswered, questionNumber, setHasAnswered } =
    useGameStatus(teamName);
  const [markerPosition, setMarkerPosition] = useState(center);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const markerPositionRef = useRef(markerPosition);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey
  });

  const addAnswer = async () => {
    const answer = {
      lat: markerPositionRef.current.lat,
      lng: markerPositionRef.current.lng
    };
    setHasAnswered(true);
    await addTeamAnswer(teamName, answer);
  };

  const GuessView = () => {
    return (
      <Box sx={{ width: "100%", height: "100dvh" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          options={{
            disableDefaultUI: true,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            gestureHandling: "greedy",
            styles: costomMapStyle
          }}
        >
          <Box
            className="questionTitle"
            sx={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#F4F3F2",
              borderRadius: "8px",
              padding: "10px",
              borderWidth: "0.5px",
              borderStyle: "solid"
            }}
          >
            <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
              <img
                src="/markerIcon.png"
                alt="markerIcon"
                style={{
                  width: "40px",
                  height: "40px",
                  verticalAlign: "middle"
                }}
              />
              {questions[questionNumber]?.title}
            </Typography>
          </Box>
          <Marker
            className="marker"
            position={markerPosition}
            draggable={true}
            onDragEnd={(event) => {
              markerPositionRef.current = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              };
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => addAnswer()}
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            Svara
          </Button>
        </GoogleMap>
      </Box>
    );
  };

  const WaitingView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "250px"
        }}
      >
        <Typography variant="h5">Väntar på nästa fråga...</Typography>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100dvh",
            overflow: "hidden"
          }}
        >
          {hasAnswered || questionNumber === 0 ? (
            <WaitingView />
          ) : (
            isLoaded && <GuessView />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: -1
        }}
      >
        {(hasAnswered || questionNumber == 0) && <Globe />}
      </Box>
    </ThemeProvider>
  );
}
