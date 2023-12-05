import styled from "styled-components";
import SideBar from "../components/ui/SideBar";
import { PlanetSection } from "../components/ui/PlanetSection";
import { ResourcesSection } from "../panels";

export const GameContainer = styled.div`
  display: grid;
  grid-template-rows: 34% auto;
  justify-items: center;
  align-items: center;
  height: 100%;
  max-height: 100vh;
  flex: 5;
`;

export const DashboardMainContainer = styled.div`
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-items: center;
  border: 2px solid #151a1e;
  align-items: stretch;
`;

export const DashboardSubBodyContainer = styled.section<{ border?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-items: center;
  height: 100%;
  width: 100%;
  background-color: #151a1e;
`;

interface Props {
  planetId: number;
}

export default function Dashboard({ planetId }: Props) {
  return (
    <DashboardMainContainer>
      <SideBar planetId={planetId} />
      <GameContainer>
        <DashboardSubBodyContainer>
          <PlanetSection planetId={planetId} />
        </DashboardSubBodyContainer>
        <DashboardSubBodyContainer>
          <ResourcesSection planetId={planetId} />
        </DashboardSubBodyContainer>
      </GameContainer>
    </DashboardMainContainer>
  );
}
