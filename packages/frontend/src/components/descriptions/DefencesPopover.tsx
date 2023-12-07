import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DefencesStats } from "../../constants/Stats";

import blasterImg from "../../assets/gameElements/defences/blaster4.png";
import beamImg from "../../assets/gameElements/defences/beam4.png";
import astralLauncherImg from "../../assets/gameElements/defences/astral4.png";
import plasmaImg from "../../assets/gameElements/defences/plasma4.png";

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
  padding: "24px 24px",
  flexDirection: "column",
  width: "40%",
  display: "grid",
  gridTemplateRows: "auto 1fr auto", // Three rows: header, main content, stats
  gap: "16px", // Space between grid rows
});

const HeaderDiv = styled("div")`
  font-size: 20px;
  text-transform: uppercase;
`;

const TextBox = styled("div")`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
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
  image: string;
  description: React.ReactNode;
  stats: React.ReactNode;
  requirements: React.ReactNode;
}

const DescriptionComponent = ({
  title,
  image,
  description,
  stats,
  requirements,
}: DescriptionComponentProps) => {
  return (
    <StyledBox>
      <HeaderDiv>{title}</HeaderDiv>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        {/* Image */}
        <img
          src={image}
          alt={`${title}`}
          style={{ width: "240px", marginRight: "16px", borderRadius: "8px" }}
        />
        {/* Description and Requirements */}
        <div>
          <TextBox>{description}</TextBox>
          <div style={{ marginTop: "8px" }}>Requirements:</div>
          <Requirements>{requirements}</Requirements>
        </div>
      </div>
      {/* Stats */}
      {stats}
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

export const BlasterDescription = () => (
  <DescriptionComponent
    title="Blaster"
    image={blasterImg}
    description="Blasters are the first defense available, effective against Carriers and low in cost. They only require steel to be built, making them economical, but they are less effective against other ship types."
    stats={StatsComponent(DefencesStats.blaster)}
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
    image={beamImg}
    description="Beams represent the second stage of defense, being effective against Sparrows and Carriers but less effective against higher-grade ships."
    stats={StatsComponent(DefencesStats.beam)}
    requirements={
      <>
        <li>Dockyar level 2</li>
        <li>Energy Innovation level 2</li>
        <li>Beam Tech level 3</li>
      </>
    }
  />
);
export const AstralDescription = () => (
  <DescriptionComponent
    title="Astral Launcher"
    image={astralLauncherImg}
    description="Astral Launchers can counter attacks from fleets equipped with Frigates, but they struggle against Armades."
    stats={StatsComponent(DefencesStats.astral)}
    requirements={
      <>
        <li>Dockyard level 6</li>
        <li>Energy Innovation level 6</li>
        <li>Weapons tech level 3</li>
        <li>Shield Technology level 1</li>
      </>
    }
  />
);
export const PlasmaDescription = () => (
  <DescriptionComponent
    title="Plasma Projector"
    image={plasmaImg}
    description="Plasma Projectors, the ultimate defense, can withstand Armadas with their strong hulls and powerful weapons, but they come at a high cost."
    stats={StatsComponent(DefencesStats.plasma)}
    requirements={
      <>
        <li>Dockyard level 8</li>
        <li>Plasma tech level 7</li>
      </>
    }
  />
);
