import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

// Define the bobbing animation
const bobbing = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

export const Globe = () => {
  return (
    <Box
      sx={{
        height: "25vh",
        overflow: "hidden",
        position: "absolute", // Position the box absolutely
        bottom: "0", // Position the box at the bottom of the page
        width: "100%", // Make the box span the entire width of the page
        transform: "rotate(180deg)", // Rotate the box 180 degrees
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: "-1" // Make the box appear behind other elements
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute", // Position the box absolutely
          bottom: "0", // Position the box at the bottom of the outer box
          display: "flex", // Make the box a flex container
          alignItems: "center", // Center the image vertically
          justifyContent: "center", // Center the image horizontally
          animation: `${bobbing} 4s ease-in-out infinite` // Apply the bobbing animation
        }}
      >
        <img
          src="/Globe5.png"
          alt="A globe should be displayed"
          style={{
            width: "110%",
            transform: "rotate(180deg)"
          }}
        />
      </Box>
    </Box>
  );
};
