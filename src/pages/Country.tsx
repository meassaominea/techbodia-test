import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Modal,
  Stack,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRequest } from "ahooks";
import CountryDetail from "components/CountryDetail";
import CustomTable, { tableSx } from "components/CustomTable";
import EmptyResponse from "components/ResponseUIs/EmptyResponse";
import ErrorResponse from "components/ResponseUIs/ErrorResponse";
import Fuse from "fuse.js";
import { ArrowDown, ArrowUp } from "iconsax-react";
import { useEffect, useState } from "react";
import COUNTRY_API from "services/country-service";

const Country = () => {
  // Hooks
  const {
    data: dataCountry,
    loading: loadingCountry,
    error: errorCountry,
  } = useRequest(COUNTRY_API.getCountry);

  // States
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sort, setSort] = useState("asc");
  const [filteredCountry, setFilterCountry] = useState<string[]>([]);
  const [detailModal, setDetailModal] = useState({ open: false, name: "" });

  // Variables
  const countryNameString = dataCountry?.map((e) => e.name.official) ?? [];
  const fuse = new Fuse(countryNameString, {
    threshold: 0.3,
  });
  const countryList = dataCountry
    ?.filter((e) =>
      search.length > 0 ? filteredCountry.includes(e.name.official) : e
    )
    .sort((a, b) =>
      sort === "asc"
        ? a.name.official.localeCompare(b.name.official)
        : b.name.official.localeCompare(a.name.official)
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Methods
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // useEffects
  useEffect(() => {
    if (page > 0) {
      setPage(0);
    }

    const result = fuse.search(search);
    setFilterCountry(result.map((e) => e.item));
  }, [search]);

  return (
    <Container component={Stack} pb={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" mb={2}>
          World Country
        </Typography>

        <TextField
          label="Search country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      {loadingCountry ? (
        <Stack height="75vh" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : errorCountry ? (
        <ErrorResponse height="75vh" errorMessage={errorCountry?.message} />
      ) : countryList && countryList.length > 0 ? (
        <CustomTable
          headers={[
            "Flag",
            <>
              Country Name
              <IconButton
                size="small"
                onClick={() =>
                  setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                {sort === "asc" ? (
                  <ArrowDown size={18} />
                ) : (
                  <ArrowUp size={18} />
                )}
              </IconButton>
            </>,
            "CCA2",
            "CCA3",
            "Native Name",
            "Alternative Name",
            "IDD",
          ]}
          body={countryList.map((country) => (
            <TableRow
              sx={tableSx.bodyRow}
              key={country.name.official}
              onClick={() =>
                setDetailModal({ open: true, name: country.name.official })
              }
            >
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={country.flags.png}
                  alt="flags"
                  slotProps={{ img: { sx: { objectFit: "contain" } } }}
                />
              </TableCell>
              <TableCell>{country.name.official}</TableCell>
              <TableCell>{country.cca2}</TableCell>
              <TableCell>{country.cca3}</TableCell>
              <TableCell>
                {country.name.nativeName &&
                  Object.values(country.name.nativeName).map(
                    (e) => e.official
                  )[0]}
              </TableCell>
              <TableCell>{country.altSpellings.join(", ")}</TableCell>
              <TableCell>
                {country.idd.suffixes
                  ?.map((e) => `${country.idd.root}${e}`)
                  .join(", ")
                  .slice(0, 5)}
                {(country.idd.suffixes?.length ?? 0) > 5 && "..."}
              </TableCell>
            </TableRow>
          ))}
        />
      ) : (
        <EmptyResponse height="75vh" />
      )}

      {countryList && dataCountry && (
        <TablePagination
          component="div"
          count={search.length > 0 ? countryList.length : dataCountry.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: "common.white",
            borderRadius: 2,
          }}
        />
      )}

      <Dialog
        open={detailModal.open}
        onClose={() => setDetailModal({ ...detailModal, open: false })}
      >
        <CountryDetail
          countryName={detailModal.name}
          onClose={() => setDetailModal({ ...detailModal, open: false })}
        />
      </Dialog>
    </Container>
  );
};

export default Country;
