import { ReactNode } from "react";
import * as Styled from "../../shared/styled/Box";
import { ButtonBuild } from "../ui/Button";
import { numberWithCommas } from "../../shared/utils";
import { useMemo, useState } from "react";
import useBuild from "../../hooks/useBuild";
import { Input } from "@mui/joy";
import ImagePopover from "../modals";
import { Resources } from "../../shared/types";

interface Props {
  img: string;
  title: string;
  functionCallName: string;
  level?: number;
  costUpdate?: { steel: number; quartz: number; tritium: number };
  hasEnoughResources?: boolean;
  requirementsMet?: boolean;
  description: ReactNode;
  resourcesAvailable: Resources;
}

type ButtonState = "valid" | "noResource" | "noRequirements";

const DockyardBox = ({
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
  const { write: build } = useBuild(functionCallName, quantity);

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

  return (
    <Styled.Box>
      <Styled.ImageContainer>
        <ImagePopover image={img} title={title} description={description} />
        <img
          src={img}
          alt={title}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Styled.ImageContainer>
      <Styled.SubBox>
        <Styled.Title>{title}</Styled.Title>
        <Styled.InfoContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>AVAILABLE</Styled.ResourceTitle>
            <Styled.NumberContainer>{level}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color:
                  resourcesAvailable.steel < adjustedSteel ? "red" : "inherit",
              }}
            >
              {steelDisplay}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color:
                  resourcesAvailable.quartz < adjustedQuartz
                    ? "red"
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
                color:
                  resourcesAvailable.tritium < adjustedTritium
                    ? "red"
                    : "inherit",
              }}
            >
              {tritiumDisplay}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Input
            type="text"
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
        </Styled.InfoContainer>
        <Styled.ButtonContainer>
          <ButtonBuild
            callback={build}
            disabled={isDisabled}
            noRequirements={hasRequirements}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default DockyardBox;
