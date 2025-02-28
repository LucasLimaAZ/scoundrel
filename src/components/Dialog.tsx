import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const Dialog = ({ open, onClose }: DialogProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          You lost! 💀
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your health reached 0!
        </Typography>
      </Box>
    </Modal>
  );
};

export default Dialog;
