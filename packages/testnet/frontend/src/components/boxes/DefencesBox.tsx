import React, { useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { Input } from "@mui/joy";
import DescriptionModal from "../modals/Description";
import { ButtonBuild } from "../ui/Button";
import useBuild from "../../hooks/writeHooks/useBuild";
import { numberWithCommas } from "../../shared/utils";
import * as Styled from "../../shared/styled/Box";
import { Resources } from "../../shared/types";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "45%",
});

type Props = {
  img: string;
  title: string;
  functionCallName: string;
  level?: number;
  costUpdate?: { steel: number; quartz: number; tritium: number };
  hasEnoughResources?: boolean;
  requirementsMet?: boolean;
  description: React.ReactNode;
  resourcesAvailable: Resources;
};

type ButtonState = "valid" | "noResource" | "noRequirements";

const DefencesBox = ({
  img,
  title,
  level,
  hasEnoughResources,
  costUpdate,
  functionCallName,
  requirementsMet,
  description,
  resourcesAvailable,
}: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);

  const { tx, submitTx: build } = useBuild(functionCallName, quantity);

  const buttonState = useMemo((): ButtonState => {
    if (!requirementsMet) {
      return "noRequirements";
    } else if (!hasEnoughResources) {
      return "noResource";
    }

    return "valid";
  }, [hasEnoughResources, requirementsMet]);

  const hasRequirements = buttonState === "noRequirements";

  const isDisabled = buttonState === "noResource";

  // Calculate the cost based on the quantity
  const adjustedSteel = costUpdate
    ? quantity === 0
      ? Number(costUpdate.steel)
      : Number(costUpdate.steel) * quantity
    : 0;
  const adjustedQuartz = costUpdate
    ? quantity === 0
      ? Number(costUpdate.quartz)
      : Number(costUpdate.quartz) * quantity
    : 0;
  const adjustedTritium = costUpdate
    ? quantity === 0
      ? Number(costUpdate.tritium)
      : Number(costUpdate.tritium) * quantity
    : 0;

  // Format the calculated costs to display with commas
  const steelDisplay = adjustedSteel ? numberWithCommas(adjustedSteel) : 0;
  const quartzDisplay = adjustedQuartz ? numberWithCommas(adjustedQuartz) : 0;
  const tritiumDisplay = adjustedTritium
    ? numberWithCommas(adjustedTritium)
    : 0;

  const shouldShowTooltip =
    ["Astral Launcher", "Plasma Projector"].includes(title) && showTooltip;

  const boxContent = (
    <Styled.Box>
      <Styled.ImageContainer>
        <DescriptionModal
          onClick={() => setShowTooltip(false)}
          image={img}
          title={title}
          description={description}
        />
        <img
          src={img}
          alt={title}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>{title}</Styled.Title>
        <InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>READY</Styled.ResourceTitle>
            <Styled.NumberContainer>{String(level)}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.steel < adjustedSteel
                    ? "#AB3836"
                    : "inherit"
                  : "inherit",
              }}
            >
              {steelDisplay}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.quartz < adjustedQuartz
                    ? "#AB3836"
                    : "inherit"
                  : "inherit",
              }}
            >
              {quartzDisplay}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.tritium < adjustedTritium
                    ? "#AB3836"
                    : "inherit"
                  : "inherit",
              }}
            >
              {tritiumDisplay}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
        </InfoContainer>
        <Styled.ResourceContainer>
          <Tooltip title="Select the number of units to build" arrow>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                if (e.target.value === "") {
                  setQuantity(0);
                } else {
                  setQuantity(parseInt(e.target.value, 10));
                }
              }}
              size="sm"
              color="neutral"
              variant="soft"
              style={{ width: "80px" }}
            />
          </Tooltip>
        </Styled.ResourceContainer>
        <Styled.ButtonContainer>
          <ButtonBuild
            name={`Building ${quantity} ${title}`}
            callback={build}
            tx={tx?.transaction_hash}
            disabled={isDisabled}
            noRequirements={hasRequirements}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );

  return shouldShowTooltip ? (
    <Tooltip title="Non available on testnet release" placement="top" arrow>
      {boxContent}
    </Tooltip>
  ) : (
    boxContent
  );
};

export default DefencesBox;
