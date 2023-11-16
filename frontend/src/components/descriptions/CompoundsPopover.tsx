import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "@mui/joy";
import CompoundsFormulas from "../../shared/utils/Formulas";
import Box from "@mui/material/Box";

export const StyledBox = styled(Box)({
  fontWeight: 400,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1a2025",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "16px 32px",
  display: "flex",
  flexDirection: "column",
  width: "25%",
});

const HeaderDiv = styled("div")({
  fontSize: 20,
  marginBottom: "16px",
  borderBottom: "1px solid",
});

const TravelInfoRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

const TravelInfoData = styled("span")({
  color: "#98fb98",
});

const Label = styled("span")({
  // Styling for the label
});

type Cost = {
  steel: number;
  quartz: number;
  tritium: number;
};

function useMineInformation(
  level: number,
  costFunc: (arg0: number) => Cost,
  productionFunc?: (arg0: number) => number,
  consumptionFunc?: (arg0: number) => number
) {
  const production = productionFunc ? productionFunc(level) : undefined;
  const cost = costFunc(level);
  const consumption = consumptionFunc ? consumptionFunc(level) : undefined;

  return { production, cost, consumption };
}

interface DescriptionProps {
  title: string;
  costFunc: (arg0: number) => Cost;
  productionFunc?: (arg0: number) => number;
  consumptionFunc?: (arg0: number) => number;
}

function CompoundDescription({
  title,
  productionFunc,
  costFunc,
  consumptionFunc,
}: DescriptionProps) {
  const [level, setLevel] = useState(1);
  const { production, cost, consumption } = useMineInformation(
    level,
    costFunc,
    productionFunc,
    consumptionFunc
  );

  return (
    <div>
      <StyledBox>
        <HeaderDiv>{title} Stats</HeaderDiv>
        <TravelInfoRow>
          <Label>Level:</Label>
          <Input
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            // size="small"
            color="neutral"
            variant="soft"
            style={{ width: "80px" }}
          />
        </TravelInfoRow>
        <TravelInfoRow>
          <Label>Cost Steel:</Label>
          <TravelInfoData>{cost!.steel}</TravelInfoData>
        </TravelInfoRow>
        <TravelInfoRow>
          <Label>Cost Quartz:</Label>
          <TravelInfoData>{cost!.quartz}</TravelInfoData>
        </TravelInfoRow>
        {cost!.tritium != 0 ? (
          <TravelInfoRow>
            <Label>Cost Tritium:</Label>
            <TravelInfoData>{cost!.tritium}</TravelInfoData>
          </TravelInfoRow>
        ) : null}
        {productionFunc && (
          <TravelInfoRow>
            <Label>Hourly Production:</Label>
            <TravelInfoData>{production}</TravelInfoData>
          </TravelInfoRow>
        )}
        {consumptionFunc && (
          <TravelInfoRow>
            <Label>Energy Consumption:</Label>
            <TravelInfoData>{consumption}</TravelInfoData>
          </TravelInfoRow>
        )}
      </StyledBox>
    </div>
  );
}

export function SteelMineDescription() {
  return (
    <CompoundDescription
      title="Steel Mine"
      productionFunc={CompoundsFormulas.steelProduction}
      costFunc={CompoundsFormulas.steelCost}
      consumptionFunc={CompoundsFormulas.steelConsumption}
    />
  );
}

export function QuartzMineDescription() {
  return (
    <CompoundDescription
      title="Quartz Mine"
      productionFunc={CompoundsFormulas.quartzProduction}
      costFunc={CompoundsFormulas.quartzCost}
      consumptionFunc={CompoundsFormulas.quartzConsumption}
    />
  );
}

export function TritiumMineDescription() {
  return (
    <CompoundDescription
      title="Tritium Mine"
      productionFunc={CompoundsFormulas.tritiumProduction}
      costFunc={CompoundsFormulas.tritiumCost}
      consumptionFunc={CompoundsFormulas.tritiumConsumption}
    />
  );
}

export function EnergyPlantDescription() {
  return (
    <CompoundDescription
      title="Energy Plant"
      productionFunc={CompoundsFormulas.energyProduction}
      costFunc={CompoundsFormulas.energyCost}
    />
  );
}

export function LabDescription() {
  return (
    <CompoundDescription
      title="Research Lab"
      costFunc={CompoundsFormulas.labCost}
    />
  );
}
export function DockyardDescription() {
  return (
    <CompoundDescription
      title="Dockyard"
      costFunc={CompoundsFormulas.dockyardCost}
    />
  );
}
