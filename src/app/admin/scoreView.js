import { Box, Card, CardContent, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HexagonIcon from "@mui/icons-material/Hexagon";
import DisplayAvatar from "../components/displayAvatar";

export default function ScoreView({
  sortedTeams,
  previousScore,
  currentColor,
  colorCount,
  questionNumber,
  numberOfQuestions
}) {
  return (
    <>
      <Box marginBottom={"120px"}>
        <Card
          sx={{
            minWidth: 350,
            marginTop: 10,
            borderRadius: 1,
            filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.2))",
            backgroundColor: "#F4F3F2"
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              component="div"
              sx={{ textAlign: "center", margin: 1 }}
            >
              Poängställning
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "center" }}
            >
              Fråga {questionNumber} av {numberOfQuestions - 1}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {sortedTeams.map((team, index) => {
        let hexagonColor;
        if (team.score !== previousScore) {
          if (colorCount === 0) {
            hexagonColor = "#ffbf00";
            currentColor = "#ffbf00";
          } else if (colorCount === 1) {
            hexagonColor = "#c0c0c0";
            currentColor = "#c0c0c0";
          } else if (colorCount === 2) {
            hexagonColor = "#cd7f32";
            currentColor = "#cd7f32";
          } else {
            hexagonColor = "#A93F55";
            currentColor = "#A93F55";
          }
          colorCount++;
        } else {
          hexagonColor = currentColor;
        }
        previousScore = team.score;

        return (
          <Card
            key={team.name}
            sx={{
              minWidth: 700,
              marginTop: 2,
              borderRadius: 3,
              filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.2))",
              backgroundColor: team.hasAnswered ? "#a7c957" : "#F4F3F2"
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DisplayAvatar avatarString={team.avatar} avatarSize={80} />
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography variant="h4" component="div">
                      {team.name}
                    </Typography>
                    <Typography variant="h6">Poäng: {team.score}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: "80px",
                    height: "80px"
                  }}
                >
                  <EmojiEventsIcon
                    sx={{
                      fontSize: 60,
                      color: "#F4F3F2",
                      zIndex: 3,
                      position: "absolute",
                      filter: "drop-shadow(1px 1px rgba(0, 0, 0, 0.4))"
                    }}
                  />
                  <HexagonIcon
                    sx={{
                      fontSize: 90,
                      color: hexagonColor,
                      zIndex: 2,
                      position: "absolute",
                      filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8))",
                      transform: "rotate(30deg)"
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
