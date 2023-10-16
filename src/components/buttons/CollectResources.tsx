import { useCallback } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
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

const StyleCircProgress = styled(CircularProgress)(() => ({
  position: "absolute",
  zIndex: 1, // ensure it's above the button
}));

export function UseCollectResources() {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });
  const { writeAsync, isLoading } = useContractWrite({
    calls: [contract?.populateTransaction["collect_resources"]!()],
  });

  const { add } = useTransactionManager();

  const submitTx = useCallback(async () => {
    const tx = await writeAsync({});
    add(tx.transaction_hash);
  }, [writeAsync]);

  return (
    <>
      <StyledBox>
        {(isLoading || (status !== "success" && status !== "idle")) && (
          <StyleCircProgress size={24} />
        )}
        <StyledButton
          fullWidth
          style={{ margin: "4px", background: "#4A63AA" }}
          onClick={submitTx}
          variant="contained"
        >
          Collect Resources
        </StyledButton>
      </StyledBox>
    </>
  );
}
