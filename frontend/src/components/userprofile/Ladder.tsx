import { Typography, Stack } from "@mui/material";

const Ladder = () => {
  return (
    <Stack>
      <Typography variant="h4" sx={{ borderBottom: 1, paddingBottom: 2, borderColor: "#f0f2f5" }}>
        Ladder level
      </Typography>
      <Typography variant="body1">Ladder level section</Typography>
    </Stack>
  );
};

export default Ladder;
