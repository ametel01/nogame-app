import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { CenteredProgress } from "./LeaderBoardMain";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
`;

const Header = styled.th`
  background-color: #1a2025;
  padding: 10px;
  opacity: 0.5;
`;

type RowProps = {
  isHighlighted: boolean;
};

// Use the type in your styled component with the correct syntax
const Row = styled.tr<RowProps>`
  background-color: ${(props) =>
    props.isHighlighted ? "#32414B" : "transparent"};
  color: #98fb98;
`;

const Data = styled.td`
  padding: 10px;
  // border-bottom: 1px solid #ddd;
  color: "#98fb98";
`;

type FetchData = {
  planet_id: number;
  account: string;
  net_amount: number;
};
const LeaderboardWrapper = styled.div`
  padding: 20px;
`;

interface Props {
  planetId: number;
}

const LeadearBoardFleet = ({ planetId }: Props) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api.no-game.xyz/api/fleet");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setLeaderboard(data);
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
  }, []);

  if (isLoading) {
    return (
      <CenteredProgress>
        <CircularProgress />
      </CenteredProgress>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <LeaderboardWrapper>
      <Table>
        <thead>
          <tr>
            <Header>Rank</Header>
            <Header>Player</Header>
            <Header>Planet</Header>
            <Header>Points</Header>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry: FetchData, index: number) => (
            <Row
              key={entry.planet_id}
              isHighlighted={entry.planet_id === Number(planetId)}
            >
              <Data>{index + 1}</Data>
              <Data>
                {entry.account
                  ? `${entry.account.substring(
                      0,
                      6
                    )}...${entry.account.substring(entry.account.length - 4)}`
                  : "Unknown Account"}
              </Data>
              <Data>{entry.planet_id}</Data>
              <Data>{Math.round(Number(entry.net_amount) / 1000)}</Data>
            </Row>
          ))}
        </tbody>
      </Table>
    </LeaderboardWrapper>
  );
};

export default LeadearBoardFleet;
