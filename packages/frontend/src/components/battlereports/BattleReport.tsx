/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ContentWrapper = styled.div`
  margin-top: 24px;
  width: 50%;
  margin: 0 auto; // This centers the box
  background-color: #0d1117; // Dark background for terminal effect
  color: #58a6ff; // Light blue color for text
  font-family: "Courier New", Courier, monospace; // Monospaced font for a terminal look
`;

const BattleReportContainer = styled.div`
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #30363d; // Border for each report
`;

const BattleReportHeader = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
  &:hover {
    background: linear-gradient(180deg, #21262d 0%, #161b22 100%);
  }
`;

const BattleReportDetails = styled.div`
  background-color: #0d1117;
  padding: 10px;
  position: relative; // Add this to position children absolutely relative to this container
  display: none;
  &.expanded {
    display: block;
  }
`;

const DetailItem = styled.div`
  color: #8b949e; // Grey color for details
  margin-bottom: 5px;
  padding-left: 20px; // Indentation for readability
`;

const CopyButton = styled.button`
  position: absolute;
  top: 10px; // Adjust as necessary
  right: 10px; // Adjust as necessary
  // Add more styling here as per your design
`;

const CenteredMessage = styled.div`
  text-align: center; // Center the text horizontally
  margin-top: 50px; // Add some space at the top
  color: #58a6ff; // Use the same light blue color for consistency
  font-size: 24px; // Larger font size for visibility
`;

type Fleet = {
  armade: number;
  carrier: number;
  frigate: number;
  scraper: number;
  sparrow: number;
};

type Defences = {
  beam: number;
  astral: number;
  plasma: number;
  blaster: number;
  celestia: number;
};

type Loot = {
  steel: number;
  quartz: number;
  tritium: number;
};

type Debris = {
  steel: number;
  quartz: number;
};

type FetchData = {
  battle_id: number;
  time: string;
  attacker_planet_id: number;
  attacker_position: {
    orbit: number;
    system: number;
  };
  attacker_initial_fleet: Fleet;
  attacker_fleet_loss: Fleet;
  defender_planet_id: number;
  defender_position: {
    orbit: number;
    system: number;
  };
  defender_initial_fleet: Fleet;
  defender_fleet_loss: Fleet;
  initial_defences: Defences;
  defences_loss: Defences;
  loot: Loot;
  debris: Debris;
};

interface Props {
  planetId: number;
}

const BattleReports = ({ planetId }: Props) => {
  const [battleReports, setBattleReports] = useState<FetchData[]>([]);
  const [expandedReports, setExpandedReports] = useState<Set<number>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.no-game.xyz/api/battle-reports?planet_id=${planetId}`
        );
        if (!response.ok) {
          setError("No Battle Reports to show");
          setBattleReports([]);
        } else {
          const data = await response.json();
          // Sort data by most recent first
          data.sort(
            (
              a: { time: string | number | Date },
              b: { time: string | number | Date }
            ) => new Date(b.time).getTime() - new Date(a.time).getTime()
          );
          setBattleReports(data);
        }
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

    if (planetId !== undefined) {
      fetchData();
    }
  }, [planetId]);

  const toggleExpand = (id: number) => {
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
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (battleReports.length === 0) {
    return <CenteredMessage>No Battle Reports Available</CenteredMessage>;
  }

  const copyToClipboard = (report: FetchData) => {
    const formatFleetComposition = (fleet: Fleet) => {
      return (
        Object.entries(fleet)
          .filter(([_, quantity]) => quantity > 0)
          .map(
            ([type, quantity]) =>
              `- ${type.charAt(0).toUpperCase() + type.slice(1)}: ${quantity}`
          )
          .join("\n") || "- No active fleet units detected."
      );
    };

    const formatDefences = (defences: Defences) => {
      return (
        Object.entries(defences)
          .filter(([_, quantity]) => quantity > 0)
          .map(
            ([type, quantity]) =>
              `- ${type.charAt(0).toUpperCase() + type.slice(1)}: ${quantity}`
          )
          .join("\n") || "- No defenses were present."
      );
    };

    const formatLoot = (loot: Loot) => {
      return (
        Object.entries(loot)
          .filter(([_, quantity]) => quantity > 0)
          .map(
            ([resourceType, quantity]) =>
              `- ${
                resourceType.charAt(0).toUpperCase() + resourceType.slice(1)
              }: ${quantity}`
          )
          .join("\n") || "- None"
      );
    };

    const formatDebris = (loot: Debris) => {
      return (
        Object.entries(loot)
          .filter(([_, quantity]) => quantity > 0)
          .map(
            ([resourceType, quantity]) =>
              `- ${
                resourceType.charAt(0).toUpperCase() + resourceType.slice(1)
              }: ${quantity}`
          )
          .join("\n") || "- None"
      );
    };

    const formatCasualties = (losses: Fleet) => {
      return (
        Object.entries(losses)
          .filter(([_, quantity]) => quantity > 0)
          .map(
            ([fleetType, quantity]) =>
              `${quantity} ${
                fleetType.charAt(0).toUpperCase() + fleetType.slice(1)
              }`
          )
          .join(", ") || "None"
      );
    };

    const formatReportForDiscord = (report: FetchData) => {
      let formattedReport = `**Battle Report ID**: [${report.battle_id}]\n`;
      formattedReport += `**Timestamp**: [${new Date(
        report.time
      ).toLocaleString()}]\n`;
      formattedReport += `**Operational Summary**:\n`;
      formattedReport += `- Attacking Planet: System ${report.attacker_position.system} Orbit ${report.attacker_position.orbit}\n`;
      formattedReport += `- Defending Planet: System ${report.defender_position.system} Orbit ${report.defender_position.orbit}\n`;
      formattedReport += `**Attacker Fleet Composition**:\n${formatFleetComposition(
        report.attacker_initial_fleet
      )}\n`;
      formattedReport += `**Defender Fleet Composition**:\n${formatFleetComposition(
        report.defender_initial_fleet
      )}\n`;
      formattedReport += `**Defender Planetary Defenses**:\n${formatDefences(
        report.initial_defences
      )}\n`;
      formattedReport += `**Casualty and Damage Report**:\n`;
      formattedReport += `- Attacker Losses: ${formatCasualties(
        report.attacker_fleet_loss
      )}\n`;
      formattedReport += `- Defender Losses: ${formatCasualties({
        ...report.defender_fleet_loss,
        ...report.defences_loss,
      })}\n`;
      formattedReport += `**Resource Acquisition**:\n${formatLoot(
        report.loot
      )}\n`;
      formattedReport += `**Post-Combat Assessment**:\n`;
      formattedReport += `- Outcome: ${
        Object.values(report.loot).some((value) => value > 0)
          ? "Decisive Attacker Victory"
          : "Attacker Defeat"
      }\n`;
      formattedReport += `- Debris Analysis: ${formatDebris(report.debris)}`;

      return formattedReport;
    };

    const formattedReport = formatReportForDiscord(report);

    navigator.clipboard
      .writeText(formattedReport)
      .then(() => {
        alert("Battle report copied to clipboard");
      })
      .catch((err) => {
        console.error("Error in copying text: ", err);
        alert("Failed to copy report");
      });
  };

  return (
    <>
      <ContentWrapper>
        {battleReports.map((report) => (
          <BattleReportContainer key={report.battle_id}>
            <BattleReportHeader
              onClick={() =>
                typeof report.battle_id === "number" &&
                toggleExpand(report.battle_id)
              }
            >
              <span>Battle Report: {report.battle_id}</span>
              <span>{new Date(report.time).toLocaleString()}</span>
            </BattleReportHeader>
            <BattleReportDetails
              className={
                expandedReports.has(report.battle_id) ? "expanded" : ""
              }
            >
              <Tooltip title="Copy to clipboard">
                <CopyButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the collapsing of the report
                    copyToClipboard(report);
                  }}
                >
                  <ContentCopyIcon />
                </CopyButton>
              </Tooltip>
              {/* Display the military-style narrative of the battle */}
              <DetailItem>Battle Report ID: [{report.battle_id}]</DetailItem>
              <DetailItem>
                Timestamp: [{new Date(report.time).toLocaleString()}]
              </DetailItem>

              <DetailItem>Operational Summary:</DetailItem>
              <DetailItem>
                - Attacking Planet: System {report.attacker_position.system}{" "}
                Orbit {report.attacker_position.orbit}
              </DetailItem>
              <DetailItem>
                - Defending Planet: System {report.defender_position.system}{" "}
                Orbit {report.defender_position.orbit}
              </DetailItem>

              <DetailItem>Attacker Fleet Composition:</DetailItem>
              {Object.entries(report.attacker_initial_fleet)
                .filter(([_, quantity]) => quantity > 0)
                .map(([fleetType, quantity]) => (
                  <DetailItem key={fleetType}>
                    - {fleetType.charAt(0).toUpperCase() + fleetType.slice(1)}:{" "}
                    {quantity}
                  </DetailItem>
                ))}

              <DetailItem>Defender Fleet Composition:</DetailItem>
              {Object.entries(report.defender_initial_fleet).filter(
                ([_, quantity]) => quantity > 0
              ).length > 0 ? (
                Object.entries(report.defender_initial_fleet)
                  .filter(([_, quantity]) => quantity > 0)
                  .map(([defenceType, quantity]) => (
                    <DetailItem key={defenceType}>
                      -{" "}
                      {defenceType.charAt(0).toUpperCase() +
                        defenceType.slice(1)}
                      : {quantity}
                    </DetailItem>
                  ))
              ) : (
                <DetailItem>- No active fleet units detected.</DetailItem>
              )}

              <DetailItem>Defender Planetary Defenses:</DetailItem>
              {Object.entries(report.initial_defences).filter(
                ([_, quantity]) => quantity > 0
              ).length > 0 ? (
                Object.entries(report.initial_defences)
                  .filter(([_, quantity]) => quantity > 0)
                  .map(([defenceType, quantity]) => (
                    <DetailItem key={defenceType}>
                      -{" "}
                      {defenceType.charAt(0).toUpperCase() +
                        defenceType.slice(1)}
                      : {quantity}
                    </DetailItem>
                  ))
              ) : (
                <DetailItem>- No defenses were present.</DetailItem>
              )}

              <DetailItem>Casualty and Damage Report:</DetailItem>
              <DetailItem>
                - Attacker Losses:{" "}
                {Object.entries(report.attacker_fleet_loss)
                  .filter(([_, quantity]) => quantity > 0)
                  .map(
                    ([fleetType, quantity]) =>
                      `${quantity} ${
                        fleetType.charAt(0).toUpperCase() + fleetType.slice(1)
                      }`
                  )
                  .join(", ") || "None"}
              </DetailItem>
              <DetailItem>
                - Defender Losses:{" "}
                {Object.entries({
                  ...report.defender_fleet_loss,
                  ...report.defences_loss,
                })
                  .filter(([_, quantity]) => quantity > 0)
                  .map(
                    ([fleetType, quantity]) =>
                      `${quantity} ${
                        fleetType.charAt(0).toUpperCase() + fleetType.slice(1)
                      }`
                  )
                  .join(", ") || "None"}
              </DetailItem>

              <DetailItem>Resource Acquisition:</DetailItem>
              {Object.values(report.loot).some((quantity) => quantity > 0) ? (
                Object.entries(report.loot)
                  .filter(([_, quantity]) => quantity > 0)
                  .map(([resourceType, quantity]) => (
                    <DetailItem key={resourceType}>
                      -{" "}
                      {resourceType.charAt(0).toUpperCase() +
                        resourceType.slice(1)}
                      : {quantity}
                    </DetailItem>
                  ))
              ) : (
                <DetailItem>- None</DetailItem>
              )}

              <DetailItem>Post-Combat Assessment:</DetailItem>
              <DetailItem>
                - Outcome:{" "}
                {Object.values(report.loot).some((value) => value > 0)
                  ? "Decisive Attacker Victory"
                  : "Attacker Defeat"}{" "}
                {/* Updated logic for determining the outcome */}
              </DetailItem>
              <DetailItem>
                - Debris Analysis:{" "}
                {Object.entries(report.debris)
                  .filter(([_, quantity]) => quantity > 0)
                  .map(
                    ([resourceType, quantity]) =>
                      `${
                        resourceType.charAt(0).toUpperCase() +
                        resourceType.slice(1)
                      }: ${quantity}`
                  )
                  .join(", ") || "No debris field generated post-engagement."}
              </DetailItem>
            </BattleReportDetails>
          </BattleReportContainer>
        ))}
      </ContentWrapper>
    </>
  );
};

export default BattleReports;
