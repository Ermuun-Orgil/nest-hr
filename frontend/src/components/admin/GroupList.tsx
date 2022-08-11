import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, FC } from "react";
import { Typography, Box, Button } from "@mui/material";
import { AddGroupModal } from "./AddGroupModal";
import { GroupDetail } from "./GroupDetailModal";
import { GroupDataType } from "./type";

const styles = {
  container: { width: "100%", display: "flex", flexDirection: "column", alignItems: "center" },
  contentContainer: { width: 1150, mt: 5 },
  dataGrid: {
    my: 3,
    boxShadow: 20,
    border: 0,
    padding: "0 10px",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "primary.light",
    "& .MuiDataGrid-cell:hover": {
      color: "primary.main",
    },
  },
  img: { borderRadius: 40 },
};

const GroupList: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<GroupDataType>();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 350 },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 150,
      renderCell: () => {
        return <Button onClick={() => setDetailModal(true)}>Detail</Button>;
      },
    },
  ];
  const dummyData = [
    {
      id: 1,
      name: "HR-1",
      permissions: {
        users: {
          read: true,
          write: true,
        },
        "salary-all": {
          read: true,
          write: true,
        },
      },
    },
    {
      id: 2,
      name: "HR-2",
      permissions: {
        users: {
          read: true,
          write: true,
        },
        "salary-all": {
          read: true,
          write: true,
        },
      },
    },
  ];
  const permissionNames = ["users", "salary-all"];
  return (
    <Box sx={styles.container}>
      <Button onClick={() => setModal(true)}>Add Group</Button>
      <Box sx={styles.contentContainer}>
        <Typography>All groups</Typography>
        <DataGrid
          autoHeight
          rows={dummyData}
          columns={columns}
          getRowId={row => row.id}
          getRowHeight={() => "auto"}
          onCellKeyDown={(params, events) => events.stopPropagation()}
          sx={styles.dataGrid}
          onSelectionModelChange={indx => {
            const filteredData = dummyData.find(row => row.id === indx[0]);
            setSelectedData(filteredData);
          }}
        />
      </Box>
      <AddGroupModal modal={modal} setModal={setModal} permissionNames={permissionNames} />
      <GroupDetail modal={detailModal} setModal={setDetailModal} data={selectedData} />
    </Box>
  );
};

export default GroupList;
// accept reject
// redirect
// history
