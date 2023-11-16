import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DefencesStats, ShipsStats } from "../../constants/Stats";

// Styled components

export const StyledBox = styled(Box)({
  fontWeight: 400,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1a2025",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "16px 16px",
  display: "flex",
  flexDirection: "column",
  width: "35%",
});

const HeaderDiv = styled("div")`
  font-size: 20px;
`;

const Container = styled("div")`
  padding: 20px;
  // border-radius: 8px;
`;

const TextBox = styled("div")`
  font-size: 16px;
  line-height: 1.5;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Two columns
  grid-auto-rows: minmax(32px, auto); // Row height
  gap: 4px; // Reduced space between grid items
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InfoData = styled("span")({
  color: "#98fb98",
});

const Label = styled("span")({});

const Requirements = styled("ul")({
  color: "#98fb98",
});

// Component props
interface DescriptionComponentProps {
  title: string;
  description: React.ReactNode;
  requirements: React.ReactNode;
}

const DescriptionComponent = ({
  title,
  description,
  requirements,
}: DescriptionComponentProps) => {
  return (
    <StyledBox>
      <HeaderDiv>{title}</HeaderDiv>
      <Container>
        <TextBox>
          {description}
          <div style={{ marginTop: "8px" }}>Requirements:</div>
          <Requirements>{requirements}</Requirements>
        </TextBox>
      </Container>
    </StyledBox>
  );
};

interface StatsProps {
  cargo?: number;
  speed?: number;
  consumption?: number;
  hull: number;
  shield: number;
  weapon: number;
}

const StatsComponent = ({
  cargo,
  speed,
  consumption,
  hull,
  shield,
  weapon,
}: StatsProps) => {
  return (
    <GridContainer>
      {cargo ? (
        <>
          <InfoRow>
            <Label>Cargo Capacity:</Label>
            <InfoData>{cargo}</InfoData>
          </InfoRow>
        </>
      ) : null}
      {speed ? (
        <>
          <InfoRow>
            <Label>Base Speed: </Label>
            <InfoData>{speed}</InfoData>
          </InfoRow>
        </>
      ) : null}
      {consumption ? (
        <>
          <InfoRow>
            <Label>Consumption: </Label>
            <InfoData>{consumption}</InfoData>
          </InfoRow>
        </>
      ) : null}
      <InfoRow>
        <Label>Base Hull: </Label>
        <InfoData>{hull}</InfoData>
      </InfoRow>
      <InfoRow>
        <Label>Base Shield: </Label>
        <InfoData>{shield}</InfoData>
      </InfoRow>
      <InfoRow>
        <Label>Base Weapon: </Label>
        <InfoData>{weapon}</InfoData>
      </InfoRow>
    </GridContainer>
  );
};

export const CarrierDescription = () => (
  <DescriptionComponent
    title="Carrier"
    description={StatsComponent(ShipsStats.carrier)}
    requirements={
      <>
        <li>Dockyard level 2</li>
        <li>Combustion Drive level 2</li>
      </>
    }
  />
);
export const CelestiaDescription = () => (
  <DescriptionComponent
    title="Celestia"
    description={StatsComponent(DefencesStats.celestia)}
    requirements={
      <>
        <li>Dockyar level 1</li>
        <li>Combustion Drive level 1</li>
      </>
    }
  />
);
export const ScraperDescription = () => (
  <DescriptionComponent
    title="Scraper"
    description={StatsComponent(ShipsStats.scraper)}
    requirements={
      <>
        <li>Dockyard level 4</li>
        <li>Combusiton drive level 6</li>
        <li>Shield Technology level 2</li>
      </>
    }
  />
);
export const SparrowDescription = () => (
  <DescriptionComponent
    title="Sparrow"
    description={StatsComponent(ShipsStats.sparrow)}
    requirements={
      <>
        <li>Dockyard level 2</li>
      </>
    }
  />
);
export const FrigateDescription = () => (
  <DescriptionComponent
    title="Frigate"
    description={StatsComponent(ShipsStats.frigate)}
    requirements={
      <>
        <li>Dockyard level 5</li>
        <li>Ion Systems level 2</li>
        <li>Thrust Drive level 4</li>
      </>
    }
  />
);
export const ArmadeDescription = () => (
  <DescriptionComponent
    title="Armade"
    description={StatsComponent(ShipsStats.armade)}
    requirements={
      <>
        <li>Dockyard level 7</li>
        <li>Warp Drive level 4</li>
      </>
    }
  />
);
