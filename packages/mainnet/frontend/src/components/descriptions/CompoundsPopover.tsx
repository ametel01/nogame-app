import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "@mui/joy";
import CompoundsFormulas from "../../shared/utils/Formulas";
import Box from "@mui/material/Box";
// import steelImg from "../../assets/gameElements/steel-mine-1-v2.png";
import steelImg from "../../assets/gameElements/compounds/steel4.png";
import quartzImg from "../../assets/gameElements/compounds/quartz4.png";
import tritiumImg from "../../assets/gameElements/compounds/tritium4.png";
import energyImg from "../../assets/gameElements/compounds/energy4.png";
import labImg from "../../assets/gameElements/compounds/lab4.png";
import dockyardImg from "../../assets/gameElements/compounds/dockyard4.png";

export const StyledBox = styled(Box)({
  fontWeight: 400,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1a2025",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "32px 32px",
  display: "flex",
  flexDirection: "column",
  width: "25%",
  textTransform: "capitalize",
});

const HeaderDiv = styled("div")({
  fontSize: 20,
  marginBottom: "16px",
  textTransform: "uppercase",
});

const InfoRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

const InfoData = styled("span")({
  color: "#98fb98",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  marginBottom: "32px",
  borderRadius: "8px",
});

const Label = styled("span")({});

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
  image: string; // Add an image prop
  costFunc: (arg0: number) => Cost;
  productionFunc?: (arg0: number) => number;
  consumptionFunc?: (arg0: number) => number;
}

function CompoundDescription({
  title,
  image,
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
        <HeaderDiv>{title}</HeaderDiv>
        <StyledImage src={image} alt={`${title} Image`} />
        <InfoRow>
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
        </InfoRow>
        <InfoRow>
          <Label>Cost Steel:</Label>
          <InfoData>{cost!.steel}</InfoData>
        </InfoRow>
        <InfoRow>
          <Label>Cost Quartz:</Label>
          <InfoData>{cost!.quartz}</InfoData>
        </InfoRow>
        {cost!.tritium != 0 ? (
          <InfoRow>
            <Label>Cost Tritium:</Label>
            <InfoData>{cost!.tritium}</InfoData>
          </InfoRow>
        ) : null}
        {productionFunc && (
          <InfoRow>
            <Label>Hourly Production:</Label>
            <InfoData>{production}</InfoData>
          </InfoRow>
        )}
        {consumptionFunc && (
          <InfoRow>
            <Label>Energy Consumption:</Label>
            <InfoData>{consumption}</InfoData>
          </InfoRow>
        )}
      </StyledBox>
    </div>
  );
}

export function SteelMineDescription() {
  return (
    <CompoundDescription
      title="Steel Mine"
      image={steelImg}
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
      image={quartzImg}
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
      image={tritiumImg}
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
      image={energyImg}
      productionFunc={CompoundsFormulas.energyProduction}
      costFunc={CompoundsFormulas.energyCost}
    />
  );
}

export function LabDescription() {
  return (
    <CompoundDescription
      title="Research Lab"
      image={labImg}
      costFunc={CompoundsFormulas.labCost}
    />
  );
}
export function DockyardDescription() {
  return (
    <CompoundDescription
      title="Dockyard"
      image={dockyardImg}
      costFunc={CompoundsFormulas.dockyardCost}
    />
  );
}
