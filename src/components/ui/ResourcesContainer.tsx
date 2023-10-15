import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  QUARTZADDRESS,
  STEELADDRESS,
  TRITIUMADDRESS,
} from "../../constants/addresses";
import { numberWithCommas } from "../../shared/utils";
import { useTokenOf } from "../../hooks/useTokenOf";

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
  color: #81d3ff;
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

const ResourceAddress = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

interface Props {
  spendable?: string;
  collectible?: string;
  available?: number;
  img: string;
  title: string;
  address?: string;
}

const Energy = ({ available, img, title }: Props) => {
  const isNegative = Number(available) < 0;
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
            <TotalResourceType>available</TotalResourceType>
            <TotalResourceText
              style={{ color: isNegative ? "red" : "#81d3ff" }}
            >
              {available}
            </TotalResourceText>
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
        {address && !copied && (
          <ResourceAddress>{`${address.substring(0, 6)}...${address.slice(
            -4
          )}`}</ResourceAddress>
        )}
        {copied && <ResourceAddress>Copied</ResourceAddress>}
      </ImageAddressContainer>
      <TotalResourceWrapper>
        {title}
        <TotalResourceContainer>
          <div>
            <TotalResourceType>Spendable</TotalResourceType>
            <TotalResourceText>{spendable}</TotalResourceText>
            <TotalResourceType>Collectible</TotalResourceType>
            <TotalResourceText>{collectible}</TotalResourceText>
          </div>
        </TotalResourceContainer>
      </TotalResourceWrapper>
    </Container>
  );
};

const ResourcesContainer = () => {
  const data = useTokenOf();
  const planetId = Number(data.planetId);
  const spendable =
    planetId !== undefined ? useSpendableResources(planetId) : undefined;

  const collectible =
    planetId != undefined ? useCollectibleResources(planetId) : undefined;

  const energy = useEnergyAvailable(planetId);

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
      <Energy title="Energy" img={energyImg} available={energyAvailable} />
    </div>
  );
};

export default ResourcesContainer;
