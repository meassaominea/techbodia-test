import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";

export interface ICustomTable {
  headers: (string | ReactNode)[];
  body: ReactNode;
  sx?: {
    container?: SxProps<Theme>;
    table?: SxProps<Theme>;
    header?: SxProps<Theme>;
    body?: SxProps<Theme>;
  };
}

export default function CustomTable(props: ICustomTable) {
  return (
    <>
      <TableContainer sx={{ ...props.sx?.container }}>
        <Table
          sx={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: `0px 12px`,
            ...props.sx?.table,
          }}
        >
          <TableHead sx={{ ...props.sx?.header }}>
            <TableRow sx={tableSx.headRow}>
              {props.headers.map((p, i) => {
                return (
                  <TableCell key={i} sx={tableSx.headCell}>
                    {p}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={{ ...props.sx?.body }}>{props.body}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

interface ITableStyle {
  headRow?: SxProps<Theme>;
  headCell?: SxProps<Theme>;
  bodyRow?: SxProps<Theme>;
}

export const tableSx: ITableStyle = {
  headRow: {
    background: "transparent",
    "&> th": {
      pt: 0,
      borderBottom: 0,
    },
  },
  headCell: {
    fontWeight: (theme) => theme.typography.fontWeightBold,
    whiteSpace: "nowrap",
  },
  bodyRow: {
    background: (theme) => theme.palette.common.white,
    "&> td:first-of-type": {
      borderTopLeftRadius: (theme) => theme.spacing(1.5),
      borderBottomLeftRadius: (theme) => theme.spacing(1.5),
    },
    "&> td:last-child": {
      borderTopRightRadius: (theme) => theme.spacing(1.5),
      borderBottomRightRadius: (theme) => theme.spacing(1.5),
    },
  },
};
