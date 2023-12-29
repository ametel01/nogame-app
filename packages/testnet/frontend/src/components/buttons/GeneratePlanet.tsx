import { useState } from "react";
import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { TransactionStatus } from "../ui/TransactionStatus";
import { useContractWrite } from "@starknet-react/core";
import { GAMEADDRESS, ETH_ADDRESS } from "../../constants/addresses";
import game from "../../constants/nogame.json";
import erc20 from "../../constants/erc20.json";
import { useContract } from "@starknet-react/core";

interface Props {
  price: number;
}

interface Props {
  price: number;
}

export const GeneratePlanet = ({ price }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const { contract: nogame } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const { contract: eth } = useContract({
    abi: erc20.abi,
    address: ETH_ADDRESS,
  });

  const { writeAsync, isPending, data } = useContractWrite({
    calls: [
      eth?.populateTransaction["approve"]!(GAMEADDRESS, {
        low: Number(price),
        high: 0,
      }),
      nogame?.populateTransaction["generate_planet"]!(),
    ],
  });

  const handleOnClick = () => {
    writeAsync();
    setIsClicked(true);
  };

  return (
    <Box position="relative" display="inline-flex">
      {isPending && (
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
      <Button
        // variant="outlined"
        size="large"
        sx={{
          color: "#E7ECEE",
          width: "345px",
          height: "75px",
          backgroundColor: "#4A63AA",
          border: "1px solid #0F111A",
          borderRadius: "8px",
          marginTop: "32px",
          fontWeight: "700",
          "&:hover": {
            background: "#212530", // Slightly lighter than #1B1E2A for a subtle hover effect
          },
        }}
        onClick={() => handleOnClick()}
        disabled={isPending}
      >
        Mint Planet
      </Button>
      {isClicked ? (
        <TransactionStatus name="Mint Planet " tx={data?.transaction_hash} />
      ) : (
        <></>
      )}
    </Box>
  );
};
