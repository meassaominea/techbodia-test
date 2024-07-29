import { Avatar, TableCell, TableRow } from "@mui/material";
import { tableSx } from "components/CustomTable";

const CountryItem = ({
  country,
  onItemClick,
}: {
  country: ICountry.Country;
  onItemClick: () => void;
}) => {
  return (
    <TableRow sx={tableSx.bodyRow} onClick={onItemClick}>
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
          Object.values(country.name.nativeName).map((e) => e.official)[0]}
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
  );
};

export default CountryItem;
