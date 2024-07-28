import {
  Container,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useRequest } from "ahooks";
import CustomTable, { tableSx } from "components/CustomTable";

const Country = () => {
  return (
    <Container component={Stack}>
      <Typography variant="h4" mb={2}>
        Country
      </Typography>

      <CustomTable
        headers={[
          "Flag",
          "Country Name",
          "CCA2",
          "CCA3",
          "Native Name",
          "Alternative Name",
          "IDD",
        ]}
        body={
          <TableRow sx={tableSx.bodyRow}>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
            <TableCell>Cell</TableCell>
          </TableRow>
        }
      />
    </Container>
  );
};

export default Country;
