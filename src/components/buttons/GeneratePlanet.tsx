import { useCallback } from "react";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";
import { useContract } from "@starknet-react/core";
import { useTransactionManager } from "../../hooks/useTransactionManager";

const StyledButton = styled(Button)({
  width: "100%",
  borderRadius: 8,
  padding: "16px 64px",
  textTransform: "capitalize",
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "0.15em",
  border: "1px solid #7FA0B3", // Using the light blue-grey for the border.
  display: "flex",
  justifyContent: "center",
  background: "linear-gradient(90deg, #1B1E2A 0%, #454D74 50%, #363C5C 100%)", // Gradient using the main background, deep blue, and a darker shade.
  color: "#ECD9A0", // Keeping the golden star-like color for the text.
  "&:hover": {
    background: "linear-gradient(90deg, #111427 0%, #36405A 50%, #2B2E3C 100%)", // Slightly darkened versions for hover.
  },
});

export const GeneratePlanet = () => {
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
    <Box position="relative" display="inline-flex">
      {isLoading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px", // half the size
            marginLeft: "-12px", // half the size
          }}
        />
      )}
      <StyledButton
        variant="contained"
        onClick={submitTx}
        startIcon={<RocketLaunchIcon />}
        disabled={isLoading} // disable the button when loading
      >
        Mint Planet
      </StyledButton>
    </Box>
  );
};
