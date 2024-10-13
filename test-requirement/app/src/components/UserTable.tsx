import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { User, getAllUser } from "../redux/action";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${""}`,
  },
];

export default function DataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const [pageSize, setPageSize] = React.useState<number>(5); 
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [rows, setRows] = React.useState<User[]>([]);

  const fetchUsers = async (size: number, number: number) => {
    const result = await dispatch(getAllUser({ size, number }));
    if (result && result.payload && result.meta.requestStatus === "fulfilled") {
      if (Array.isArray(result.payload)) {
        const users = result.payload as User[];
        const validUsers = users.map((user) => ({ ...user, id: user.id }));
        setRows(validUsers);
      } else {
        console.error("Payload is not an array:", result.payload);
        setRows([]);
      }
    }
  };

  React.useEffect(() => {
    fetchUsers(pageSize, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageNumber]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPageNumber(model.page); 
    setPageSize(model.pageSize); 
    console.log(model);
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server" // Điều khiển phân trang ở phía server
        rowCount={rows.length} // Tổng số hàng
        paginationModel={{ page: pageNumber, pageSize }} // Thay page và pageSize bằng paginationModel
        onPaginationModelChange={handlePaginationChange} // Lắng nghe sự kiện thay đổi phân trang
        pageSizeOptions={[3,5, 10, 20]} // Tùy chọn kích thước trang
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
