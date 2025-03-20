'use client';
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const cellStyle = {
  fontWeight: "bold",
  color: "white",
  backgroundColor: "#1976d2",
  borderRight: "1px solid white", // elválasztó vonal
};

const EventsTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1500, margin: "auto", borderRadius: 3, mt: 3  }}>
      <Table>
        <TableHead>
          <TableRow>
            {weekdays.map((day, index) => (
              <TableCell key={index} align="center" style={{ fontWeight: "bold", color: "white", backgroundColor: "#1976d2", borderRight: "1px solid white" }}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {weekdays.map((_, index) => (
              <TableCell key={index} align="center"></TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;


