import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRequest } from "ahooks";
import COUNTRY_API from "services/country-service";
import ErrorResponse from "./ResponseUIs/ErrorResponse";

const CountryDetail = ({
  countryName,
  onClose,
}: {
  countryName: string;
  onClose: () => void;
}) => {
  const {
    data: dataCountry,
    loading: loadingCountry,
    error: errorCountry,
    refresh,
  } = useRequest(() => COUNTRY_API.getCountryDetail({ name: countryName }));

  return (
    <>
      <DialogContent>
        {loadingCountry ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            width={300}
            height={300}
          >
            <CircularProgress />
          </Stack>
        ) : errorCountry ? (
          <ErrorResponse
            onRetry={refresh}
            errorMessage={errorCountry.message}
          />
        ) : (
          dataCountry && (
            <Grid container>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    variant="rounded"
                    src={dataCountry.flags.png}
                    alt="flags"
                    slotProps={{ img: { sx: { objectFit: "contain" } } }}
                    sx={{ width: 150, height: "auto" }}
                  />
                  <Stack>
                    <Typography variant="h5" fontWeight={600}>
                      {dataCountry.name.official}
                    </Typography>
                    <Typography variant="h6">
                      ({dataCountry.name.common})
                    </Typography>
                    <Typography>
                      <Typography component="span" variant="subtitle2">
                        Native Name:{" "}
                      </Typography>
                      {dataCountry.name.nativeName &&
                        Object.values(dataCountry.name.nativeName).map(
                          (e) => e.official
                        )[0]}
                    </Typography>
                    <Typography>
                      <Typography component="span" variant="subtitle2">
                        Alternative Name:{" "}
                      </Typography>
                      {dataCountry.altSpellings.join(", ")}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Capital:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.capital?.join(", ")}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Continent:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.continents}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Region:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.region}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Sub Region:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.subregion || "N/A"}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Currency:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {dataCountry.currencies &&
                    Object.values(dataCountry.currencies)
                      .map((e) => `${e.name}(${e.symbol})`)
                      .join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  CCA2:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.cca2}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  CCA3:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.cca3}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  IDD:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {dataCountry.idd.suffixes
                    ?.map((e) => `${dataCountry.idd.root}${e}`)
                    .join(", ")
                    .slice(0, 5)}
                  {(dataCountry.idd.suffixes?.length ?? 0) > 5 && "..."}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Language:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {dataCountry.languages &&
                    Object.values(dataCountry.languages).join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Population:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.population}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Timezones:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{dataCountry.timezones.join(", ")}</Typography>
              </Grid>
            </Grid>
          )
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => window.open(dataCountry?.maps.googleMaps)}>
          View on google map
        </Button>
        <Button color="error" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default CountryDetail;
