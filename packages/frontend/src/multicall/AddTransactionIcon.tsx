import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from 'styled-components';
import { useBlockchainCall } from '../context/BlockchainCallContext'; // adjust the path as necessary

type CallType = 'compound' | 'tech' | 'ship' | 'defence'; // adjust as necessary

interface AddTransactionIconProps {
  callType: CallType;
  unitName: number;
  quantity: number;
  disabled: boolean;
  colonyId: number;
}

const StyledAddCircleIcon = styled(AddCircleIcon)<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ disabled }) =>
    disabled ? '#bdbdbd' : '#4caf50'}; // Gray when disabled, green otherwise
  &:hover {
    color: ${({ disabled }) => (disabled ? '#bdbdbd' : '#66bb6a')};
  }
  transition: color 0.3s ease;
`;

const AddTransactionIcon: React.FC<AddTransactionIconProps> = ({
  callType,
  unitName,
  quantity,
  disabled,
  colonyId,
}) => {
  const { addCall } = useBlockchainCall();

  const handleAddTransaction = () => {
    if (!disabled) {
      addCall(callType, unitName, quantity, colonyId);
    }
  };

  return (
    <StyledAddCircleIcon onClick={handleAddTransaction} disabled={disabled} />
  );
};

export default AddTransactionIcon;
