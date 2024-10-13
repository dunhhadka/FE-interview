import {
  Box,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
  Chip,
  Typography,
} from "@mui/material";
import TableHeader from "./TableHeader";
import Search from "./Search";
import { useMemo, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as React from "react";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import UserDetail from "./UserDetail";
import UserEditPage from "./UserEditPage";
import ConfirmModal from "./ConfirmModel";
import Loading from "./Loading";
import {
  useDeleteUserByIdMutation,
  useSearchUserWithCountQuery,
} from "../api/api";
import { UserFilter } from "../redux/action";
import { formatDateTime } from "../utils/DateUtils";
import { User } from "../redux/action";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import { useRawFilters } from "../hook/UseFilter";

type IndexTableFieldHeading = {
  title: string;
  key: string;
  center?: boolean;
  width?: string;
};

export const roleColors = {
  super_admin: ["rgba(98, 34, 171, 0.2)", "rgba(98, 34, 171, 1)"],
  trainer: ["rgba(10, 83, 168, 0.2)", "rgba(10, 83, 168, 1)"],
  member: ["rgba(56, 66, 80, 0.08)", "rgba(56, 66, 80, 1)"],
};

export const statusColors = {
  activated: ["rgba(21, 183, 158, 0.12)", "rgba(16, 117, 105, 1)"],
  waiting: ["rgba(247, 144, 9, 0.12)", "rgba(181, 71, 8, 1)"],
  deleted: ["rgba(246, 123, 16, 0.45)", "rgba(141, 51, 46, 0.8)"],
};

export const language = {
  english: ["rgba(172, 234, 87, 0.83)", "rgba(106, 149, 47, 0.83)"],
  viet_nam: ["rgba(243, 185, 144, 0.83)", "rgba(74, 54, 39, 0.83)"],
};

export const type = {
  normal: ["rgba(74, 237, 238, 0.83)", "rgba(37, 128, 129, 0.83)"],
  premium: ["rgba(238, 123, 129, 0.83)", "rgba(131, 52, 57, 0.83)"],
};

const Table = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const { filter, query, changeFilter, changeQuery } = useRawFilters();

  const [deleteUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserByIdMutation();

  const {
    data: usersData,
    isLoading: isSearchOrderLoading,
    isFetching: isSearchOrderFetching,
  } = useSearchUserWithCountQuery(filter);

  const { users = [], count } = { ...usersData };

  const isLoading = isSearchOrderLoading || isLoadingDeleteUser;

  const [showDetailModel, setShowDetailModel] = useState<boolean>(false);
  const [showEditUserPage, setShowEditUserPage] = useState<boolean>(false);
  const [openConfirmModelDelete, setOpenConfirmModelDelete] =
    useState<boolean>(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    changeFilter({ ...filter, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    changeFilter({ ...filter, limit: Number(event.target.value) });
  };

  const headings: IndexTableFieldHeading[] = useMemo(
    () => [
      { title: "NO", key: "no", center: true, width: "5%" },
      { title: "USER ID", key: "id", width: "15%" },
      { title: "FULL NAME", key: "full_name", width: "20%" },
      { title: "EMAIL", key: "email", width: "15%" },
      { title: "ROLE", key: "role", center: true, width: "10%" },
      { title: "JOIN DATE", key: "join_date", width: "15%" },
      { title: "CREATE DATE", key: "created_on", width: "15%" },
      { title: "STATUS", key: "status", center: true, width: "10%" },
      { title: "ACTION", key: "action", center: true, width: "15%" },
    ],
    []
  );

  const closeShowDetail = () => {
    setShowDetailModel(false);
  };
  const closeShowEditPage = () => {
    setShowEditUserPage(false);
  };

  const changeStatusUserToDeleted = React.useCallback(async () => {
    if (userId) {
      const res = await deleteUser(userId);
      if (!res?.error && res?.data) {
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user. Please try again.");
      }
    }
  }, [deleteUser, userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableHeader />
      <Search changeQuery={changeQuery} query={query} />
      <TableContainer>
        <MuiTable aria-label="scrollable table">
          <TableHead sx={{ background: "rgba(243, 244, 246, 1)" }}>
            <TableRow>
              {headings.map((heading) => (
                <TableCell
                  key={heading.key}
                  sx={{
                    fontWeight: "bold",
                    textAlign: heading.center ? "center" : "left",
                    width: heading.width,
                    scrollbarWidth: "thin",
                  }}
                >
                  {heading.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(users || []).map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                <TableCell>
                  <Tooltip title={row.id}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "120px",
                      }}
                    >
                      {row.id}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={row.fullName}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "120px",
                      }}
                    >
                      {row.fullName}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={row.email}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "120px",
                      }}
                    >
                      {row.email}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {getRole(row)}
                </TableCell>
                <TableCell>
                  <Tooltip title={formatDateTime(row.joinDate)}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "120px",
                      }}
                    >
                      {formatDateTime(row.joinDate)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={formatDateTime(row.createdOn)}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "120px",
                      }}
                    >
                      {formatDateTime(row.createdOn)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {getStatus(row)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <IconButton
                      aria-label="view"
                      size="small"
                      onClick={() => {
                        setShowDetailModel(true);
                        setUserId(row.id);
                      }}
                    >
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        setShowEditUserPage(true);
                        setUserId(row.id);
                      }}
                    >
                      <EditIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        setOpenConfirmModelDelete(true);
                        setUserId(row.id);
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {/* // copy form material ui */}
      <Root
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={count || 0}
              rowsPerPage={filter.limit}
              page={filter.page}
              slotProps={{
                select: {
                  "aria-label": "Rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                  slots: {
                    firstPageIcon: FirstPageRoundedIcon,
                    lastPageIcon: LastPageRoundedIcon,
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon,
                  },
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </Root>
      {showDetailModel && !!userId && (
        <UserDetail onClose={closeShowDetail} userId={userId} />
      )}
      {showEditUserPage && !!userId && (
        <UserEditPage onClose={closeShowEditPage} userId={userId} />
      )}
      {openConfirmModelDelete && !!userId && (
        <ConfirmModal
          open={openConfirmModelDelete}
          onClose={() => setOpenConfirmModelDelete(false)}
          onConfirm={() => {
            setOpenConfirmModelDelete(false);
            changeStatusUserToDeleted();
          }}
        />
      )}
    </Box>
  );
};

export default Table;

export const getRole = (user: User) => {
  return (
    <Chip
      label={user.role}
      sx={{
        backgroundColor:
          roleColors[user.role as keyof typeof roleColors][0] || "gray",
        color: roleColors[user.role as keyof typeof roleColors][1] || "gray",
        fontWeight: "600",
        borderRadius: "10px",
        fontSize: 12,
      }}
    />
  );
};

export const getStatus = (user: User) => {
  return (
    <Chip
      label={user.status}
      sx={{
        backgroundColor:
          statusColors[user.status as keyof typeof statusColors][0] || "gray",
        color:
          statusColors[user.status as keyof typeof statusColors][1] || "white",
        fontWeight: "600",
        borderRadius: "8px",
        fontSize: 12,
      }}
    />
  );
};

export const getLanguage = (user: User) => {
  return (
    <Chip
      label={user.language}
      sx={{
        backgroundColor:
          language[user.language as keyof typeof language][0] || "gray",
        color: language[user.language as keyof typeof language][1] || "white",
        fontWeight: "600",
        borderRadius: "8px",
        fontSize: 12,
      }}
    />
  );
};

export const getType = (user: User) => {
  return (
    <Chip
      label={user.type}
      sx={{
        backgroundColor: type[user.type as keyof typeof type][0] || "gray",
        color: type[user.type as keyof typeof type][1] || "white",
        fontWeight: "600",
        borderRadius: "8px",
        fontSize: 12,
      }}
    />
  );
};

// copy form material ui
const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
     table {
       font-family: 'IBM Plex Sans', sans-serif;
       font-size: 0.875rem;
       width: 100%;
       background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
       box-shadow: 0px 4px 16px ${
         theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.3)" : grey[200]
       };
       border-radius: 12px;
       border: 1px solid ${
         theme.palette.mode === "dark" ? grey[800] : grey[200]
       };
       overflow: hidden;
     }
   
     td,
     th {
       padding: 16px;
     }
   
     th {
       background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
     }
     `
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
     & .${classes.spacer} {
       display: none;
     }
   
     & .${classes.toolbar}  {
       display: flex;
       flex-direction: column;
       align-items: flex-start;
       gap: 8px;
       background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
   
       @media (min-width: 768px) {
         flex-direction: row;
         align-items: center;
       }
     }
   
     & .${classes.selectLabel} {
       margin: 0;
     }
   
     & .${classes.select}{
       font-family: 'IBM Plex Sans', sans-serif;
       padding: 2px 0 2px 4px;
       border: 1px solid ${
         theme.palette.mode === "dark" ? grey[800] : grey[200]
       };
       border-radius: 6px; 
       background-color: transparent;
       color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
       transition: all 100ms ease;
   
       &:hover {
         background-color: ${
           theme.palette.mode === "dark" ? grey[800] : grey[50]
         };
         border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
       }
   
       &:focus {
         outline: 3px solid ${
           theme.palette.mode === "dark" ? blue[400] : blue[200]
         };
         border-color: ${blue[400]};
       }
     }
   
     & .${classes.displayedRows} {
       margin: 0;
   
       @media (min-width: 768px) {
         margin-left: auto;
       }
     }
   
     & .${classes.actions} {
       display: flex;
       gap: 6px;
       border: transparent;
       text-align: center;
     }
   
     & .${classes.actions} > button {
       display: flex;
       align-items: center;
       padding: 0;
       border: transparent;
       border-radius: 50%; 
       background-color: transparent;
       border: 1px solid ${
         theme.palette.mode === "dark" ? grey[800] : grey[200]
       };
       color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
       transition: all 100ms ease;
   
       > svg {
         font-size: 22px;
       }
   
       &:hover {
         background-color: ${
           theme.palette.mode === "dark" ? grey[800] : grey[50]
         };
         border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
       }
   
       &:focus {
         outline: 3px solid ${
           theme.palette.mode === "dark" ? blue[400] : blue[200]
         };
         border-color: ${blue[400]};
       }
   
       &:disabled {
         opacity: 0.3;
         &:hover {
           border: 1px solid ${
             theme.palette.mode === "dark" ? grey[800] : grey[200]
           };
           background-color: transparent;
         }
       }
     }
     `
);
