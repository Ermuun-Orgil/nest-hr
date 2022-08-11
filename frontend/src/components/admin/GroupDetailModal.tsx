import { FC, useState, useEffect } from "react";
import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GroupDataType, GroupDetailType } from "./type";

const styles = {
  container: { width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  contentContainer: {
    backgroundColor: "white",
    width: "40%",
    padding: 5,
    display: "flex",
    flexDirection: "column",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const permissions = ["Users", "Salary"];

export const GroupDetail: FC = ({ modal, setModal, data }: GroupDetailType) => {
  const [selectedActions, setSelectedActions] = useState([]);
  const [group, setGroup] = useState<GroupDataType>();

  console.log(data);

  useEffect(() => {
    setGroup(data);
    const actionNames = data ? Object.keys(data.permissions) : [];
    setSelectedActions(actionNames);
  }, [data]);

  const handleChange = (val, key) => {
    setGroup({ ...group, [key]: val });
  };
  const handleChangeActions = (event: SelectChangeEvent<typeof selectedActions>) => {
    const {
      target: { value },
    } = event;
    setSelectedActions(typeof value === "string" ? value.split(",") : value);
  };
  const updateData = () => {
    console.log("update data");
  };

  const deleteData = () => {
    console.log("delete data");
  };

  if (!group) return <></>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.container}
      >
        <Box sx={styles.contentContainer}>
          <Stack spacing={2}>
            <Typography textAlign={"center"} variant="h5">
              Group Detail
            </Typography>
            <TextField label="Name" value={group.name} onChange={e => handleChange(e.target.value, "name")} />
            <FormControl sx={{ m: 1, width: "auto" }}>
              <InputLabel id="demo-multiple-name-label">Permissions</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedActions}
                onChange={handleChangeActions}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {permissions.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction={"row"} spacing={2} justifyContent={"center"}>
              <Button variant="contained" onClick={updateData}>
                Update
              </Button>
              <Button variant="contained" color="error" onClick={deleteData}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default GroupDetail;
