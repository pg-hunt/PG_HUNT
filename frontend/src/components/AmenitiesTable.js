import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import KitchenIcon from "@mui/icons-material/Kitchen";
import TvIcon from "@mui/icons-material/Tv";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import KingBedIcon from "@mui/icons-material/KingBed";

export default function AmenitiesTable({
  laundry,
  refrigirator,
  tv,
  wifi,
  bed,
}) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Amenity</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <LocalLaundryServiceIcon sx={{ verticalAlign: "text-bottom" }} />{" "}
              Laundry
            </TableCell>
            <TableCell align="right">{laundry}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <KitchenIcon sx={{ verticalAlign: "text-bottom" }} /> Refrigirator
            </TableCell>
            <TableCell align="right">{refrigirator}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <TvIcon sx={{ verticalAlign: "text-bottom" }} /> Tv
            </TableCell>
            <TableCell align="right">{tv}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <NetworkWifiIcon sx={{ verticalAlign: "text-bottom" }} /> Wifi
            </TableCell>
            <TableCell align="right">{wifi}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <KingBedIcon sx={{ verticalAlign: "text-bottom" }} /> Bed
            </TableCell>
            <TableCell align="right">{bed}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
