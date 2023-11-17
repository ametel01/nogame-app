import { useAccount } from "@starknet-react/core";
import { useTokenOf } from "../hooks/useTokenOf";
import BattleReports from "../components/battlereports/BattleReport";

const BattleReportsPage = () => {
  const { address } = useAccount();
  const { planetId } = useTokenOf(address);

  return <BattleReports planetId={planetId} />;
};

export default BattleReportsPage;
