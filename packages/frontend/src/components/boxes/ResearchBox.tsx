import { useState } from "react";
import styled from "styled-components";
import { Input } from "@mui/joy";
import * as Styled from "../../shared/styled/Box";
import { ButtonUpgrade } from "../ui/Button";
import { numberWithCommas } from "../../shared/utils";
import { ReactNode, useMemo } from "react";
import useUpgrade from "../../hooks/writeHooks/useUpgrade";
import ImagePopover from "../modals/Description";
import { TechLevels } from "../../shared/types";
import { Resources } from "../../shared/types";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "45%",
});

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
  resourcesAvailable: Resources;
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
  resourcesAvailable,
}: Props) => {
  const [quantity, setQuantity] = useState(0);

  const { tx, submitTx: upgrade } = useUpgrade(functionCallName, quantity);

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
            noRequirements={hasRequirements}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default ResearchBox;
