import { Box, Typography } from "@mui/material";

export interface Props {
  messages: string[];
}

const DialogBox: React.FC<Props> = ({ messages }) => {
  return (
    <Box height={400} overflow="auto" padding={2}>
      {messages.map((message, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          {message}
        </Typography>
      ))}
    </Box>
  );
};

export default DialogBox;
