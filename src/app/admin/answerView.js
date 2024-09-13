import { Box, Typography } from "@mui/material";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  Polyline
} from "@react-google-maps/api";
import { questions } from "../components/questions";
import { useState, useEffect } from "react";
import avatar from "animal-avatar-generator";

const containerStyle = {
  width: "100%",
  height: "100%",
  zIndex: 1
};

const center = {
  lat: 50,
  lng: 20
};

export default function AnswerView({
  sortedTeams,
  questionNumber,
  calculatedScores
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [answerLong, setAnswerLong] = useState(0);
  const [answerLat, setAnswerLat] = useState(0);

  useEffect(() => {
    setAnswerLong(questions[questionNumber].longitude);
    setAnswerLat(questions[questionNumber].latitude);
  }, [questionNumber]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey
  });

  return (
    isLoaded && (
      <Box sx={{ height: "75vh", width: "85vw", marginTop: "60px" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          options={{
            disableDefaultUI: true,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false
          }}
        >
          <Marker position={{ lat: answerLat, lng: answerLong }} />
          {sortedTeams.map((team, index) => {
            const avatarSVG = avatar(team.avatar, { size: 40 });
            const avatarDataURL = `data:image/svg+xml,${encodeURIComponent(
              avatarSVG
            )}`;
            return (
              <>
                <Marker
                  key={index}
                  position={{ lat: team.answerLat, lng: team.answerLong }}
                  icon={{
                    url: avatarDataURL,
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                />
                <InfoWindow
                  position={{ lat: team.answerLat, lng: team.answerLong }}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -30)
                  }}
                  onCloseClick={() => {}}
                >
                  <Box sx={{ margin: "1px" }}>
                    <Typography sx={{ fontSize: "0.85rem" }}>
                      {team.name}:{" "}
                      {
                        calculatedScores.find((item) => item.name === team.name)
                          ?.score
                      }
                    </Typography>
                  </Box>
                </InfoWindow>
                <Polyline
                  path={[
                    { lat: answerLat, lng: answerLong },
                    { lat: team.answerLat, lng: team.answerLong }
                  ]}
                  options={{ strokeColor: "#069E2D" }}
                />
              </>
            );
          })}
        </GoogleMap>
      </Box>
    )
  );
}
