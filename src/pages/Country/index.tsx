import {
  Avatar,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Stack,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CountryDetail from "pages/Country/components/CountryDetail";
import CustomTable, { tableSx } from "components/CustomTable";
import EmptyResponse from "components/ResponseUIs/EmptyResponse";
import ErrorResponse from "components/ResponseUIs/ErrorResponse";
import { ArrowDown, ArrowUp } from "iconsax-react";
import useCountry from "./useCountry";

const Country = () => {
  const {
    sort,
    page,
    search,
    rowsPerPage,
    countryList,
    detailModal,
    errorCountry,
    loadingCountry,
    paginationCount,
    // ---
    handleChangeRowsPerPage,
    handleChangePage,
    setDetailModal,
    onSortChange,
    setSearch,
  } = useCountry();

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
              <IconButton size="small" onClick={onSortChange}>
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

      {paginationCount && (
        <TablePagination
          component="div"
          count={paginationCount}
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
