import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  query: string | undefined;
  changeQuery: (query: string) => void;
}

const Search = ({ query, changeQuery }: Props) => {
  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderTop: "0.2px solid",
        borderBottom: "0.2px solid",
        borderColor: "#E0E0E0",
        padding: "0 18px",
      }}
    >
      <TextField
        placeholder="Search for question id, other keywords"
        variant="outlined"
        size="small"
        sx={{
          flex: 1,
          paddingRight: 2,
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
        onChange={(e) => changeQuery(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          fontSize: 14,
          borderRadius: 5,
          background: "#635BFF",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;
