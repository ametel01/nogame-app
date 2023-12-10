import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
`;

const Header = styled.th`
  background-color: #1a2025;
  color: white;
  padding: 10px;
  opacity: 0.5;
`;

type RowProps = {
  isHighlighted: boolean;
};

const Row = styled.tr<RowProps>`
  background-color: ${(props) =>
    props.isHighlighted ? "#32414B" : "transparent"};
  color: #98fb98;
`;

const Data = styled.td`
  padding: 10px;
  color: "#98fb98";
`;

const Wrapper = styled.div`
  padding: 20px;
`;

type FetchData = {
  planet_id: number;
  account: string;
  net_amount: number;
};

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
        const response = await fetch("http://localhost:3001/api/tech");
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default LeadearBoardTech;
