import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

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
  border-radius: 8px;
`;

const TextBox = styled("div")`
  font-size: 16px;
  line-height: 1.5;
`;

const Requirements = styled("ul")({
  color: "#98fb98",
});

// Component props
interface DescriptionComponentProps {
  title: string;
  description: string;
  requirements: React.ReactNode;
}

// Description component
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
          <br />
          <br />
          <div>Requirements:</div>
          <Requirements>{requirements}</Requirements>
        </TextBox>
      </Container>
    </StyledBox>
  );
};

// Usage of DescriptionComponent for different purposes
export const ArmourDescription = () => (
  <DescriptionComponent
    title="Armour Technology"
    description="Armour Innovation increases fleet and defense hull durability by 10%."
    requirements={
      <li>
        <div>Research Lab Level 2</div>
      </li>
    }
  />
);
export const CombustionDescription = () => (
  <DescriptionComponent
    title="Combustion Drive"
    description="Each level increases the base speed of Carrier, Sparrow, and Scraper by 10%"
    requirements={
      <>
        <li>Research Lab Level 1</li>
        <li>Energy Innovation Level 1</li>
      </>
    }
  />
);
export const ComputerDescription = () => (
  <DescriptionComponent
    title="Digital Systems"
    description="Increases the fleet slots by 1 for each level. Specifically, the number of
    fleet slots equals the level of digital systems plus one"
    requirements={
      <>
        <li>Research Lab Level 1</li>
      </>
    }
  />
);
export const EnergyDescription = () => (
  <DescriptionComponent
    title="Energy Innovation"
    description="Each upgrade in Energy
    Innovation leads to new research opportunities, enabling the
    development of advanced ships and defenses."
    requirements={
      <>
        <li>Research Lab Level 1</li>
      </>
    }
  />
);
export const BeamDescription = () => (
  <DescriptionComponent
    title="Beam Technology"
    description="This technology is an essential prerequisite for the
    progression into ion and plasma-based weaponry systems. The utility of
    Beam Technology research exhibits a saturation point at Level 12."
    requirements={
      <>
        <li>Research Lab Level 1</li>
        <li>Energy Innovation Level 1</li>
      </>
    }
  />
);
export const IonDescription = () => (
  <DescriptionComponent
    title="Ion Systems"
    description="This technology aids in developing weapon systems. Successful integration leads to advancements like
    deploying Frigate-class vessels and initiating Plasma Engineering
    research"
    requirements={
      <>
        <li>Research Lab Level 4</li>
        <li>Beam Technology Level 5</li>
        <li>Energy Innovation Level 4</li>
      </>
    }
  />
);

export const PlasmaDescription = () => (
  <DescriptionComponent
    title="Plasma Engineering"
    description="Used for heavy weaponry development. Upon collision with a target, plasma is capable of
    causing substantial structural damage."
    requirements={
      <>
        <li>Research Lab Level 4</li>
        <li>Beam Technology Level 10</li>
        <li>Energy Innovation Level 8</li>
        <li>Ion Systems Level 5</li>
      </>
    }
  />
);

export const ShieldDescription = () => (
  <DescriptionComponent
    title="Shields Technology"
    description="Advancements in this domain increment shield
    efficiency by a factor equivalent to 10% of the intrinsic baseline
    value for each subsequent level of development."
    requirements={
      <>
        <li>Research Lab Level 6</li>
        <li>Energy Innovation Level 3</li>
      </>
    }
  />
);

export const SpacetimeDescription = () => (
  <DescriptionComponent
    title="Spacetime Technology"
    description=" With enough
    advancement in Spacetime Warp Technology, Hyperspatial Propulsion 
    becomes more than just a theoretical concept, allowing for the development of the Warp Drive"
    requirements={
      <>
        <li>Research Lab Level 7</li>
        <li>Energy Innovation Level 5</li>
        <li>Shield Technology Level 5</li>
      </>
    }
  />
);

export const ThrustDescription = () => (
  <DescriptionComponent
    title="Thrust Propulsion"
    description="After level 4 is reached, Carriers are equipped
    with thrust propulsion, doubling their base speed. For every
    subsequent level of advancement in the Thrust Propulsion technology,
    the Base Speed is further boosted by a noteworthy percentage of 20%."
    requirements={
      <>
        <li>Research Lab Level 2</li>
        <li>Energy Innovation Level 1</li>
      </>
    }
  />
);

export const WarpDescription = () => (
  <DescriptionComponent
    title="Warp Drive"
    description="Ships equipped with this technology (Armades) experience a 30% increase in Base
    Speed for each level of proficiency in the Warp Drive"
    requirements={
      <>
        <li>Research Lab Level 7</li>
        <li>Energy Innovation Level 5</li>
        <li>Shield Tech 5</li>
        <li>Spacetime Warp Level 3</li>
      </>
    }
  />
);

export const WeaponsDescription = () => (
  <DescriptionComponent
    title="Weapons Technology"
    description="Allowes the development of advanced ships and defences. Each levele advancement
    yealds a 10% increase in weapons power"
    requirements={
      <>
        <li>Research Lab Level 4</li>
      </>
    }
  />
);
