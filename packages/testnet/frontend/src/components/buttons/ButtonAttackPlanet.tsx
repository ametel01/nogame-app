import React, { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/system';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/joy';
import WarningIcon from '@mui/icons-material/Warning';
import armadeImg from '../../assets/gameElements/ships/armade4.webp';
import frigateImg from '../../assets/gameElements/ships/frigate4.webp';
import carrierImg from '../../assets/gameElements/ships/carrier4.webp';
import sparrowImg from '../../assets/gameElements/ships/sparrow4.webp';
import scraperImg from '../../assets/gameElements/ships/scraper4.webp';
import { StyledButton } from '../../shared/styled/Button';
import {
  type ShipsLevels,
  type TechLevels,
  type Position,
} from '../../shared/types';
import useSendFleet from '../../hooks/writeHooks/useSendFleet';
import { useGetActiveMissions } from '../../hooks/FleetHooks';
import {
  calculateTotalCargoCapacity,
  getDistance,
  getFleetSpeed,
  getFlightTime,
  getFuelConsumption,
} from '../../shared/utils/FleetUtils';
import { convertSecondsToTime } from '../../shared/utils';
import { TransactionStatus } from '../ui/TransactionStatus';
import { numberWithCommas } from '../../shared/utils';

type ShipName = 'carrier' | 'scraper' | 'sparrow' | 'frigate' | 'armade';

const shipImageMapping: Record<ShipName, string> = {
  carrier: carrierImg,
  scraper: scraperImg,
  sparrow: sparrowImg,
  frigate: frigateImg,
  armade: armadeImg,
};

export const StyledBox = styled(Box)({
  fontWeight: 400,
  fontSize: 20,
  color: '#E7ECEE',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#1a2025',
  borderRadius: 16,
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  padding: '16px 32px',
  display: 'flex',
  flexDirection: 'column',
  width: '45%',
});

export const CloseStyledIcon = styled(CloseIcon)({
  cursor: 'pointer',
  padding: '0 8px',
  fontSize: '2em',
  position: 'absolute',
  top: 8, // You can adjust this value as needed
  right: 8, // You can adjust this value as needed
  transition: 'boxShadow 0.3s ease', // Smooth transition for the shadow on hover

  '&:hover': {
    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.2)', // Circle shadow effect
    borderRadius: '50%', // Ensures the shadow takes a circular form
  },
});

export const HeaderDiv = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledUl = styled('ul')({
  padding: '8px',
  flexGrow: 1,
});

const Text = styled('span')({
  flexGrow: 1,
  textAlign: 'center',
  fontSize: '16px',
});

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '8px',
  gap: '4px',
  margin: '8px',
  flexDirection: 'row',
});

const WarningContainer = styled('div')({
  display: 'flex',
  borderRadius: '8px',
  gap: '4px',
  // margin: "8px",
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '16px',
  marginBottom: '32px',
});

const InputButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const TravelInfoContainer = styled('div')({
  alignSelf: 'flex-start',
  marginTop: '32px',
  marginLeft: '20px',
  fontSize: '16px',
});

const TravelInfoRow = styled('div')({
  marginBottom: '24px',
});

const TravelInfoData = styled('span')({
  color: '#23CE6B',
  marginLeft: '16px',
});

const ShipImage = styled('img')({
  width: '40px',
  height: '40px',
  margin: '0 4px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '8px',
  marginRight: '8px',
});

interface Props {
  callback?: () => void;
  disabled?: boolean;
  noRequirements?: boolean;
  isNoobProtected?: boolean;
  destination: string;
  ownFleet: ShipsLevels;
  techs?: TechLevels;
  ownPosition?: Position;
  planetId: number;
}

