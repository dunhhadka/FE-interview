import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Event, EventFilterRequest } from "../redux/action";
import { formatDateTime } from "../utils/DateUtils";
import { useDebounce } from "use-debounce";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  userId: string;
  events: Event[];
  filter: EventFilterRequest;
  onChangeFilter: (fitler: EventFilterRequest) => void;
}

function UserLog({ userId, events, onChangeFilter, filter }: Props) {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    onChangeFilter({ ...filter, query: debouncedQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, query]);

  return (
    <Box>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderTop: "0.2px solid",
          borderBottom: "0.2px solid",
          border: "none",
        }}
      >
        <TextField
          placeholder="Search something"
          variant="outlined"
          size="small"
          sx={{
            flex: 1,
            paddingRight: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <MuiTable
          aria-label="scrollable table"
          sx={{ width: "680px", marginTop: "20px" }}
        >
          <TableHead sx={{ background: "rgba(243, 244, 246, 1)" }}>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Action Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length > 0 ? (
              events.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography
                          sx={{
                            color: "rgba(17, 25, 39, 1)",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {row.author}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(108, 115, 127, 1)",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                        >
                          {formatDateTime(row.happenedAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: "rgba(17, 25, 39, 1)",
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {row.verb}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={row.description}>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {row.description}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "rgba(108, 115, 127, 1)",
                    }}
                  >
                    No events found for "{debouncedQuery}"
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </Box>
    </Box>
  );
}

export default UserLog;
