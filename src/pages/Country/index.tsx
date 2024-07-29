import {
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import CountryDetail from "pages/Country/components/CountryDetail";
import CustomTable from "components/CustomTable";
import EmptyResponse from "components/ResponseUIs/EmptyResponse";
import ErrorResponse from "components/ResponseUIs/ErrorResponse";
import { ArrowDown, ArrowUp } from "iconsax-react";
import useCountry from "./useCountry";
import CountryItem from "./components/CountryItem";

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
            <CountryItem
              key={country.name.official}
              country={country}
              onItemClick={() =>
                setDetailModal({ open: true, name: country.name.official })
              }
            />
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
