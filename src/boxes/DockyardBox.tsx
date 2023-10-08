import { ReactNode } from "react";
import * as Styled from "../shared/styled/Box";
import { LayerGroup } from "../components/icons/LayerGroup";
import { Coins } from "../components/icons/Coins";
import { ButtonBuild } from "../components/Button";
import { numberWithCommas } from "../shared/utils";
import plus from "../assets/icons/Plus.svg";
import React, { useMemo, useState } from "react";
import useBuild, { ComponentBuildType } from "../hooks/UseBuild";
import { Input } from "@mui/joy";
import ImagePopover from "../components/Modals";

interface Props {
  img: string;
  title: string;
  functionCallName: ComponentBuildType;
  level?: number;
  costUpdate?: { steel: number; quartz: number; tritium: number };
  hasEnoughResources?: boolean;
  requirementsMet?: boolean;
  description: ReactNode;
}

type ButtonState = "valid" | "noResource" | "noRequirements";

interface ButtonArrayStates {
  state: ButtonState;
  title: string;
  callback?: () => void;
  color?: string;
  icon: React.ReactNode;
}

const DockyardBox = ({
  img,
  title,
  level,
  hasEnoughResources,
  costUpdate,
  functionCallName,
  requirementsMet,
  description,
}: Props) => {
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

  const steel = costUpdate ? numberWithCommas(costUpdate.steel) : null;
  const quartz = costUpdate ? numberWithCommas(costUpdate.quartz) : null;
  const tritium = costUpdate ? numberWithCommas(costUpdate.tritium) : null;

  return (
    <Styled.Box customcolor={actualButtonState?.color ?? "grey"}>
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
          <Input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            size="sm"
            color="neutral"
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

export default DockyardBox;
