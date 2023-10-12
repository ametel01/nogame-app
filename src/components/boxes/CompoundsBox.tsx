import React from "react";
import useUpgrade, { ComponentUpgradeType } from "../../hooks/useUpgrade";
import { numberWithCommas } from "../../shared/utils";
import { ButtonUpgrade } from "../ui/Button";
import ImagePopover from "../modals";
import * as Styled from "../../shared/styled/Box";
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
  functionCallName: ComponentUpgradeType; // Assuming this is a string, you might need to adjust if it's another type
  description: React.ReactNode;
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
}) => {
  const { write: upgrade } = useUpgrade(functionCallName);

  const steel = costUpdate && numberWithCommas(costUpdate.steel);
  const quartz = costUpdate && numberWithCommas(costUpdate.quartz);
  const tritium = costUpdate && numberWithCommas(costUpdate.tritium);
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

  return (
    <Styled.Box color={buttonStates[currentButtonState].color ?? "grey"}>
      <Styled.ImageContainer>
        <ImagePopover image={img} title={title} description={description} />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>{title}</Styled.Title>
        <Styled.InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>LEVEL</Styled.ResourceTitle>
            <Styled.NumberContainer>{level}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL</Styled.ResourceTitle>
            <Styled.NumberContainer>{steel}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ</Styled.ResourceTitle>
            <Styled.NumberContainer>{quartz}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM</Styled.ResourceTitle>
            <Styled.NumberContainer>{tritium}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>ENERGY</Styled.ResourceTitle>
            <Styled.NumberContainer>- {energy}</Styled.NumberContainer>
          </Styled.ResourceContainer>
        </Styled.InfoContainer>
        <Styled.ButtonContainer>
          <ButtonUpgrade
            callback={upgrade}
            disabled={isDisabled}
            noRequirements={false}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default CompoundsBox;
