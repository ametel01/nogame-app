import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useAccount, useContractRead } from "@starknet-react/core";
import {
  GAMEADDRESS,
  QUARTZADDRESS,
  STEELADDRESS,
  TRITIUMADDRESS,
} from "../../constants/addresses";
import { numberWithCommas } from "../../shared/utils";
import game from "../../constants/nogame.json";
import { useTokenOf } from "../../hooks/useTokenOf";

// Asset imports
import ironImg from "../assets/resources/nogameiron.png";
import quartzImg from "../assets/resources/nogamecrystal.png";
import tritiumImg from "../assets/resources/nogamedeuterium.png";
import energyImg from "../assets/resources/nogameenergy.png";
import coins from "../assets/icons/Coins.svg";
import gem from "../assets/icons/Gem.svg";
import atom from "../assets/icons/Atom.svg";
import bolt from "../assets/icons/Bolt.svg";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  flex: none;
  align-self: stretch;
  border-top: 2px solid #151a1e;
`;

const ImageStyle = styled.img`
  max-width: 100%;
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
  padding-top: 10px;
  padding-left: 10px;
`;

const TotalResourceContainer = styled.div`
  display: flex;
`;

const TotalResourceWrapper = styled.div`
  margin-left: 30px;
`;

const ResourceAddress = styled.div`
  font-size: 12px;
`;

const ImageAddressContainer = styled.div`
  min &:hover {
    cursor: pointer;
  }
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  min-width: 50px;
`;

interface Props {
  spendable?: string;
  collectible?: string;
  available?: string;
  img: string;
  iconImg: string;
  title: string;
  address?: string;
}

const Energy = ({ available, img, iconImg, title }: Props) => {
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
          <ImageStyle src={iconImg} alt="icon-resource" />
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

const Resource = ({
  spendable,
  collectible,
  img,
  iconImg,
  title,
  address,
}: Props) => {
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
          <ImageStyle src={iconImg} alt="icon-resource" />
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
  const { address } = useAccount();
  const planetId = useTokenOf(address);
  if (!planetId) return null;

  interface ResourceData {
    steel: string;
    quartz: string;
    tritium: string;
  }

  const { data: spendable } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_spendable_resources",
    args: [planetId],
  }) as unknown as { data: ResourceData };

  const { data: collectible } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "getCollectibleResources",
    args: [planetId],
  }) as unknown as { data: ResourceData };

  const { data: energy } = useContractRead({
    address: GAMEADDRESS,
    abi: game.abi,
    functionName: "get_energy_available",
    args: [planetId],
  });

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

  const energyAvailable = useMemo(() => {
    if (energy) {
      return {
        energy: numberWithCommas(Number(energy)),
      };
    }
  }, [energy]);

  return (
    <div>
      <Resource
        title="Steel"
        address={STEELADDRESS}
        img={ironImg}
        iconImg={coins}
        spendable={spendableResources?.steel}
        collectible={collectibleResources?.steel}
      />
      <Resource
        title="Quartz"
        address={QUARTZADDRESS}
        img={quartzImg}
        iconImg={gem}
        spendable={spendableResources?.quartz}
        collectible={collectibleResources?.quartz}
      />
      <Resource
        title="Tritium"
        address={TRITIUMADDRESS}
        img={tritiumImg}
        iconImg={atom}
        spendable={spendableResources?.tritium}
        collectible={collectibleResources?.tritium}
      />
      <Energy
        title="Energy"
        img={energyImg}
        iconImg={bolt}
        available={energyAvailable?.energy}
      />
    </div>
  );
};

export default ResourcesContainer;
