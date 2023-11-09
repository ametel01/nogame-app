import styled from "styled-components";
import SideBar from "../components/ui/SideBar";
import { PlanetSection } from "../components/ui/PlanetSection";
import { ResourcesSection } from "../panels";

const GameContainer = styled.div`
  display: grid;
  grid-template-rows: 34% auto;
  justify-items: center;
  align-items: center;
  height: 100%;
  max-height: 100vh;
  flex: 5;
`;

const MainContainer = styled.div`
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-items: center;
  border: 2px solid black;
  align-items: stretch;
`;

const SubBodyContainer = styled.section<{ border?: boolean }>`
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
    <MainContainer>
      <SideBar planetId={planetId} />
      <GameContainer>
        <SubBodyContainer>
          <PlanetSection planetId={planetId} />
        </SubBodyContainer>
        <SubBodyContainer>
          <ResourcesSection planetId={planetId} />
        </SubBodyContainer>
      </GameContainer>
    </MainContainer>
  );
}
