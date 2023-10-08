import styled from "@emotion/styled";
import { AutoColumn } from "../../shared/styled/Column";
import { AutoRow } from "../Row";

export type Status = "idle" | "error" | "loading" | "success";

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
  align-items: flex-start;
`;

const StatusHeader = styled.div<{ success: boolean; pending: boolean }>`
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: ${({ pending, success }) =>
    pending ? "#5287FF" : success ? "green" : "red"};
`;
const TxSummary = styled.div`
  font-size: 12px;
  font-weight: normal;
  line-height: 120%;
  color: #222;
`;

export default function TransactionPopup({
  hash,
  status,
  summary,
}: {
  hash: string;
  status?: Status;
  summary?: string;
}) {
  // const { chainId } = useActiveStarknetReact()

  const getStatusHeader = (status: Status) => {
    switch (status) {
      // case 'RECEIVED':
      //   return 'Submitted'
      case "loading":
        return "Loading";
      case "error":
        return "Error";
      case "success":
        return "Success";
      default:
        return "Submitted";
    }
  };

  const pending = !status || status === "loading" || status === "success";
  const success = !pending && status !== "error";

  return (
    <RowNoFlex>
      <AutoColumn gap="8px" style={{ marginTop: "1px" }}>
        <AutoRow>
          <StatusHeader
            style={{ paddingRight: 16 }}
            success={success}
            pending={pending}
          >
            {status
              ? `Transaction ${getStatusHeader(status)}`
              : `Transaction Submitted`}
          </StatusHeader>
        </AutoRow>
        <AutoColumn gap="12px">
          <TxSummary>
            {summary ??
              "Hash: " + hash.slice(0, 8) + "..." + hash.slice(58, 65)}
          </TxSummary>
        </AutoColumn>
      </AutoColumn>
    </RowNoFlex>
  );
}
