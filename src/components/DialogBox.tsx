import { useEffect, useRef, Fragment } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { getFibonacciNumbers } from "../utils/getFBNumbers";
interface Props {
  numbers: number[];
}

const first1000FBNumbers = getFibonacciNumbers(1000);

const DialogBox: React.FC<Props> = ({ numbers }) => {
  const dialogBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogBoxRef.current) {
      dialogBoxRef.current.scrollTop = dialogBoxRef.current.scrollHeight;
    }
  }, [numbers]);

  return (
    <Box height={400} overflow="auto" padding={2} ref={dialogBoxRef}>
      {numbers.map((number, index) => (
        <Fragment key={index}>
          <Typography variant="body1" gutterBottom>
            {number}
          </Typography>
          {first1000FBNumbers.includes(number) ? (
            <Typography variant="body2">FIB</Typography>
          ) : (
            ""
          )}
          <Divider />
        </Fragment>
      ))}
    </Box>
  );
};

export default DialogBox;
