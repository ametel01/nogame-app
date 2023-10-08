import React, { useMemo, useState } from "react";
import ImagePopover from "../modals";
import { ButtonBuild } from "../ui/Button";
import { LayerGroup } from "../icons/LayerGroup";
import { Coins } from "../icons/Coins";
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

  const buttonState = useMemo(() => {
    if (!requirementsMet) return "noRequirements";
    if (!hasEnoughResources) return "noResource";
    return "valid";
  }, [hasEnoughResources, requirementsMet]);

  const statesButton: ButtonArrayStates[] = (
    ["valid", "noResource", "noRequirements"] as ButtonState[]
  ).map((state) => ({
    state,
    title:
      state === "valid"
        ? "Upgrade"
        : state === "noResource"
        ? "Need Resources"
        : "No Requirements",
    callback: state === "valid" ? build : undefined,
    color:
      state === "valid"
        ? "#295c28"
        : state === "noResource"
        ? "#402F2C"
        : "#524c4c",
    icon: (
      <img src={plus} alt="plus" style={{ maxWidth: "100%", height: "auto" }} />
    ),
  }));

  const actualButtonState = statesButton.find(
    (state) => state.state === buttonState
  );

  return (
    <Styled.Box customcolor={actualButtonState?.color ?? "grey"}>
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
            <Styled.ResourceTitle>UNITS AVAILABLE</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <LayerGroup />
              {level}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL COST</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {costUpdate?.steel ? numberWithCommas(costUpdate.steel) : "0"}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ COST</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {costUpdate?.quartz ? numberWithCommas(costUpdate.quartz) : "0"}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM COST</Styled.ResourceTitle>
            <Styled.NumberContainer>
              <Coins />
              {costUpdate?.tritium ? numberWithCommas(costUpdate.tritium) : "0"}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.CustomInput
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            size="sm"
            variant="soft"
          />
        </Styled.InfoContainer>
        <Styled.ButtonContainer>
          <ButtonBuild
            callback={build}
            disabled={actualButtonState?.state === "noResource"}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default DefencesBox;
