import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { Typography } from "@mui/material";
// Asset imports
import ironImg from "../../../../frontend/src/assets/gameElements/resources/steel-1.png";
import quartzImg from "../../../../frontend/src/assets/gameElements/resources/quartz-2.png";
import tritiumImg from "../../../../frontend/src/assets/gameElements/resources/tritium-1.png";
import energyImg from "../../../../frontend/src/assets/gameElements/resources/energy-2.png";
import { TutorialProps } from "../../shared/types";
import {
  STEELADDRESS,
  QUARTZADDRESS,
  TRITIUMADDRESS,
} from "../../../../frontend/src/constants/addresses";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  border-top: 2px solid #151a1e;
`;

const ImageAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ImageStyle = styled.img`
  width: 50px;
  height: auto;
  object-fit: contain;
`;

const ResourceName = styled(Typography)({
  textTransform: "uppercase",
  opacity: 0.5,
  fontWeight: 700,
  lineHeight: "16px",
  letterSpacing: "0.02em",
  margin: 0, // Make sure no external spacing
  padding: 0, // Make sure no internal spacing

  width: "64px",
});

const TotalResourceText = styled.div`
  color: #98fb98;
  font-weight: 500;
  margin-left: 10px;
  padding-bottom: 6px;
`;

const TotalResourceContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const TotalResourceWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

interface Props {
  spendable?: string;
  collectible?: string;
  available?: string;
  img: string;
  title: string;
  address?: string;
  fromCelestia?: string;
}

const Energy = ({ available, img, title, fromCelestia }: Props) => {
  return (
    <Container>
      <Tooltip
        title={"Energy must always be positive to avoid loosing production"}
        arrow
      >
        <div>
          <ResourceName style={{ fontSize: "16px" }}>{title}</ResourceName>
          <ImageAddressContainer>
            <div style={{ width: "30px" }}>
              <ImageStyle src={img} alt="resource" />
            </div>
          </ImageAddressContainer>
        </div>
      </Tooltip>
      <TotalResourceWrapper>
        <TotalResourceContainer>
          <div>
            <ResourceName style={{ fontSize: "10px" }}>Available</ResourceName>
            <TotalResourceText>{String(available)}</TotalResourceText>
            <ResourceName style={{ fontSize: "10px" }}>Celestia</ResourceName>
            <TotalResourceText>{String(fromCelestia)}</TotalResourceText>
          </div>
        </TotalResourceContainer>
      </TotalResourceWrapper>
    </Container>
  );
};

const Resource = ({ spendable, collectible, img, title, address }: Props) => {
  const [copied, setCopied] = useState(false);
  return (
    <Container>
      <Tooltip title={copied ? "Copied" : "Copy Token Address"} arrow>
        <div>
          <ResourceName style={{ fontSize: "16px" }}>{title}</ResourceName>
          <ImageAddressContainer
            onClick={() => {
              if (address) {
                const blob = new Blob([address], { type: "text/plain" });
                const item = new ClipboardItem({ "text/plain": blob });
                navigator.clipboard.write([item]).then(() => setCopied(true));
              }
            }}
          >
            <div style={{ width: "30px" }}>
              <ImageStyle src={img} alt="resource" />
            </div>
          </ImageAddressContainer>
        </div>
      </Tooltip>
      <TotalResourceWrapper>
        {/* <ResourceName style={{ fontSize: "16px" }}>{title}</ResourceName> */}
        <TotalResourceContainer>
          <div>
            <ResourceName style={{ fontSize: "10px" }}>Spendable</ResourceName>
            <TotalResourceText>{String(spendable)}</TotalResourceText>
            <ResourceName style={{ fontSize: "10px" }}>
              Collectible
            </ResourceName>
            <TotalResourceText>{String(collectible)}</TotalResourceText>
          </div>
        </TotalResourceContainer>
      </TotalResourceWrapper>
    </Container>
  );
};

const ResourcesContainer = ({
  spendableResources,
  collectibleResources,
  energyAvailable,
  energyFromCelestia,
}: TutorialProps) => {
  console.log("ResourcesContainer", collectibleResources);
  return (
    <div>
      <Resource
        title="Steel"
        address={STEELADDRESS}
        img={ironImg}
        spendable={String(spendableResources?.steel)}
        collectible={String(collectibleResources?.steel)}
      />
      <Resource
        title="Quartz"
        address={QUARTZADDRESS}
        img={quartzImg}
        spendable={String(spendableResources?.quartz)}
        collectible={String(collectibleResources?.quartz)}
      />
      <Resource
        title="Tritium"
        address={TRITIUMADDRESS}
        img={tritiumImg}
        spendable={String(spendableResources?.tritium)}
        collectible={String(collectibleResources?.tritium)}
      />
      <Energy
        title="Energy"
        img={energyImg}
        available={String(energyAvailable)}
        fromCelestia={String(energyFromCelestia)}
      />
    </div>
  );
};

export default ResourcesContainer;
