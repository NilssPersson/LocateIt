import { Box, Typography, Card, CardContent } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HexagonIcon from "@mui/icons-material/Hexagon";
import TeamName from "../components/dynamicFont";

export default function FinishView({ teams }) {
  // Group the teams by their scores
  const groups = teams.reduce((groups, team) => {
    const score = team.score;
    if (!groups[score]) {
      groups[score] = [];
    }
    groups[score].push(team);
    return groups;
  }, {});

  const sortedGroups = Object.values(groups).sort(
    (a, b) => b[0].score - a[0].score
  );

  const emptyGroup = [{ name: "", score: 0 }];

  while (sortedGroups.length < 3) {
    sortedGroups.push(emptyGroup);
  }

  const orderedGroups = [sortedGroups[1], sortedGroups[0], sortedGroups[2]];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Box marginBottom={"100px"}>
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
              Resultat
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-end",
          width: "100%",
          height: "80%",
          padding: 2
        }}
      >
        {orderedGroups.map((group, index) => (
          <Box
            key={group[0].score}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {group?.map((team, index) => (
              <TeamName key={index} team={team} />
            ))}
            <Box
              sx={{
                width: "200px",
                height: `${index === 2 ? 400 : index === 1 ? 600 : 500}px`,
                backgroundColor: "#018dff",
                borderRadius: 1,
                transition: "height 0.5s",
                position: "relative"
              }}
            >
              <EmojiEventsIcon
                sx={{
                  fontSize: 90,
                  color: "#F4F3F2",
                  zIndex: 3,
                  position: "absolute",
                  top: 40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.4))"
                }}
              />
              <HexagonIcon
                sx={{
                  fontSize: 130,
                  color:
                    index === 1
                      ? "#ffbf00"
                      : index === 0
                      ? "#c0c0c0"
                      : index === 2
                      ? "#cd7f32"
                      : "#A93F55",
                  zIndex: 2,
                  position: "absolute",
                  top: 20,
                  left: "50%",
                  transform: "translateX(-50%) rotate(30deg)",
                  filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8))"
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  position: "absolute",
                  top: 170, // Adjust this value as needed
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center"
                }}
              >
                {group[0].score} poäng
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
