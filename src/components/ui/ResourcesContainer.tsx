import { useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import {
  QUARTZADDRESS,
  STEELADDRESS,
  TRITIUMADDRESS,
} from "../../constants/addresses";
import { numberWithCommas } from "../../shared/utils";
// Asset imports
import ironImg from "../../assets/gameElements/resources/steel-1.png";
import quartzImg from "../../assets/gameElements/resources/quartz-2.png";
import tritiumImg from "../../assets/gameElements/resources/tritium-1.png";
import energyImg from "../../assets/gameElements/resources/energy-2.png";
import {
  useCollectibleResources,
  useEnergyAvailable,
  useSpendableResources,
} from "../../hooks/ResourcesHooks";
import {
  useGetCelestiaAvailable,
  useGetCelestiaProduction,
} from "../../hooks/EnergyHooks";

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
  min-width: 50px;
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

const TotalResourceText = styled.div`
  color: #58a6ff;
  font-weight: 500;
  margin-left: 10px;
`;

const TotalResourceType = styled.div`
  font-size: 10px;
  margin-top: 10px;
  margin-left: 10px;
`;

const TotalResourceContainer = styled.div`
  display: flex;
  align-items: center;
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
      <ImageAddressContainer>
        <div style={{ width: "30px" }}>
          <ImageStyle src={img} alt="resource" />
        </div>
      </ImageAddressContainer>
      <TotalResourceWrapper>
        {title}
        <TotalResourceContainer>
          <div>
            <TotalResourceType>Net Available</TotalResourceType>
            <TotalResourceText>{String(available)}</TotalResourceText>
            <TotalResourceType>From Celestia</TotalResourceType>
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
      </Tooltip>
      <TotalResourceWrapper>
        {title}
        <TotalResourceContainer>
          <div>
            <TotalResourceType>Spendable</TotalResourceType>
            <TotalResourceText>{String(spendable)}</TotalResourceText>
            <TotalResourceType>Collectible</TotalResourceType>
            <TotalResourceText>{String(collectible)}</TotalResourceText>
          </div>
        </TotalResourceContainer>
      </TotalResourceWrapper>
    </Container>
  );
};

interface ResourceContainerArgs {
  planetId: number;
}

const ResourcesContainer = ({ planetId }: ResourceContainerArgs) => {
  const spendable =
    planetId !== undefined ? useSpendableResources(planetId) : undefined;

  const collectible =
    planetId != undefined ? useCollectibleResources(planetId) : undefined;

  const energy = useEnergyAvailable(planetId);
  const celestia =
    planetId != undefined ? useGetCelestiaAvailable(planetId) : undefined;
  const celestiaProduction =
    planetId != undefined ? useGetCelestiaProduction(planetId) : undefined;
  const energyFromCelestia = Number(celestia) * Number(celestiaProduction);

  const spendableResources = useMemo(() => {
    if (spendable) {
      return {
        steel: numberWithCommas(Number(spendable.steel)),
        quartz: numberWithCommas(Number(spendable.quartz)),
        tritium: numberWithCommas(Number(spendable.tritium)),
      };
    }
  }, [spendable]);

  const collectibleResources = useMemo(() => {
    if (collectible) {
      return {
        steel: numberWithCommas(Number(collectible.steel)),
        quartz: numberWithCommas(Number(collectible.quartz)),
        tritium: numberWithCommas(Number(collectible.tritium)),
      };
    }
  }, [collectible]);

  const energyAvailable = Number(energy);

  return (
    <div>
      <Resource
        title="Steel"
        address={STEELADDRESS}
        img={ironImg}
        spendable={spendableResources?.steel}
        collectible={collectibleResources?.steel}
      />
      <Resource
        title="Quartz"
        address={QUARTZADDRESS}
        img={quartzImg}
        spendable={spendableResources?.quartz}
        collectible={collectibleResources?.quartz}
      />
      <Resource
        title="Tritium"
        address={TRITIUMADDRESS}
        img={tritiumImg}
        spendable={spendableResources?.tritium}
        collectible={collectibleResources?.tritium}
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
