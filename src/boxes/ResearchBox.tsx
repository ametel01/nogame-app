import * as Styled from "../shared/styled/Box";
import { LayerGroup } from "../components/icons/LayerGroup";
import { Coins } from "../components/icons/Coins";
import { ButtonUpgrade } from "../components/Button";
import { numberWithCommas } from "../shared/utils";
import plus from "../assets/icons/Plus.svg";
import React, { ReactNode, useMemo } from "react";
import useUpgrade, { ComponentUpgradeType } from "../hooks/UseUpgrade";
import ImagePopover from "../components/Modals";

interface Props {
  img: string;
  title: string;
  functionCallName: string;
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

  const statesButton: ButtonArrayStates[] = [
    {
      state: "valid",
      title: "Upgrade",
      callback: upgrade,
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

  return (
    <Styled.Box customcolor={actualButtonState?.color ?? "grey"}>
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