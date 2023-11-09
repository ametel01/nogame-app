import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";

const theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
      },
    },
  },
});

const ImageContainer = styled.div`
  width: 70px;
  cursor: pointer;
`;

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #1a2025;
  color: #d0d3da;
`;

const StyledDialogContent = styled(DialogContent)`
  background-color: #1a2025;
  color: #d0d3da;
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 8px;
    overflow: hidden;
    background-color: #1a2025;
    border: "1px solid #2E3A45";
  }
`;

interface ModalProps {
  image: string;
  title: string;
  description: React.ReactNode;
}

export default function DescriptionModal({
  image,
  title,
  description,
}: ModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ImageContainer onClick={handleModalOpen}>
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </ImageContainer>
      <StyledDialog
        open={open}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle variant="h4">{title}</StyledDialogTitle>
        <StyledDialogContent>{description}</StyledDialogContent>
      </StyledDialog>
    </ThemeProvider>
  );
}
