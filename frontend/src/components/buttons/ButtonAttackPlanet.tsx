import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import armadeImg from "../../assets/gameElements/ships/armade.png";
import frigateImg from "../../assets/gameElements/ships/frigate.png";
import carrierImg from "../../assets/gameElements/ships/carrier.png";
import sparrowImg from "../../assets/gameElements/ships/sparrow.png";
import scraperImg from "../../assets/gameElements/ships/scraper.png";
import { StyledButton } from "../../shared/styled/Button";
import { ShipsLevels, TechLevels } from "../../shared/types";
import useSendFleet from "../../hooks/writeHooks/useSendFleet";
import { Fleet, Position } from "../../shared/types";
import {
  calculateTotalCargoCapacity,
  getDistance,
  getFleetSpeed,
  getFlightTime,
  getFuelConsumption,
} from "../../shared/utils/FleetUtils";
import { convertSecondsToTime } from "../../shared/utils";

type ShipName = "carrier" | "scraper" | "sparrow" | "frigate" | "armade";

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
  color: "#E7ECEE",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1a2025",
  borderRadius: 16,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  padding: "16px 32px",
  display: "flex",
  flexDirection: "column",
  width: "45%",
});

export const CloseStyledIcon = styled(CloseIcon)({
  cursor: "pointer",
  padding: "0 8px",
  fontSize: "2em",
  position: "absolute",
  top: 8, // You can adjust this value as needed
  right: 8, // You can adjust this value as needed
  transition: "boxShadow 0.3s ease", // Smooth transition for the shadow on hover

  "&:hover": {
    boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.2)", // Circle shadow effect
    borderRadius: "50%", // Ensures the shadow takes a circular form
  },
});

export const HeaderDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledUl = styled("ul")({
  padding: "8px",
  flexGrow: 1,
});

const Text = styled("span")({
  flexGrow: 1,
  textAlign: "center",
  fontSize: "16px",
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "8px",
  gap: "4px",
  margin: "8px",
  flexDirection: "row",
});

const WarningContainer = styled("div")({
  display: "flex",
  borderRadius: "8px",
  gap: "4px",
  // margin: "8px",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "16px",
  marginBottom: "32px",
});

const InputButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const TravelInfoContainer = styled("div")({
  alignSelf: "flex-start",
  marginTop: "32px",
  marginLeft: "20px",
  fontSize: "16px",
});

const TravelInfoRow = styled("div")({
  marginBottom: "24px",
});

const TravelInfoData = styled("span")({
  color: "#98fb98",
  marginLeft: "16px",
});

const ShipImage = styled("img")({
  width: "40px",
  height: "40px",
  margin: "0 4px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px",
  marginRight: "8px",
});

interface Props {
  callback?: () => void;
  disabled?: boolean;
  noRequirements?: boolean;
  isNoobProtected?: boolean;
  destination: string;
  ownFleet: ShipsLevels;
  techs: TechLevels;
  ownPosition?: Position;
}

export function ButtonAttackPlanet({
  disabled,
  noRequirements,
  isNoobProtected,
  destination,
  ownFleet,
  techs,
  ownPosition,
}: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [travelTime, setTravelTime] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [cargoCapacity, setCargoCapacity] = useState(0);

  const totalShips = Object.entries(quantities).reduce(
    (acc, [ship, quantity]) => {
      return quantity <= ownFleet[ship as keyof typeof ownFleet]
        ? acc + quantity
        : acc;
    },
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const destinationArray = destination.split("/");

  const position: Position = {
    system: Number(destinationArray[0]),
    orbit: Number(destinationArray[1]),
  };

  const fleet: Fleet = {
    carrier: quantities.carrier || 0,
    scraper: quantities.scraper || 0,
    sparrow: quantities.sparrow || 0,
    frigate: quantities.frigate || 0,
    armade: quantities.armade || 0,
  };

  const distance = ownPosition ? getDistance(ownPosition, position) : 0;

  useEffect(() => {
    const speed: number = getFleetSpeed(fleet, techs);
    setTravelTime(getFlightTime(speed, distance));
    setFuelConsumption(getFuelConsumption(fleet, distance));
    setCargoCapacity(calculateTotalCargoCapacity(fleet));
  }, [fleet, ownPosition]);

  const { submitTx } = useSendFleet(fleet, position, false);

  const ships = ["carrier", "scraper", "sparrow", "frigate", "armade"];

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

  return (
    <div>
      {!disabled && !noRequirements && !isNoobProtected && (
        <>
          <StyledButton
            onClick={handleButtonClick}
            fullWidth={true}
            sx={{
              background: "#4A63AA",
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
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <StyledUl>
                    {ships.map((ship) => (
                      <FlexContainer key={ship}>
                        <ShipImage
                          src={shipImageMapping[ship as ShipName] || ""}
                          alt={ship}
                        />
                        <Text
                          style={{
                            marginRight: "32px",
                            textTransform: "capitalize",
                            color:
                              quantities[ship] >
                              ownFleet[ship as keyof typeof ownFleet]
                                ? "red"
                                : "#F8F8FF",
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
                                  ? "red"
                                  : "#98fb98",
                            }}
                          >
                            {Number(ownFleet[ship as keyof typeof ownFleet]) -
                              (quantities[ship] || 0)}
                          </span>
                          )
                        </Text>
                        <InputButtonContainer>
                          <Input
                            type="text"
                            value={quantities[ship] || 0}
                            onChange={(e) => {
                              const value =
                                e.target.value === ""
                                  ? 0
                                  : parseInt(e.target.value, 10);
                              setQuantities({ ...quantities, [ship]: value });
                            }}
                            size="sm"
                            color="neutral"
                            variant="soft"
                            style={{ width: "80px" }}
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
                    Travel time:{" "}
                    <TravelInfoData>
                      {convertSecondsToTime(travelTime)}
                    </TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Time arrival:{" "}
                    <TravelInfoData>
                      {timeOfArrival
                        ? timeOfArrival.toLocaleTimeString()
                        : null}
                    </TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Fuel consumption:{" "}
                    <TravelInfoData>{fuelConsumption}</TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Total number of ships:{" "}
                    <TravelInfoData>{totalShips}</TravelInfoData>
                  </TravelInfoRow>
                  <TravelInfoRow>
                    Cargo capacity:{" "}
                    <TravelInfoData>{cargoCapacity}</TravelInfoData>
                  </TravelInfoRow>
                </TravelInfoContainer>
              </FlexContainer>
              <WarningContainer>
                <WarningIcon sx={{ color: "#E67E51" }} />
                <Text style={{ marginLeft: "8px", color: "#E67E51" }}>
                  Attention! You are initiating a galactic assault. The target
                  planet will receive an alert that your starfleet is on its
                  trajectory.
                </Text>
              </WarningContainer>
              <StyledButton
                onClick={submitTx}
                fullWidth
                style={{
                  background: isAnyShipOverLimit ? "#3B3F53" : "#4A63AA",
                }}
                disabled={isAnyShipOverLimit}
              >
                Send Fleet
              </StyledButton>
            </StyledBox>
          </Modal>
        </>
      )}
      {!disabled && noRequirements && (
        <StyledButton
          disabled
          fullWidth={true}
          sx={{
            background: "#3B3F53",
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
            background: "#E67E51",
          }}
        >
          Noob Protected
        </StyledButton>
      )}
    </div>
  );
}
