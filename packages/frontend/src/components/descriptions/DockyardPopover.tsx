import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DefencesStats, ShipsStats } from "../../constants/Stats";
import armadeImg from "../../assets/gameElements/ships/armade4.png";
import frigateImg from "../../assets/gameElements/ships/frigate4.png";
import carrierImg from "../../assets/gameElements/ships/carrier4.png";
import sparrowImg from "../../assets/gameElements/ships/sparrow4.png";
import scraperImg from "../../assets/gameElements/ships/scraper4.png";
import celestiaImg from "../../assets/gameElements/ships/celestia4.png";

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

export const CarrierDescription = () => (
  <DescriptionComponent
    title="Carrier"
    image={carrierImg}
    description="Carriers are used to transport resources; they are inexpensive and available early in the game. Initially equipped with a combustion engine, their speed doubles at level 4 with thrust propulsion."
    stats={StatsComponent(ShipsStats.carrier)}
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
    image={celestiaImg}
    description="Celestia orbit the planet and generate energy, with higher output in low orbits. They are efficient energy sources but are vulnerable to attacks and can be easily destroyed."
    stats={StatsComponent(DefencesStats.celestia)}
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
    image={scraperImg}
    description="Scrapers collect resources from debris fields around planets post-battles. They are slow-moving and consume a relatively high amount of fuel."
    stats={StatsComponent(ShipsStats.scraper)}
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
    image={sparrowImg}
    description="The Sparrow, the smallest warship, is available early in the game. It's fast and inexpensive but has limited weaponry and a small hull."
    stats={StatsComponent(ShipsStats.sparrow)}
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
    image={frigateImg}
    description="The Frigate is a mid-sized warship, known for its speed. It can be particularly powerful in the early game, when most players have only Sparrows and Blasters."
    stats={StatsComponent(ShipsStats.frigate)}
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
    image={armadeImg}
    description="Armades are the most powerful warships, with their speed and heavy weaponry making them formidable against most defenses. They don't require tritium for construction but have high fuel consumption."
    stats={StatsComponent(ShipsStats.armade)}
    requirements={
      <>
        <li>Dockyard level 7</li>
        <li>Warp Drive level 4</li>
      </>
    }
  />
);
