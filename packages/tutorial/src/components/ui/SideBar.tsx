import styled from "styled-components";
import WalletHeader from "./WalletHeader";
import LogoAndRankContainer from "./LogoutAndRankContainer";
import ResourcesContainer from "./ResourcesContainer";
import { UseCollectResources } from "../buttons/CollectResources";
import { TutorialProps } from "../../shared/types";

const BodyContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #1a2025;
`;

const SideBar = ({
  planetId,
  account,
  spendableResources,
  collectibleResources,
  energyAvailable,
  energyFromCelestia,
}: TutorialProps) => {
  // console.log("SideBar", spendableResources);
  return (
    <BodyContainer>
      <WalletHeader account={account} />
      <LogoAndRankContainer planetId={planetId} />
      <ResourcesContainer
        planetId={planetId}
        spendableResources={spendableResources}
        collectibleResources={collectibleResources}
        energyAvailable={energyAvailable}
        energyFromCelestia={energyFromCelestia}
      />
      <UseCollectResources />
    </BodyContainer>
  );
};

export default SideBar;
