import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { TransactionStatus } from "../ui/TransactionStatus";
import { GAMEADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";
import { useContractWrite } from "@starknet-react/core";
import { StyledButton } from "../../shared/styled/Button";
import { useContract } from "@starknet-react/core";
import { useTransactionManager } from "../../hooks/useTransactionManager";

const StyledBox = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center", // center vertically
}));

export function UseCollectResources() {
  const [isClicked, setIsClicked] = useState(false);

  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });
  const { writeAsync, data: tx } = useContractWrite({
    calls: [contract?.populateTransaction["collect_resources"]!()],
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync();
    add(tx.transaction_hash);
  }, [writeAsync]);

  const handleOnClick = () => {
    submitTx();
    setIsClicked(true);
  };

  return (
    <>
      <StyledBox>
        <StyledButton
          fullWidth
          style={{ margin: "4px", background: "#4A63AA" }}
          onClick={handleOnClick}
          variant="contained"
        >
          Collect Resources
        </StyledButton>
      </StyledBox>
      {isClicked ? (
        <TransactionStatus name="Collect Resources" tx={tx} />
      ) : (
        <></>
      )}
    </>
  );
}
