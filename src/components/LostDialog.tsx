import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const LostDialog = ({ open, onClose }: DialogProps) => {
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
        <Typography
          id="modal-modal-title"
          sx={{ fontSize: "46px", textAlign: "center" }}
        >
          ☠️ You died! ☠️
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ fontSize: "16px", textAlign: "center", mt: 2 }}
        >
          Your health reached 0.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            fontSize: "12px",
            textAlign: "center",
            mt: 2,
            fontWeight: "bold",
          }}
        >
          Don't give up! Try again.
        </Typography>
      </Box>
    </Modal>
  );
};

export default LostDialog;
