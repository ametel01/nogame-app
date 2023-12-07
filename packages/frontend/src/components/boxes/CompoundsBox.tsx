import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Input } from "@mui/joy";
import useUpgrade from "../../hooks/writeHooks/useUpgrade";
import { numberWithCommas } from "../../shared/utils";
import { ButtonUpgrade } from "../ui/Button";
import DescriptionModal from "../modals/Description";
import * as Styled from "../../shared/styled/Box";
import { Resources } from "../../shared/types";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "45%",
});
interface CompoundsBoxProps {
  img: string;
  title: string;
  level?: number;
  hasEnoughResources?: boolean;
  costUpdate?: {
    steel: number;
    quartz: number;
    tritium: number;
  };
  energyRequired: number;
  functionCallName: string; // Assuming this is a string, you might need to adjust if it's another type
  description: React.ReactNode;
  resourcesAvailable?: Resources;
}

const CompoundsBox: React.FC<CompoundsBoxProps> = ({
  img,
  title,
  level,
  hasEnoughResources,
  costUpdate,
  energyRequired,
  functionCallName,
  description,
  resourcesAvailable,
}) => {
  const [quantity, setQuantity] = useState(0);

  const { tx, submitTx: upgrade } = useUpgrade(functionCallName, quantity);

  const energy = numberWithCommas(energyRequired);

  const buttonStates = {
    valid: {
      title: "Upgrade",
      callback: upgrade,
      color: "#45A85A",
    },
    noResource: {
      title: "Need Resources",
      color: "#FFC107",
    },
  };

  const currentButtonState = hasEnoughResources ? "valid" : "noResource";
  const isDisabled = currentButtonState === "noResource";

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

  const steelDisplay = adjustedSteel ? numberWithCommas(adjustedSteel) : 0;
  const quartzDisplay = adjustedQuartz ? numberWithCommas(adjustedQuartz) : 0;
  const tritiumDisplay = adjustedTritium
    ? numberWithCommas(adjustedTritium)
    : 0;


  return (
    <Styled.Box color={buttonStates[currentButtonState].color ?? "grey"}>
      <Styled.ImageContainer>
        <DescriptionModal image={img} title={title} description={description} />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>{title}</Styled.Title>
        <InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STAGE</Styled.ResourceTitle>
            <Styled.NumberContainer>{String(level)}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.steel < adjustedSteel
                    ? "red"
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
                  ? resourcesAvailable.steel < adjustedSteel
                    ? "red"
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
                  ? resourcesAvailable.steel < adjustedSteel
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {tritiumDisplay}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>ENERGY</Styled.ResourceTitle>
            <Styled.NumberContainer>
              {Number(energy) > 0 ? `+${energy}` : String(energy)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
        </InfoContainer>
        <Styled.ResourceContainer>
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
        </Styled.ResourceContainer>
        <Styled.ButtonContainer>
          <ButtonUpgrade
            name={`Upgrading ${title}`}
            callback={upgrade}
            tx={tx}
            disabled={isDisabled}
            noRequirements={false}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default CompoundsBox;
