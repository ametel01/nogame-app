import * as Styled from "../../shared/styled/Box";
import { ButtonUpgrade } from "../ui/Button";
import { numberWithCommas } from "../../shared/utils";
import { ReactNode, useMemo } from "react";
import useUpgrade, { ComponentUpgradeType } from "../../hooks/useUpgrade";
import ImagePopover from "../modals";
import { TechLevels } from "../../shared/types";

interface Props {
  img: string;
  title: string;
  functionCallName: string;
  level?: number;
  costUpdate?: { steel: number; quartz: number; tritium: number };
  hasEnoughResources?: boolean;
  requirementsMet?: boolean;
  description: ReactNode;
  techs: TechLevels;
}

type ButtonState = "valid" | "noResource" | "noRequirements";

const ResearchBox = ({
  img,
  title,
  functionCallName,
  level,
  costUpdate,
  hasEnoughResources,
  requirementsMet,
  description,
}: Props) => {
  const { write: upgrade } = useUpgrade(
    functionCallName as ComponentUpgradeType
  );

  const steel = costUpdate ? numberWithCommas(costUpdate.steel) : null;
  const quartz = costUpdate ? numberWithCommas(costUpdate.quartz) : null;
  const tritium = costUpdate ? numberWithCommas(costUpdate.tritium) : null;

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

  return (
    <Styled.Box>
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
        </Styled.InfoContainer>
        <Styled.ButtonContainer>
          <ButtonUpgrade
            callback={upgrade}
            disabled={isDisabled}
            noRequirements={hasRequirements}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default ResearchBox;
