import styled from "styled-components";
import LogoAndRankContainer from "./LogoutAndRankContainer";
import ResourcesContainer from "./ResourcesContainer";
import { UseCollectResources } from "../buttons/CollectResources";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  background-color: #1a2025;
`;

interface Props {
  planetId: number;
}

const SideBar = ({ planetId }: Props) => {
  return (
    <BodyContainer>
      <LogoAndRankContainer planetId={planetId} />
      <ResourcesContainer planetId={planetId} />
      <UseCollectResources />
    </BodyContainer>
  );
};

export default SideBar;
