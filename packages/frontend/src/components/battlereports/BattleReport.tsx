import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../ui/Header";
// import { Fleet } from "../../shared/types";

const ContentWrapper = styled.div`
  margin-top: 24px;
  width: 50%;
  margin: 0 auto; // This centers the box
`;

const BattleReportContainer = styled.div`
  color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BattleReportHeader = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(180deg, #3a3f44 0%, #181c20 100%);
  &:hover {
    background: linear-gradient(180deg, #4a4f54 0%, #282c30 100%);
  }
`;

const BattleReportDetails = styled.div`
  background-color: #2b3036;
  padding: 10px;
  display: none;
  &.expanded {
    display: block;
  }
`;

const DetailItem = styled.div`
  color: #98fb98;
  margin-bottom: 5px;
`;

type FetchData = {
  battle_id: number;
  time: Date;
  attacker: string;
  defender: string;
  // attacker_fleet: Fleet;
  // defender_fleet: Fleet;
  attacker_carrier_loss: number;
  attacker_scraper_loss: number;
  attacker_sparrow_loss: number;
  attacker_frigate_loss: number;
  attacker_armade_loss: number;
  defender_carrier_loss: number;
  defender_scraper_loss: number;
  defender_sparrow_loss: number;
  defender_frigate_loss: number;
  defender_armade_loss: number;
  celestia_loss: number;
  blaster_loss: number;
  beam_loss: number;
  astral_loss: number;
  plasma_loss: number;
  debris_steel: number;
  debris_quartz: number;
};

interface Props {
  planetId: number;
}

const BattleReports = ({ planetId }: Props) => {
  const [battleReports, setBattleReports] = useState([]);
  const [expandedReports, setExpandedReports] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://103.252.117.72:5000/api/battle-reports?planet_id=${planetId}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setBattleReports(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [planetId]);

  const toggleExpand = (id: unknown) => {
    setExpandedReports((prevExpandedReports) => {
      const newExpandedReports = new Set(prevExpandedReports);
      if (newExpandedReports.has(id)) {
        newExpandedReports.delete(id);
      } else {
        newExpandedReports.add(id);
      }
      return newExpandedReports;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header planetId={planetId} />
      <ContentWrapper>
        {battleReports.map((report: FetchData) => (
          <BattleReportContainer key={report.battle_id}>
            <BattleReportHeader onClick={() => toggleExpand(report.battle_id)}>
              <span>NoGame Battle {report.battle_id}</span>
              <span>
                {new Date(report.time).toLocaleString()} - {report.attacker} vs{" "}
                {report.defender}
              </span>
            </BattleReportHeader>
            <BattleReportDetails
              className={
                expandedReports.has(report.battle_id) ? "expanded" : ""
              }
            >
              {/* Add details here */}
              <DetailItem>
                {/* Attacker Fleet:{" "}
                <ul>
                  {report.attacker_fleet.carrier > 0 ? (
                    <li>Carrier :{report.attacker_carrier_loss}</li>
                  ) : null}
                  {report.attacker_fleet.scraper > 0 ? (
                    <li>Scraper :{report.attacker_scraper_loss}</li>
                  ) : null}
                  {report.attacker_fleet.sparrow > 0 ? (
                    <li>Sparrow :{report.attacker_sparrow_loss}</li>
                  ) : null}
                  {report.attacker_fleet.frigate > 0 ? (
                    <li>Frigate :{report.attacker_frigate_loss}</li>
                  ) : null}
                  {report.attacker_fleet.armade > 0 ? (
                    <li>Armade :{report.attacker_armade_loss}</li>
                  ) : null}
                </ul>
                Defender Fleet:{" "}
                <ul>
                  {report.attacker_carrier_loss > 0 ? (
                    <li>Carrier :{report.attacker_carrier_loss}</li>
                  ) : null}
                  {report.attacker_scraper_loss > 0 ? (
                    <li>Scraper :{report.attacker_scraper_loss}</li>
                  ) : null}
                  {report.attacker_sparrow_loss > 0 ? (
                    <li>Sparrow :{report.attacker_sparrow_loss}</li>
                  ) : null}
                  {report.attacker_frigate_loss > 0 ? (
                    <li>Frigate :{report.attacker_frigate_loss}</li>
                  ) : null}
                  {report.attacker_armade_loss > 0 ? (
                    <li>Armade :{report.attacker_armade_loss}</li>
                  ) : null}
                </ul> */}
                Attacker Loss:{" "}
                <ul>
                  {report.attacker_carrier_loss > 0 ? (
                    <li>Carrier :{report.attacker_carrier_loss}</li>
                  ) : null}
                  {report.attacker_scraper_loss > 0 ? (
                    <li>Scraper :{report.attacker_scraper_loss}</li>
                  ) : null}
                  {report.attacker_sparrow_loss > 0 ? (
                    <li>Sparrow :{report.attacker_sparrow_loss}</li>
                  ) : null}
                  {report.attacker_frigate_loss > 0 ? (
                    <li>Frigate :{report.attacker_frigate_loss}</li>
                  ) : null}
                  {report.attacker_armade_loss > 0 ? (
                    <li>Armade :{report.attacker_armade_loss}</li>
                  ) : null}
                </ul>
                Defender Loss:{" "}
                <ul>
                  {report.defender_carrier_loss > 0 ? (
                    <li>Carrier :{report.defender_carrier_loss}</li>
                  ) : null}
                  {report.defender_scraper_loss > 0 ? (
                    <li>Scraper :{report.defender_scraper_loss}</li>
                  ) : null}
                  {report.defender_sparrow_loss > 0 ? (
                    <li>Sparrow :{report.defender_sparrow_loss}</li>
                  ) : null}
                  {report.defender_frigate_loss > 0 ? (
                    <li>Frigate :{report.defender_frigate_loss}</li>
                  ) : null}
                  {report.defender_armade_loss > 0 ? (
                    <li>Armade :{report.defender_armade_loss}</li>
                  ) : null}
                </ul>
                Destroyed Defences:{" "}
                <ul>
                  {report.celestia_loss > 0 ? (
                    <li>Celestia :{report.celestia_loss}</li>
                  ) : null}
                  {report.blaster_loss > 0 ? (
                    <li>Blaster :{report.blaster_loss}</li>
                  ) : null}
                  {report.defender_sparrow_loss > 0 ? (
                    <li>Beam :{report.beam_loss}</li>
                  ) : null}
                  {report.defender_frigate_loss > 0 ? (
                    <li>Astral Launcher :{report.astral_loss}</li>
                  ) : null}
                  {report.plasma_loss > 0 ? (
                    <li>Plasma Projector :{report.plasma_loss}</li>
                  ) : null}
                </ul>
              </DetailItem>
              {/* Add all other detail items */}
            </BattleReportDetails>
          </BattleReportContainer>
        ))}
      </ContentWrapper>
    </>
  );
};

export default BattleReports;
