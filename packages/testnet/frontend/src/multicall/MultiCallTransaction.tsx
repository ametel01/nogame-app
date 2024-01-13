import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useContractWrite, useContract } from '@starknet-react/core';
import {
  getBuildType,
  getUpgradeNameById,
  getUpgradeType,
} from '../shared/types';
import game from '../constants/nogame.json';
import { GAMEADDRESS } from '../constants/addresses';
import { Call } from 'starknet';
import { CallTypeSelector } from './CallTypeSelector';
import {
  FlexContainer,
  StyledBox,
  StyledUl,
} from '../components/buttons/ButtonAttackPlanet';
import { HeaderButton } from '../shared/styled/Button';
import Modal from '@mui/material/Modal';
import { StyledButton } from '../shared/styled/Button';

const StyledModal = styled(Modal)`
  display: flex;
  overflow: hidden;
`;

const StyledModalContent = styled(StyledBox)`
  background-color: #263238; // Dark grey, the main color of the modal background
  color: #cfd8dc; // Light grey text for visibility
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
`;

const StyledActionList = styled(StyledUl)`
  list-style: none;
  padding: 0;
`;

const StyledActionItem = styled.li`
  background-color: #263238; // Darker grey for items
  color: #cfd8dc; // Light grey text to match the FormControl
  border: 1px solid #607d8b;
  font-size: 16px;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
`;

const ActionTitle = styled.div`
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
`;

export type CallType = 'compound' | 'tech' | 'ship' | 'defence';

type SingleCall = {
  type: string;
  name: string | undefined;
  quantity: number;
};

export function MultiCallTransaction() {
  const { contract } = useContract({
    abi: game.abi,
    address: GAMEADDRESS,
  });

  const [selectedCalls, setSelectedCalls] = useState<Call[]>([]);
  const [singleCalls, setSingleCalls] = useState<SingleCall[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [tempCallData, setTempCallData] = useState({
    callType: 'compound',
    unitName: 0,
    quantity: 0,
  });

  console.log(singleCalls);

  const handleSelect = (
    callType: CallType,
    unitName: number,
    quantity: number
  ) => {
    setTempCallData({ callType, unitName, quantity });
  };

  const addCall = () => {
    const { callType, unitName, quantity } = tempCallData;
    const call = createCall(callType as CallType, unitName, quantity);
    setSelectedCalls([...selectedCalls, call]);

    const singleCall: SingleCall = {
      type: callType,
      name:
        callType == 'compound' || callType == 'tech'
          ? getUpgradeNameById(unitName, false)
          : getUpgradeNameById(unitName, true),
      quantity: quantity,
    };
    setSingleCalls([...singleCalls, singleCall]);
  };

  const createCall = (
    callType: CallType,
    unitName: number,
    quantity: number
  ): Call => {
    switch (callType) {
      case 'compound':
        return contract?.populateTransaction['process_compound_upgrade']!(
          getUpgradeType(unitName)!,
          quantity
        );
      case 'tech':
        return contract?.populateTransaction['process_tech_upgrade']!(
          getUpgradeType(unitName)!,
          quantity
        );
      case 'ship':
        return contract?.populateTransaction['process_ship_build']!(
          getBuildType(unitName)!,
          quantity
        );
      case 'defence':
        return contract?.populateTransaction['process_defence_build']!(
          getBuildType(unitName)!,
          quantity
        );
      default:
        throw new Error('Invalid call type');
    }
  };

  const { writeAsync } = useContractWrite({ calls: selectedCalls });

  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedCalls([]);
    setSingleCalls([]);
  };

  const toggleModal = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const removeCall = useCallback((indexToRemove: number) => {
    setSingleCalls((currentCalls) =>
      currentCalls.filter((_, index) => index !== indexToRemove)
    );
  }, []);

  return (
    <>
      <HeaderButton onClick={() => toggleModal(true)}>
        MULTI ACTIONS
      </HeaderButton>
      <StyledModal
        open={isOpen}
        onClose={handleModalClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <StyledModalContent>
          <FlexContainer
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <div>
              <StyledUl>
                <ActionTitle>Perform Multiple Actions</ActionTitle>
                <CallTypeSelector onSelect={handleSelect} />
                <div>
                  <StyledButton
                    variant="contained"
                    onClick={addCall}
                    sx={{ marginY: 2 }}
                  >
                    Add Call
                  </StyledButton>
                </div>
                <StyledButton
                  variant="contained"
                  onClick={() => writeAsync()}
                  color="primary"
                >
                  Send Transaction
                </StyledButton>
              </StyledUl>
            </div>
            <div style={{ marginLeft: '24px', alignItems: 'flex-end' }}>
              <StyledActionList>
                {singleCalls.map((call, index) => {
                  const actionText =
                    call.type === 'compound' || call.type === 'tech'
                      ? `Upgrade ${call.name} ${call.quantity} levels`
                      : `Build ${call.quantity} ${call.name}`;

                  return (
                    <StyledActionItem
                      key={index}
                      onClick={() => removeCall(index)}
                    >
                      {`${index + 1}. ${actionText}`}
                    </StyledActionItem>
                  );
                })}
              </StyledActionList>
            </div>
          </FlexContainer>
        </StyledModalContent>
      </StyledModal>
    </>
  );
}
