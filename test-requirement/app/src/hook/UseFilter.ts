import { useCallback, useEffect, useState } from "react";
import { UserFilter } from "../redux/action";
import { useDebounce } from "use-debounce";

export function useRawFilters() {
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<UserFilter>({ limit: 10, page: 1 });
  const [finalQuery] = useDebounce(query, 300);

  const changeFilter = useCallback((newFilter: Partial<UserFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  }, []);

  const changeQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  useEffect(() => {
    changeFilter({ ...filter, query: finalQuery });
  }, [finalQuery, filter, changeFilter]);

  return {
    filter,
    query,
    changeFilter,
    changeQuery,
  };
}
