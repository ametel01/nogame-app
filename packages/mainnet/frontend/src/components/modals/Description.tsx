import * as React from "react";
import Modal from "@mui/material/Modal";

import styled from "styled-components";

const ImageContainer = styled.div`
  width: 70px;
  cursor: pointer;
`;

const StyledDialogContent = styled("div")`
  color: #f8f8ff;
  display: grid;
  grid-template-columns: 1fr 1fr; // Two columns for the main content
  gap: 20px;
  padding: 20px; // Padding inside the dialog content
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ImageContainer onClick={handleButtonClick}>
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </ImageContainer>
      <Modal open={isModalOpen} onClose={handleClose}>
        <StyledDialogContent>{description}</StyledDialogContent>
      </Modal>
    </>
  );
}
