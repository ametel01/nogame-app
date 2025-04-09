import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";
import { Call } from "starknet";
import { SingleCall, CallType } from "../multicall/MultiCallTransaction";
import { getColonyUpgradeType, getUpgradeNameById } from "../shared/types";
import { useContract } from "@starknet-react/core";
import {
  COLONYADDRESS,
  COMPOUNDADDRESS,
  TECHADDRESS,
  DOCKYARDADDRESS,
} from "../constants/addresses";
import { getUpgradeType, getBuildType } from "../shared/types";
import { getColonyBuildType } from "../shared/types/index";
import type { Abi } from "starknet";

// Define ABIs directly
const compoundAbi = [
  {
    type: "function",
    name: "process_compound_upgrade",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::CompoundUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

const techAbi = [
  {
    type: "function",
    name: "process_tech_upgrade",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::TechUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

const dockyardAbi = [
  {
    type: "function",
    name: "process_ship_build",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::ShipBuildType",
      },
      {
        name: "quantity",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "process_defence_build",
    inputs: [
      {
        name: "component",
        type: "nogame::libraries::types::DefenceBuildType",
      },
      {
        name: "quantity",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

const colonyAbi = [
  {
    type: "function",
    name: "process_colony_compound_upgrade",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
      {
        name: "name",
        type: "nogame::libraries::types::ColonyUpgradeType",
      },
      {
        name: "quantity",
        type: "core::integer::u8",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "process_colony_unit_build",
    inputs: [
      {
        name: "colony_id",
        type: "core::integer::u8",
      },
      {
        name: "name",
        type: "nogame::libraries::types::ColonyBuildType",
      },
      {
        name: "quantity",
        type: "core::integer::u32",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;

interface BlockchainCallContextProps {
  selectedCalls: Call[];
  singleCalls: SingleCall[];
  addCall: (
    callType: CallType,
    unitName: number,
    quantity: number,
    colonyId: number,
  ) => void;
  removeCall: (index: number) => void;
  setSelectedCalls: (calls: Call[]) => void;
  setSingleCalls: (calls: SingleCall[]) => void;
  // ... other functions and states
}

const defaultContextValue: BlockchainCallContextProps = {
  selectedCalls: [],
  singleCalls: [],
  addCall: () => {},
  removeCall: () => {},
  setSelectedCalls: () => {},
  setSingleCalls: () => {},
};

const BlockchainCallContext =
  createContext<BlockchainCallContextProps>(defaultContextValue);

export const BlockchainCallProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [selectedCalls, setSelectedCalls] = useState<Call[]>([]);
  const [singleCalls, setSingleCalls] = useState<SingleCall[]>([]);

  const { contract: compoundContract } = useContract({
    abi: compoundAbi,
    address: COMPOUNDADDRESS,
  });

  const { contract: techContract } = useContract({
    abi: techAbi,
    address: TECHADDRESS,
  });

  const { contract: dockyardContract } = useContract({
    abi: dockyardAbi,
    address: DOCKYARDADDRESS,
  });

  const { contract: colonyContract } = useContract({
    abi: colonyAbi,
    address: COLONYADDRESS,
  });

  const createCall = (
    callType: CallType,
    unitName: number,
    quantity: number,
    colonyId: number,
  ): Call => {
    switch (callType) {
      case "compound":
        if (colonyId == 0) {
          return compoundContract?.populateTransaction[
            "process_compound_upgrade"
          ]!(getUpgradeType(unitName)!, quantity) as Call;
        }
        return colonyContract?.populateTransaction[
          "process_colony_compound_upgrade"
        ]!(colonyId, getColonyUpgradeType(unitName)!, quantity) as Call;
      case "tech":
        // Tech upgrades are only available for the mother planet
        return techContract?.populateTransaction["process_tech_upgrade"]!(
          getUpgradeType(unitName)!,
          quantity,
        ) as Call;
      case "ship":
        if (colonyId == 0) {
          return dockyardContract?.populateTransaction["process_ship_build"]!(
            getBuildType(unitName)!,
            quantity,
          ) as Call;
        }
        return colonyContract?.populateTransaction[
          "process_colony_unit_build"
        ]!(colonyId, getColonyBuildType(unitName)!, quantity) as Call;
      case "defence":
        if (colonyId == 0) {
          return dockyardContract?.populateTransaction[
            "process_defence_build"
          ]!(getBuildType(unitName)!, quantity) as Call;
        }
        return colonyContract?.populateTransaction[
          "process_colony_unit_build"
        ]!(colonyId, getColonyBuildType(unitName)!, quantity) as Call;
      default:
        throw new Error("Invalid call type");
    }
  };

  const addCall = (
    callType: CallType,
    unitName: number,
    quantity: number,
    colonyId: number,
  ) => {
    const call = createCall(callType as CallType, unitName, quantity, colonyId);
    setSelectedCalls([...selectedCalls, call]);

    const singleCall: SingleCall = {
      type: callType,
      name:
        callType == "compound" || callType == "tech"
          ? getUpgradeNameById(unitName, false)
          : getUpgradeNameById(unitName, true),
      quantity: quantity,
      colonyId: colonyId,
    };
    setSingleCalls([...singleCalls, singleCall]);
  };

  const removeCall = useCallback((indexToRemove: number) => {
    setSingleCalls((currentCalls) =>
      currentCalls.filter((_, index) => index !== indexToRemove),
    );
    setSelectedCalls((currentCalls) =>
      currentCalls.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  // ... other functions and states

  return (
    <BlockchainCallContext.Provider
      value={{
        selectedCalls,
        setSelectedCalls,
        singleCalls,
        setSingleCalls,
        addCall,
        removeCall,
      }}
    >
      {children}
    </BlockchainCallContext.Provider>
  );
};

export const useBlockchainCall = () => useContext(BlockchainCallContext);
