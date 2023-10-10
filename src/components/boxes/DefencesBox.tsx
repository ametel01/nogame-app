import React, { useMemo, useState } from "react";
import { Input } from "@mui/joy";
import ImagePopover from "../modals";
import { ButtonBuild } from "../ui/Button";
import useBuild, { ComponentBuildType } from "../../hooks/useBuild";
import { numberWithCommas } from "../../shared/utils";
import plus from "../../assets/uiIcons/Plus.svg";
import * as Styled from "../../shared/styled/Box";

type DefencesBoxProps = {
  img: string;
  title: string;
  functionCallName: ComponentBuildType; // Adjust the type here if necessary
  level?: number;
  costUpdate?: { steel: number; quartz: number; tritium: number };
  hasEnoughResources?: boolean;
  requirementsMet?: boolean;
  description: React.ReactNode;
};

type ButtonState = "valid" | "noResource" | "noRequirements";

type ButtonArrayStates = {
  state: ButtonState;
  title: string;
  callback?: () => void;
  color?: string;
  icon: React.ReactNode;
};

const DefencesBox: React.FC<DefencesBoxProps> = ({
  img,
  title,
  level,
  hasEnoughResources,
  costUpdate,
  functionCallName,
  requirementsMet,
  description,
}) => {
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

  const statesButton: ButtonArrayStates[] = [
    {
      state: "valid",
      title: "Upgrade",
      callback: build,
      color: "#295c28",
      icon: (
        <img
          src={plus}
          alt="plus"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      ),
    },
    {
      state: "noResource",
      title: "Need Resources",
      color: "#b79c15",
      icon: (
        <img
          src={plus}
          alt="plus"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      ),
    },
    {
      state: "noRequirements",
      title: "No Requirements",
      color: "#524c4c",
      icon: (
        <img
          src={plus}
          alt="plus"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      ),
    },
  ];

  const actualButtonState = statesButton.find(
    (state) => state.state === buttonState
  );

  const hasRequirements = actualButtonState?.state === "noRequirements";

  const isDisabled = actualButtonState?.state === "noResource";

  // Calculate the cost based on the quantity
  const adjustedSteel = costUpdate
    ? quantity === 0
      ? Number(costUpdate.steel)
      : Number(costUpdate.steel) * quantity
    : null;
  const adjustedQuartz = costUpdate
    ? quantity === 0
      ? Number(costUpdate.quartz)
      : Number(costUpdate.quartz) * quantity
    : null;
  const adjustedTritium = costUpdate
    ? quantity === 0
      ? Number(costUpdate.tritium)
      : Number(costUpdate.tritium) * quantity
    : null;

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
          style={{ maxWidth: "100%", height: "auto" }}
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
            <Styled.NumberContainer>{steelDisplay}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ</Styled.ResourceTitle>
            <Styled.NumberContainer>{quartzDisplay}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM</Styled.ResourceTitle>
            <Styled.NumberContainer>{tritiumDisplay}</Styled.NumberContainer>
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

export default DefencesBox;
