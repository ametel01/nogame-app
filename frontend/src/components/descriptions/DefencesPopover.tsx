import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DefencesStats } from "../../constants/Stats";

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
  hull: number;
  shield: number;
  weapon: number;
}

const StatsComponent = ({ hull, shield, weapon }: StatsProps) => {
  return (
    <GridContainer>
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

export const BlasterDescription = () => (
  <DescriptionComponent
    title="Blaster"
    description={StatsComponent(DefencesStats.blaster)}
    requirements={
      <>
        <li>Dockyard level 1</li>
      </>
    }
  />
);
export const BeamDescription = () => (
  <DescriptionComponent
    title="Beam"
    description={StatsComponent(DefencesStats.beam)}
    requirements={
      <>
        <li>Dockyar level 2</li>
        <li>Energy Innovation level 2</li>
        <li>Beam Technology level 3</li>
      </>
    }
  />
);
export const AstralDescription = () => (
  <DescriptionComponent
    title="Astral Launcher"
    description={StatsComponent(DefencesStats.astral)}
    requirements={
      <>
        <li>Dockyard level 6</li>
        <li>Energy Innovation level 6</li>
        <li>Weapons Development level 3</li>
        <li>Shield Technology level 1</li>
      </>
    }
  />
);
export const PlasmaDescription = () => (
  <DescriptionComponent
    title="Plasma Projector"
    description={StatsComponent(DefencesStats.plasma)}
    requirements={
      <>
        <li>Dockyard level 8</li>
        <li>Plasma Engineering level 7</li>
      </>
    }
  />
);
