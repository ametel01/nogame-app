import { useEffect, useState } from "react";
import { useWaitForTransaction } from "@starknet-react/core";
import Modal from "@mui/material/Modal";
// import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  StyledBox,
  HeaderDiv,
  CloseStyledIcon,
} from "../buttons/ButtonSendFleet";

interface Props {
  name: string;
  hash: string;
}

export function TransactionStatus({ name, hash }: Props) {
  const [showModal, setShowModal] = useState(false);

  const { isSuccess } = useWaitForTransaction({
    hash,
    watch: true,
    retry: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
      const timer = setTimeout(() => {
        handleModalClose();
        // Here, add any additional logic to reset the transaction state if possible
      }, 3000);
      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [isSuccess]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  //   const loadingBody = (
  //     <StyledBox>
  //       <HeaderDiv>
  //         {name}
  //         <CloseStyledIcon onClick={handleModalClose} />
  //       </HeaderDiv>
  //       <CircularProgress size={32} />
  //     </StyledBox>
  //   );

  const successBody = (
    <StyledBox>
      <HeaderDiv
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        {name} successfull!
        <CloseStyledIcon onClick={handleModalClose} />
      </HeaderDiv>
      <CheckCircleIcon />
    </StyledBox>
  );

  return (
    <>
      {showModal ? (
        <Modal open={showModal} onClose={handleModalClose}>
          {successBody}
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
