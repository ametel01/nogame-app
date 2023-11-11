import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)`
  color: #f8f8ff;
`;

export function SteelTable() {
  const rows = [
    {
      level: 0,
      steelCost: 0,
      quartzCost: 0,
      energyUse: 0,
      productionPerHour: 30,
    },
    {
      level: 1,
      steelCost: 60,
      quartzCost: 15,
      energyUse: 11,
      productionPerHour: 33,
    },
    {
      level: 2,
      steelCost: 90,
      quartzCost: 22,
      energyUse: 25,
      productionPerHour: 72,
    },
    {
      level: 3,
      steelCost: 135,
      quartzCost: 33,
      energyUse: 40,
      productionPerHour: 119,
    },
    {
      level: 4,
      steelCost: 202,
      quartzCost: 50,
      energyUse: 59,
      productionPerHour: 175,
    },
    {
      level: 5,
      steelCost: 303,
      quartzCost: 75,
      energyUse: 81,
      productionPerHour: 241,
    },
    {
      level: 6,
      steelCost: 455,
      quartzCost: 113,
      energyUse: 107,
      productionPerHour: 318,
    },
    {
      level: 7,
      steelCost: 683,
      quartzCost: 170,
      energyUse: 137,
      productionPerHour: 409,
    },
    {
      level: 8,
      steelCost: 1025,
      quartzCost: 256,
      energyUse: 172,
      productionPerHour: 514,
    },
    {
      level: 9,
      steelCost: 1537,
      quartzCost: 384,
      energyUse: 213,
      productionPerHour: 636,
    },
    {
      level: 10,
      steelCost: 2306,
      quartzCost: 576,
      energyUse: 260,
      productionPerHour: 778,
    },
    {
      level: 11,
      steelCost: 3459,
      quartzCost: 864,
      energyUse: 314,
      productionPerHour: 941,
    },
    {
      level: 12,
      steelCost: 5189,
      quartzCost: 1297,
      energyUse: 377,
      productionPerHour: 1129,
    },
    {
      level: 13,
      steelCost: 7784,
      quartzCost: 1946,
      energyUse: 449,
      productionPerHour: 1346,
    },
    {
      level: 14,
      steelCost: 11677,
      quartzCost: 2919,
      energyUse: 532,
      productionPerHour: 1594,
    },
    {
      level: 15,
      steelCost: 17515,
      quartzCost: 4378,
      energyUse: 627,
      productionPerHour: 1879,
    },
    {
      level: 16,
      steelCost: 26273,
      quartzCost: 6568,
      energyUse: 736,
      productionPerHour: 2205,
    },
    {
      level: 17,
      steelCost: 39410,
      quartzCost: 9852,
      energyUse: 860,
      productionPerHour: 2577,
    },
    {
      level: 18,
      steelCost: 59115,
      quartzCost: 14778,
      energyUse: 1001,
      productionPerHour: 3002,
    },
    {
      level: 19,
      steelCost: 88673,
      quartzCost: 22168,
      energyUse: 1163,
      productionPerHour: 3486,
    },
    {
      level: 20,
      steelCost: 133010,
      quartzCost: 33252,
      energyUse: 1346,
      productionPerHour: 4036,
    },
  ];

  return (
    <Box my={2}>
      <Typography
        variant="h6"
        style={{ color: "#F8F8FF", marginBottom: "8px" }}
      >
        Resource Stat Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Level</StyledTableCell>
              <StyledTableCell>Steel Cost</StyledTableCell>
              <StyledTableCell>Quartz Cost</StyledTableCell>
              <StyledTableCell>Energy Use</StyledTableCell>
              <StyledTableCell>Production (Hourly)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.level}>
                <StyledTableCell>{row.level}</StyledTableCell>
                <StyledTableCell>{row.steelCost}</StyledTableCell>
                <StyledTableCell>{row.quartzCost}</StyledTableCell>
                <StyledTableCell>{row.energyUse}</StyledTableCell>
                <StyledTableCell>{row.productionPerHour}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SteelTable;
