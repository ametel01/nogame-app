import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
`;

const LeaderboardHeader = styled.th`
  background-color: #1a2025;
  color: white;
  padding: 10px;
  opacity: 0.5;
`;

type LeaderboardRowProps = {
  isHighlighted: boolean;
};

// Use the type in your styled component with the correct syntax
const LeaderboardRow = styled.tr<LeaderboardRowProps>`
  background-color: ${(props) =>
    props.isHighlighted ? "#32414B" : "transparent"};
  color: #98fb98;
`;

const LeaderboardData = styled.td`
  padding: 10px;
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

const LeadearBoardTech = ({ planetId }: Props) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/api/tech");
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

  // Render logic...
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(isLoading);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <LeaderboardWrapper>
      <LeaderboardTable>
        <thead>
          <tr>
            <LeaderboardHeader>Rank</LeaderboardHeader>
            <LeaderboardHeader>Player</LeaderboardHeader>
            <LeaderboardHeader>Planet</LeaderboardHeader>
            <LeaderboardHeader>Points</LeaderboardHeader>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry: FetchData, index: number) => (
            <LeaderboardRow
              key={entry.planet_id}
              isHighlighted={entry.planet_id === Number(planetId)}
            >
              <LeaderboardData>{index + 1}</LeaderboardData>
              <LeaderboardData>
                {entry.account.substring(0, 6)}...
                {entry.account.substring(entry.account.length - 4)}
              </LeaderboardData>
              <LeaderboardData>{entry.planet_id}</LeaderboardData>
              <LeaderboardData>
                {Math.round(entry.net_amount / 1000)}
              </LeaderboardData>
            </LeaderboardRow>
          ))}
        </tbody>
      </LeaderboardTable>
    </LeaderboardWrapper>
  );
};

export default LeadearBoardTech;
