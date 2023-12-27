import { useState } from "react";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import { Input } from "@mui/joy";
import * as Styled from "../../shared/styled/Box";
import { ButtonUpgrade } from "../ui/Button";
import { numberWithCommas } from "../../shared/utils";
import { ReactNode, useMemo } from "react";
import useUpgrade from "../../hooks/writeHooks/useUpgrade";
import ImagePopover from "../modals/Description";
import { TechLevels } from "../../shared/types";
import { Resources } from "../../shared/types";
import { getCumulativeTechCost } from "../../shared/utils/Formulas";
import { baseTechCost, techCostMapping } from "../../constants/costs";
import { calculEnoughResources } from "../../shared/utils";
const InfoContainer = styled(Styled.InfoContainer)({
  width: "45%",
});

interface Props {
  img: string;
  title: string;
  functionCallName: string;
  level?: number;
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
  requirementsMet,
  description,
  resourcesAvailable,
}: Props) => {
  const [quantity, setQuantity] = useState(1);

  const { tx, submitTx: upgrade } = useUpgrade(functionCallName, quantity);

  const baseCostKey = techCostMapping[functionCallName] || functionCallName;
  const baseCosts = baseTechCost[baseCostKey];
  // Calculate the cumulative cost of the upgrade
  const upgradeCost = useMemo(() => {
    if (quantity > 0 && level != undefined) {
      const cost = getCumulativeTechCost(
        level,
        quantity,
        baseCosts.steel,
        baseCosts.quartz,
        baseCosts.tritium
      );
      return cost;
    }
    return { steel: 0, quartz: 0, tritium: 0 };
  }, [level, quantity, baseCosts]);

  const hasEnoughResources = calculEnoughResources(
    upgradeCost,
    resourcesAvailable
  );

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

  const shouldShowTooltip = [
    "Ion Systems",
    "Plasma Engineering",
    "Spacetime Technology",
    "Warp Drive",
  ].includes(title);

  const boxContent = (
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
                  ? resourcesAvailable.steel < upgradeCost.steel
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {numberWithCommas(upgradeCost.steel)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>QUARTZ</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.quartz < upgradeCost.quartz
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {numberWithCommas(upgradeCost.quartz)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
          <Styled.ResourceContainer>
            <Styled.ResourceTitle>TRITIUM</Styled.ResourceTitle>
            <Styled.NumberContainer
              style={{
                color: resourcesAvailable
                  ? resourcesAvailable.tritium < upgradeCost.tritium
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
            >
              {numberWithCommas(upgradeCost.tritium)}
            </Styled.NumberContainer>
          </Styled.ResourceContainer>
        </InfoContainer>
        <Styled.ResourceContainer>
          <Tooltip title="Select the number of levels to upgrade" arrow>
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
            noRequirements={hasRequirements}
          />
        </Styled.ButtonContainer>
      </Styled.SubBox>
    </Styled.Box>
  );

  return shouldShowTooltip ? (
    <Tooltip title="Non available on testnet release" placement="top" arrow>
      {boxContent}
    </Tooltip>
  ) : (
    boxContent
  );
};

export default ResearchBox;
