import { Box, Typography } from "@mui/material";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Polyline,
  OverlayView
} from "@react-google-maps/api";
import { questions } from "../components/questions";
import { useState, useEffect, useCallback } from "react";
import avatar from "animal-avatar-generator";
import { BorderColor } from "@mui/icons-material";

const containerStyle = {
  width: "100%",
  height: "100%",
  zIndex: 1
};

export default function AnswerView({
  sortedTeams,
  questionNumber,
  calculatedScores
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [answerLong, setAnswerLong] = useState(0);
  const [answerLat, setAnswerLat] = useState(0);
  const [map, setMap] = useState(null);

  useEffect(() => {
    setAnswerLong(questions[questionNumber].longitude);
    setAnswerLat(questions[questionNumber].latitude);
  }, [questionNumber]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey
  });

  const onLoad = useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      const bounds = new window.google.maps.LatLngBounds();

      // Extend bounds with each team position and the answer position
      sortedTeams.forEach((team) => {
        bounds.extend({ lat: team.answerLat, lng: team.answerLong });
      });
      bounds.extend({ lat: answerLat, lng: answerLong });

      // Fit map to bounds
      mapInstance.fitBounds(bounds);
    },
    [sortedTeams, answerLat, answerLong]
  );

  return (
    isLoaded && (
      <Box sx={{ height: "75vh", width: "85vw", marginTop: "60px" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
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
            const svgWithBorder = avatarSVG.replace(
              "<svg ",
              `<svg style="border: 2px solid black; border-radius: 50%;" `
            );
            const avatarDataURL = `data:image/svg+xml,${encodeURIComponent(
              svgWithBorder
            )}`;

            return (
              <div key={index}>
                <Marker
                  position={{ lat: team.answerLat, lng: team.answerLong }}
                  icon={{
                    url: avatarDataURL,
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                  sx={{
                    BorderColor: "black",
                    borderRadius: "50%"
                  }}
                />
                <OverlayView
                  position={{ lat: team.answerLat, lng: team.answerLong }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      width: "fit-content",
                      padding: "5px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      marginTop: "-38px",
                      transform: "translate(-50%, -100%)" // Center above marker
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "0.85rem", marginRight: "4px" }}
                    >
                      {team.name}:
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem" }}>
                      {
                        calculatedScores.find((item) => item.name === team.name)
                          ?.score
                      }
                    </Typography>
                  </Box>
                </OverlayView>

                <Polyline
                  path={[
                    { lat: answerLat, lng: answerLong },
                    { lat: team.answerLat, lng: team.answerLong }
                  ]}
                  options={{ strokeColor: "#069E2D" }}
                />
              </div>
            );
          })}
        </GoogleMap>
      </Box>
    )
  );
}
