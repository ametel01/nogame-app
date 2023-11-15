// src/pages/LeaderboardPage.tsx
import LeadearBoardFleet from "../components/leaderboards/LeaderBoardFleet";
import LeadearBoardMain from "../components/leaderboards/LeaderBoardMain";
import LeadearBoardTech from "../components/leaderboards/LeaderBoardTech";
import Header from "../components/ui/Header";
import styled from "styled-components";
import { useAccount } from "@starknet-react/core";
import { useTokenOf } from "../hooks/useTokenOf";

const LeaderboardPageWrapper = styled.div`
  display: flex;
  height: 100vh; // Adjust the height as needed
`;

const Column = styled.div`
  flex: 1;
  overflow-y: auto; // If you want each column to independently scroll
  padding: 20px;
`;

const LeaderboardSection = styled.section`
  background-color: #1a2025;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  boxshadow: "0 4px 8px rgba(0, 0, 0, 0.1)";
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const GeneralLeaderboardPage = () => {
  const { address } = useAccount();
  const { planetId } = useTokenOf(address);

  const MainLeaderboard = () => <LeadearBoardMain planetId={planetId} />;
  const TechLeaderboard = () => <LeadearBoardTech planetId={planetId} />;
  const FleetLeaderboard = () => <LeadearBoardFleet planetId={planetId} />;

  return (
    <>
      <Header planetId={planetId} />
      <LeaderboardPageWrapper>
        <Column>
          <LeaderboardSection>
            <Title>Main Leaderboard</Title>
            <MainLeaderboard />
          </LeaderboardSection>
        </Column>
        <Column>
          <LeaderboardSection>
            <Title>Tech Leaderboard</Title>
            <TechLeaderboard />
          </LeaderboardSection>
        </Column>
        <Column>
          <LeaderboardSection>
            <Title>Fleet Leaderboard</Title>
            <FleetLeaderboard />
          </LeaderboardSection>
        </Column>
      </LeaderboardPageWrapper>
    </>
  );
};

export default GeneralLeaderboardPage;
