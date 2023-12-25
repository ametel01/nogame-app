import { useAccount } from "@starknet-react/core";
import { useTokenOf } from "../hooks/useTokenOf";
import BattleReports from "../components/battlereports/BattleReport";
import Header from "../components/ui/Header";

const BattleReportsPage = () => {
  const { address } = useAccount();
  const { planetId } = useTokenOf(address);

  return (
    <>
      <Header planetId={planetId} />
      <BattleReports planetId={planetId} />
    </>
  );
};

export default BattleReportsPage;
