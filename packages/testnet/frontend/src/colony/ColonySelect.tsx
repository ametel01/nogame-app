import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useGetPlanetColonies } from '../hooks/ColoniesHooks';
import { ColonyArray } from '../hooks/ColoniesHooks';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

interface Props {
  planetId: number;
  selectedColonyId: string | number;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
}

const selectStyles = {
  color: 'white',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px 0',
    '& .MuiSelect-select': {
      padding: '8px',
      borderRadius: '4px',
      background: '#1c242c',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2a3f55',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3b506a',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4c6a8e',
    },
  },
};

const menuProps = {
  PaperProps: {
    style: {
      backgroundColor: '#1c242c', // Set the background color for the dropdown menu
      color: 'white', // Set the text color for the dropdown menu
      // Add any additional styles for the dropdown menu here
    },
  },
};

const ColonySelect = ({ planetId, selectedColonyId, handleChange }: Props) => {
  const coloniesArray: ColonyArray = useGetPlanetColonies(planetId);

  const menuItems = Array.isArray(coloniesArray)
    ? coloniesArray.map((colony, index) => {
        const colonyId = colony[0];
        return (
          <MenuItem key={index} value={colonyId.toString()}>
            Colony {colonyId.toString()}
          </MenuItem>
        );
      })
    : [];

  const defaultOption = (
    <MenuItem key="default-option" value="0">
      Mother Planet
    </MenuItem>
  );

  return (
    <Box>
      <FormControl fullWidth>
        <Select
          labelId="planet-select-label"
          id="planet-select"
          value={selectedColonyId.toString()}
          onChange={handleChange}
          sx={selectStyles}
          MenuProps={menuProps}
          autoWidth
        >
          {defaultOption}
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ColonySelect;
