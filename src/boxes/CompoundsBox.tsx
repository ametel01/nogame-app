import React from "react";
import styled from "styled-components";
import { LayerGroup } from "../components/icons/LayerGroup";
import { Coins } from "../components/icons/Coins";
import useUpgrade, { ComponentUpgradeType } from "../hooks/UseUpgrade";
import { numberWithCommas } from "../shared/utils";
import { ButtonUpgrade } from "../components/Button";
import ImagePopover from "../components/Modals";
import * as Styled from "../shared/styled/Box";

const Box = styled.div`
  width: 100%;
  max-height: 70px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border: 2px solid ${(props) => props.color};
  background-color: #151a1e;
  border-radius: 4px;
  overflow: hidden;
`;

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
    <Box color={buttonStates[currentButtonState].color ?? "grey"}>
      <Styled.ImageContainer>
        <ImagePopover image={img} title={title} description={description} />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>{title}</Styled.Title>
        <Styled.InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>LEVEL</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <LayerGroup />
              {level}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL COST</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {steel}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ COST</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {quartz}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM COST</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {tritium}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>ENERGY REQUIRED</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {energy}
            </Styled.NumberContainer>
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
    </Box>
  );
};

export default CompoundsBox;