function ButtonAttackPlanet({
  disabled,
  noRequirements,
  isNoobProtected,
  destination,
  ownFleet,
  techs,
  ownPosition,
  planetId,
}: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [travelTime, setTravelTime] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [cargoCapacity, setCargoCapacity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtotClicked, setisButtotClicked] = useState(false);

  const missions = useGetActiveMissions(planetId);
  const isMissionLimitReached =
    missions && techs && missions.length === techs.digital + 1;

  const totalShips = Object.entries(quantities).reduce(
    (acc, [ship, quantity]) => {
      return quantity <= ownFleet[ship as keyof typeof ownFleet]
        ? acc + quantity
        : acc;
    },
    0
  );

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const destinationArray = destination.split('/');

  const position: Position = {
    system: Number(destinationArray[0]),
    orbit: Number(destinationArray[1]),
  };

  const fleet = useMemo(
    () => ({
      carrier: quantities.carrier || 0,
      scraper: quantities.scraper || 0,
      sparrow: quantities.sparrow || 0,
      frigate: quantities.frigate || 0,
      armade: quantities.armade || 0,
    }),
    [quantities]
  );

  const distance = ownPosition ? getDistance(ownPosition, position) : 0;

  useEffect(() => {
    const speed: number = techs ? getFleetSpeed(fleet, techs) : 0;
    setTravelTime(getFlightTime(speed, distance));
    setFuelConsumption(getFuelConsumption(fleet, distance));
    setCargoCapacity(calculateTotalCargoCapacity(fleet));
  }, [distance, fleet, ownPosition, techs]);

  const { writeAsync, data } = useSendFleet(fleet, position, false);

  const ships = ['carrier', 'scraper', 'sparrow', 'frigate', 'armade'];

  const isAnyShipOverLimit = ships.some(
    (ship) => quantities[ship] > ownFleet[ship as keyof typeof ownFleet]
  );

  const [timeOfArrival, setTimeOfArrival] = useState<Date | null>(null);

  useEffect(() => {
    if (travelTime !== undefined) {
      const arrival = new Date();
      arrival.setSeconds(arrival.getSeconds() + Number(travelTime));
      setTimeOfArrival(arrival);
    }
  }, [travelTime]);

  const handleSendClick = () => {
    writeAsync(), setIsModalOpen(false), setisButtotClicked(true);
  };

  function handleChange(ship: string, event: { target: { value: string } }) {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setQuantities({ ...quantities, [ship]: value });
  }

  return (
    <div>
      {!disabled && !noRequirements && !isNoobProtected && (
        <>
          <StyledButton
            onClick={handleButtonClick}
            fullWidth={true}
            sx={{
              background: '#4A63AA',
            }}
          >
            Initiate Mission
          </StyledButton>
          <Modal open={isModalOpen} onClose={handleClose}>
            <StyledBox>
              <HeaderDiv>
                SELECT SHIPS
                <CloseStyledIcon onClick={handleClose} />
              </HeaderDiv>
              <FlexContainer
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <div>
                  <StyledUl>
                    {ships.map((ship) => (
                      <FlexContainer key={ship}>
                        <ShipImage
                          src={shipImageMapping[ship as ShipName] || ''}
                          alt={ship}
                        />
                        <Text
                          style={{
                            marginRight: '32px',
                            textTransform: 'capitalize',
                            color:
                              quantities[ship] >
                              ownFleet[ship as keyof typeof ownFleet]
                                ? '#AB3836'
                                : '#F8F8FF',
                          }}
                        >
                          {ship} (
                          <span
                            style={{
                              color:
                                Number(
                                  ownFleet[ship as keyof typeof ownFleet]
                                ) -
                                  (quantities[ship] || 0) <
                                0
                                  ? '#AB3836'
                                  : '#23CE6B',
                            }}
                          >
                            {Number(ownFleet[ship as keyof typeof ownFleet]) -
                              (quantities[ship] || 0)}
                          </span>
                          )
                        </Text>
                        <InputButtonContainer>
                          <Input
                            type="number"
                            value={quantities[ship] || 0}
                            onChange={(e) => handleChange(ship, e)}
                            size="sm"
                            color="neutral"
                            variant="soft"
                            style={{ width: '80px' }}
                          />
                        </InputButtonContainer>
                      </FlexContainer>
                    ))}
                  </StyledUl>
                </div>
                {/* Right Column */}
                <TravelInfoContainer>
                  <TravelInfoRow>
                    Destination: <TravelInfoData>{destination}</TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Travel time:{' '}
                    <TravelInfoData>
                      {convertSecondsToTime(travelTime)}
                    </TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Time arrival:{' '}
                    <TravelInfoData>
                      {timeOfArrival
                        ? timeOfArrival.toLocaleTimeString()
                        : null}
                    </TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Fuel consumption:{' '}
                    <TravelInfoData>
                      {numberWithCommas(fuelConsumption)}
                    </TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Total number of ships:{' '}
                    <TravelInfoData>
                      {numberWithCommas(totalShips)}
                    </TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Cargo capacity:{' '}
                    <TravelInfoData>
                      {numberWithCommas(cargoCapacity)}
                    </TravelInfoData>
                  </TravelInfoRow>
                </TravelInfoContainer>
              </FlexContainer>
              <WarningContainer>
                <WarningIcon sx={{ color: '#E67E51' }} />
                <Text style={{ marginLeft: '8px', color: '#E67E51' }}>
                  Attention! You are initiating a galactic assault. The target
                  planet will receive an alert that your starfleet is on its
                  trajectory.
                </Text>
              </WarningContainer>
              <StyledButton
                onClick={handleSendClick}
                fullWidth
                style={{
                  background: isAnyShipOverLimit ? '#3B3F53' : '#4A63AA',
                }}
                disabled={isAnyShipOverLimit || isMissionLimitReached}
              >
                Send Fleet
              </StyledButton>
            </StyledBox>
          </Modal>
          {isButtotClicked && (
            <TransactionStatus name="Sent Fleet" tx={data?.transaction_hash} />
          )}
        </>
      )}
      {!disabled && noRequirements && (
        <StyledButton
          disabled
          fullWidth={true}
          sx={{
            background: '#3B3F53',
          }}
        >
          Own Planet
        </StyledButton>
      )}
      {isNoobProtected && (
        <StyledButton
          fullWidth={true}
          disabled
          sx={{
            background: '#E67E51',
          }}
        >
          Noob Protected
        </StyledButton>
      )}
    </div>
  );
}

export default ButtonAttackPlanet;
