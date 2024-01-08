import React, { useMemo, useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import {
  QUARTZADDRESS,
  STEELADDRESS,
  TRITIUMADDRESS,
} from '../../constants/addresses';
import { numberWithCommas } from '../../shared/utils';
// Asset imports
import ironImg from '../../assets/gameElements/resources/steel-1.webp';
import quartzImg from '../../assets/gameElements/resources/quartz-2.webp';
import tritiumImg from '../../assets/gameElements/resources/tritium-1.webp';
import energyImg from '../../assets/gameElements/resources/energy-2.webp';
import {
  useCollectibleResources,
  // useEnergyAvailable,
  useSpendableResources,
} from '../../hooks/ResourcesHooks';
import {
  useGetCelestiaAvailable,
  useGetCelestiaProduction,
} from '../../hooks/EnergyHooks';
import CompoundsFormulas from '../../shared/utils/Formulas';
import { CompoundsLevels } from '../../shared/types';
import fetchUpgradesData from '../../api/fetchUpgradesData';

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
  textTransform: 'uppercase',
  opacity: 0.5,
  fontWeight: 700,
  lineHeight: '16px',
  letterSpacing: '0.02em',
  margin: 0, // Make sure no external spacing
  padding: 0, // Make sure no internal spacing

  width: '64px',
});

const TotalResourceText = styled.div`
  color: #23ce6b;
  font-weight: 500;
  margin-left: 10px;
  padding-bottom: 6px;
`;

const TotalResourceContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const TotalResourceWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

interface Props {
  spendable?: string;
  collectible?: string;
  available?: number;
  img: string;
  title: string;
  address?: string;
  fromCelestia?: number;
}

const Energy = ({ available, img, title, fromCelestia }: Props) => {
  const energyAvailable = available != undefined ? Number(available) : 0;
  const availableStyle = {
    color: energyAvailable < 0 ? '#AB3836' : '#23CE6B', // Apply red color if available is negative
  };
  return (
    <Container>
      <div>
        <ResourceName style={{ fontSize: '16px' }}>{title}</ResourceName>
        <ImageAddressContainer>
          <div style={{ width: '30px' }}>
            <ImageStyle src={img} alt="resource" />
          </div>
        </ImageAddressContainer>
      </div>
      <TotalResourceWrapper>
        <Tooltip
          title={'Energy must always be positive to avoid loosing production'}
          arrow
          placement="top"
        >
          <TotalResourceContainer>
            <div>
              <ResourceName style={{ fontSize: '10px' }}>
                Available
              </ResourceName>
              <TotalResourceText style={availableStyle}>
                {numberWithCommas(available!)}
              </TotalResourceText>
              <ResourceName style={{ fontSize: '10px' }}>Celestia</ResourceName>
              <TotalResourceText>
                {numberWithCommas(fromCelestia!)}
              </TotalResourceText>
            </div>
          </TotalResourceContainer>
        </Tooltip>
      </TotalResourceWrapper>
    </Container>
  );
};

const Resource = ({ spendable, collectible, img, title, address }: Props) => {
  const [copied, setCopied] = useState(false);
  return (
    <Container>
      <Tooltip
        title={
          copied ? 'Copied' : 'Copy Token Address and add it to your wallet'
        }
        arrow
      >
        <div>
          <ResourceName style={{ fontSize: '16px' }}>{title}</ResourceName>
          <ImageAddressContainer
            onClick={() => {
              if (address) {
                const blob = new Blob([address], { type: 'text/plain' });
                const item = new ClipboardItem({ 'text/plain': blob });
                navigator.clipboard.write([item]).then(() => {
                  setCopied(true);
                });
              }
            }}
          >
            <div style={{ width: '30px' }}>
              <ImageStyle src={img} alt="resource" />
            </div>
          </ImageAddressContainer>
        </div>
      </Tooltip>
      <TotalResourceWrapper>
        <TotalResourceContainer>
          <div>
            <Tooltip
              title="Available for spending; 50% vulnerable to plundering in an attack."
              arrow
              placement="top"
            >
              <ResourceName style={{ fontSize: '10px' }}>
                Spendable
              </ResourceName>
            </Tooltip>
            <TotalResourceText>{String(spendable)}</TotalResourceText>
            <Tooltip
              title="
              Mined resources pending collection; not spendable and 100% at risk of plundering in an attack."
              arrow
            >
              <ResourceName style={{ fontSize: '10px' }}>
                Collectible
              </ResourceName>
            </Tooltip>
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
  const [compoundsLevels, setCompoundsLevels] =
    useState<CompoundsLevels | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUpgradesData({ planetId });
        setCompoundsLevels(data.compoundsLevels);
      } catch (error) {
        console.error('Error fetching upgrades data:', error);
        // Handle the error appropriately
      }
    };

    fetchData();
  }, [planetId]);

  const spendable = useSpendableResources(planetId);

  const collectible = useCollectibleResources(planetId);

  const solarEnergy = compoundsLevels
    ? CompoundsFormulas.energyProduction(Number(compoundsLevels.energy))
    : 0;
  const celestia = useGetCelestiaAvailable(planetId);
  const celestiaProduction = useGetCelestiaProduction(planetId);
  const energyFromCelestia = Number(celestia) * Number(celestiaProduction);

  const steelConsumption = CompoundsFormulas.steelConsumption(
    Number(compoundsLevels?.steel)
  );
  const quartzConsumption = CompoundsFormulas.quartzConsumption(
    Number(compoundsLevels?.quartz)
  );
  const tritiumConsumption = CompoundsFormulas.tritiumConsumption(
    Number(compoundsLevels?.tritium)
  );
  const netEnergy =
    solarEnergy +
    energyFromCelestia -
    (steelConsumption + quartzConsumption + tritiumConsumption);

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
        steel: numberWithCommas(Math.round(Number(collectible.steel))),
        quartz: numberWithCommas(Math.round(Number(collectible.quartz))),
        tritium: numberWithCommas(Math.round(Number(collectible.tritium))),
      };
    }
  }, [collectible]);

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
        available={netEnergy}
        fromCelestia={energyFromCelestia}
      />
    </div>
  );
};

export default ResourcesContainer;
