import { Box, Typography, Card, CardContent } from "@mui/material";
import DisplayAvatar from "../components/displayAvatar";

export default function LobbyView({ teams }) {
  return (
    <Box>
      <img
        src="/Logo3.png"
        alt="Should be logo"
        style={{
          width: "70%",
          display: "block",
          margin: "auto",
          marginTop: "100px",
          marginBottom: "50px"
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {teams?.map((team) => (
          <Card
            key={team.name}
            sx={{
              minWidth: 275,
              margin: 2,
              borderRadius: 3,
              filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.2))",
              backgroundColor: team.hasAnswered ? "#a7c957" : "#F4F3F2"
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  direction: "column",
                  height: "100%"
                }}
              >
                <DisplayAvatar avatarString={team.avatar} avatarSize={90} />
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ marginLeft: "10px" }}
                >
                  {team.name}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
