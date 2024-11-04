import { Box, Typography, Card, CardContent } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HexagonIcon from "@mui/icons-material/Hexagon";
import TeamName from "../components/dynamicFont";
import { motion } from "framer-motion";

export default function FinishView({ teams }) {
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

  const baseHeight = 600;
  const maxScore = orderedGroups[1][0].score;

  const slideUpVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 2, delay: custom }
    })
  };

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
          height: "80%"
        }}
      >
        {orderedGroups.map((group, index) => {
          const scoreRatio = maxScore > 0 ? group[0].score / maxScore : 1;
          const height = index === 1 ? baseHeight : baseHeight * scoreRatio;
          const boxHeight = Math.max(height, 270);

          return (
            <motion.div
              key={group[0].score}
              custom={(3 - index) * 0.5}
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
              style={{ zIndex: index === 1 ? 3 : index === 0 ? 2 : 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  zIndex: index === 1 ? 3 : index === 0 ? 2 : 1,
                  transform: index === 1 ? "scale(1.1)" : "scale(1)"
                }}
              >
                {group?.map((team, idx) => (
                  <TeamName key={idx} team={team} />
                ))}
                <Box
                  sx={{
                    width: "200px",
                    height: `${boxHeight}px`,
                    backgroundColor: "#018dff",
                    borderRadius: 1,
                    position: "relative",
                    boxShadow:
                      index === 1
                        ? "0px 15px 20px rgba(0, 0, 0, 0.3)"
                        : "0px 10px 15px rgba(0, 0, 0, 0.15)"
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
                          : "#cd7f32",
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
                      top: 170,
                      left: "50%",
                      transform: "translateX(-50%)",
                      textAlign: "center"
                    }}
                  >
                    {group[0].score} poäng
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
