import { useRequest } from "ahooks";
import Fuse from "fuse.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import COUNTRY_API from "services/country-service";

type SortType = "asc" | "desc";

const useCountry = () => {
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
  const [sort, setSort] = useState<SortType>("asc");
  const [filteredCountry, setFilterCountry] = useState<string[]>([]);
  const [detailModal, setDetailModal] = useState({ open: false, name: "" });

  // Variables

  const fuse = useMemo(
    () =>
      new Fuse(dataCountry?.map((e) => e.name.official) || [], {
        threshold: 0.3,
      }),
    [dataCountry]
  );
  const countryList = useMemo(
    () =>
      dataCountry
        ?.filter((e) =>
          search.length > 0 ? filteredCountry.includes(e.name.official) : e
        )
        .sort((a, b) =>
          sort === "asc"
            ? a.name.official.localeCompare(b.name.official)
            : b.name.official.localeCompare(a.name.official)
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [dataCountry, search, filteredCountry, sort, page, rowsPerPage]
  );
  const paginationCount = useMemo(
    () => (search.length > 0 ? countryList?.length : dataCountry?.length),
    [search, countryList, dataCountry]
  );

  // Methods
  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );
  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const onSortChange = useCallback(() => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // useEffects
  useEffect(() => {
    if (page > 0) {
      setPage(0);
    }

    const result = fuse.search(search);
    setFilterCountry(result.map((e) => e.item));
  }, [search]);

  return {
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
  };
};

export default useCountry;
