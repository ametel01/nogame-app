import { useCallback } from "react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { TransactionStatus } from "../ui/TransactionStatus";
import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS, ETH_ADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";
import erc20 from "../../constants/erc20.json";
import { useContract } from "@starknet-react/core";
import { useTransactionManager } from "../../hooks/useTransactionManager";

// Keyframe for glowing effect
import { keyframes } from "@emotion/react";

const rhythmicGlow = keyframes`
  0% {
    boxShadow: 0 0 5px 1px white;
  }
  50% {
    boxShadow: 0 0 25px 5px white;
  }
  100% {
    boxShadow: 0 0 5px 1px white;
  }
`;

const StyledButton = styled(Button)({
  width: "120%",
  height: "60px",
  borderRadius: 10,
  padding: "12px 40px",
  fontSize: "1.2em",
  textTransform: "capitalize",
  letterSpacing: "0.15em",
  backgroundColor: "#0D4980", // yellow color from the image
  border: "1px solid #0F111A",
  display: "flex",
  justifyContent: "center",
  color: "white",
  boxShadow: "0 0 10px 3px white",
  animation: `${rhythmicGlow} 1.5s infinite`,
  "&:hover": {
    background: "#09345d", // slightly darker shade of yellow for hover
    boxShadow: "0 0 30px 10px white",
  },
});

interface Props {
  price: number;
}

interface Props {
  price: number;
}

export const GeneratePlanet = ({ price }: Props) => {
  const { contract: nogame } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const { contract: eth } = useContract({
    abi: erc20.abi,
    address: ETH_ADDRESS,
  });

  const {
    writeAsync,
    isLoading,
    data: tx,
  } = useContractWrite({
    calls: [
      eth?.populateTransaction["approve"]!(GAMEADDRESS, Number(price)),
      nogame?.populateTransaction["generate_planet"]!(),
    ],
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
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
      <StyledButton variant="contained" onClick={submitTx} disabled={isLoading}>
        Mint Planet
      </StyledButton>
      <TransactionStatus name="Generating Planet" tx={tx} />
    </Box>
  );
};
