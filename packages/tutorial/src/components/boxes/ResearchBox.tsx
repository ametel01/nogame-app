import styled from "styled-components";
import * as Styled from "../../../../frontend/src/shared/styled/Box";
import { ButtonUpgrade } from "../../../../frontend/src/components/ui/Button";
import { numberWithCommas } from "../../../../frontend/src/shared/utils";
import { ReactNode, useMemo } from "react";
import ImagePopover from "../../../../frontend/src/components/modals/Description";
import { TechLevels } from "../../../../frontend/src/shared/types";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "55%",
});

interface Props {
  img: string;
  title: string;
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
  level,
  costUpdate,
  hasEnoughResources,
  requirementsMet,
  description,
}: Props) => {
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
        <InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STAGE</Styled.ResourceTitle>
            <Styled.NumberContainer>{String(level)}</Styled.NumberContainer>
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
        </InfoContainer>
        <Styled.ButtonContainer>
          <ButtonUpgrade
            name={`Upgrading ${title}`}
            disabled={isDisabled}
            noRequirements={hasRequirements}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default ResearchBox;
