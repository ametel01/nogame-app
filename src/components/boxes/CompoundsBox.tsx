import React from "react";
import styled from "@emotion/styled";
import useUpgrade from "../../hooks/useUpgrade";
import { numberWithCommas } from "../../shared/utils";
import { ButtonUpgrade } from "../ui/Button";
import DescriptionModal from "../modals/Description";
import * as Styled from "../../shared/styled/Box";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "55%",
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
  const { hashes, submitTx: upgrade } = useUpgrade(functionCallName);

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
        <DescriptionModal image={img} title={title} description={description} />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>{title}</Styled.Title>
        <InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STAGE</Styled.ResourceTitle>
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
        </InfoContainer>
        <Styled.ButtonContainer>
          <ButtonUpgrade
            name={`Upgrading ${title}`}
            callback={upgrade}
            hashes={hashes}
            disabled={isDisabled}
            noRequirements={false}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default CompoundsBox;
