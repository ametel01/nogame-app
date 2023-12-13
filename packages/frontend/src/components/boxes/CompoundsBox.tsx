import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "@mui/joy";
import Tooltip from "@mui/material/Tooltip";
import useUpgrade from "../../hooks/writeHooks/useUpgrade";
import { numberWithCommas } from "../../shared/utils";
import { ButtonUpgrade } from "../ui/Button";
import DescriptionModal from "../modals/Description";
import * as Styled from "../../shared/styled/Box";
import { Resources } from "../../shared/types";
import {
  getCompoundCost,
  getCumulativeEnergyChange,
} from "../../shared/utils/Formulas";
import { calculEnoughResources } from "../../shared/utils";

const InfoContainer = styled(Styled.InfoContainer)({
  width: "45%",
});
interface CompoundsBoxProps {
  img: string;
  title: string;
  level: number;
  functionCallName: string; // Assuming this is a string, you might need to adjust if it's another type
  description: React.ReactNode;
  resourcesAvailable?: Resources;
}

const CompoundsBox: React.FC<CompoundsBoxProps> = ({
  img,
  title,
  level,
  functionCallName,
  description,
  resourcesAvailable,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [costUpdate, setCostUpdate] = useState({
    steel: 0,
    quartz: 0,
    tritium: 0,
  });
  const [energyRequired, setEnergyRequired] = useState(0);

  const { tx, submitTx: upgrade } = useUpgrade(functionCallName, quantity);

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

  useEffect(() => {
    const newCost = getCompoundCost(functionCallName, level + 1, quantity);
    setCostUpdate(newCost);
  }, [quantity, level, functionCallName]);

  useEffect(() => {
    const newConsumption = getCumulativeEnergyChange(
      functionCallName,
      level + 1,
      quantity
    );
    setEnergyRequired(newConsumption);
  }, [quantity, level, functionCallName]);

  const hasEnoughResources = calculEnoughResources(
    costUpdate,
    resourcesAvailable
  );

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
            <Styled.NumberContainer>{String(level)}</Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>STEEL</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.steel < costUpdate.steel
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {numberWithCommas(costUpdate.steel)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.quartz < costUpdate.quartz
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {numberWithCommas(costUpdate.quartz)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.tritium < costUpdate.tritium
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {numberWithCommas(costUpdate.tritium)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>ENERGY</Styled.ResourceTitle>
            <Styled.NumberContainer>
              {Number(energy) > 0 ? `+${energy}` : String(energy)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
        </InfoContainer>
        <Styled.ResourceContainer>
          <Tooltip title="Select the number of levels to upgrade">
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
          </Tooltip>
        </Styled.ResourceContainer>
        <Styled.ButtonContainer>
          <ButtonUpgrade
            name={`Upgrading ${title}`}
            callback={upgrade}
            tx={tx}
            disabled={isDisabled}
            noRequirements={false}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );
};

export default CompoundsBox;
