import { useEffect, useState } from "react";
import { useWaitForTransaction } from "@starknet-react/core";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledBox, HeaderDiv } from "../buttons/ButtonAttackPlanet";
import { InvokeFunctionResponse } from "starknet";

interface Props {
  name: string;
  tx: InvokeFunctionResponse | undefined;
}

export function TransactionStatus({ name, tx }: Props) {
  const [showModal, setShowModal] = useState(false);

  const { isSuccess, isLoading } = useWaitForTransaction({
    hash: tx?.transaction_hash,
    watch: true,
    retry: true,
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (isLoading) {
      setShowModal(true);
    }
    if (isSuccess) {
      const timer = setTimeout(() => {
        handleModalClose();
        // Here, add any additional logic to reset the transaction state if possible
      }, 4000);
      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [isSuccess]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const loadingBody = (
    <div style={{ margin: "10px", padding: "10px" }}>
      <StyledBox style={{ width: "40%" }}>
        <HeaderDiv style={{ display: "flex", justifyContent: "center" }}>
          {name}
        </HeaderDiv>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "30px" }}
        >
          <CircularProgress size={32} />
        </div>
      </StyledBox>
    </div>
  );

  const successBody = (
    <div
      style={{
        margin: "10px",
        padding: "10px",
      }}
    >
      <StyledBox style={{ width: "40%" }}>
        <HeaderDiv style={{ display: "flex", justifyContent: "center" }}>
          {name} successful!
        </HeaderDiv>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            margin: "10px",
          }}
        >
          <CheckCircleIcon
            style={{
              fontSize: "64px",
              color: "green",
            }}
          />
        </div>
      </StyledBox>
    </div>
  );

  return (
    <>
      {showModal ? (
        isLoading ? (
          <Modal
            open={showModal}
            onClose={handleModalClose}
            disableAutoFocus={true}
          >
            {loadingBody}
          </Modal>
        ) : (
          <Modal
            open={showModal}
            onClose={handleModalClose}
            disableAutoFocus={true}
          >
            {successBody}
          </Modal>
        )
      ) : (
        <></>
      )}
    </>
  );
}
