import { FC, Dispatch, SetStateAction, useState } from "react";
import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const styles = {
  container: { width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  contentContainer: {
    backgroundColor: "white",
    width: "40%",
    padding: 5,
    display: "flex",
    flexDirection: "column",
  },
  dropdownContainer: {
    width: "100%",
  },
};

type AddGroupModalType = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  permissionNames: Array<string>;
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

const permissions = ["Read", "Write", "Update", "Delete"];

export const AddGroupModal: FC = ({ modal, setModal, permissionNames }: AddGroupModalType) => {
  const [selectedActions, setSelectedActions] = useState([]);
  const [permissionName, setPermissionName] = useState("");
  const [allPermissions, setAllPermissions] = useState({});

  const actionChange = (event: SelectChangeEvent<typeof selectedActions>) => {
    const {
      target: { value },
    } = event;
    setSelectedActions(typeof value === "string" ? value.split(",") : value);
  };

  const AddButton = () => {
    let selectedActionsObj = {};
    selectedActions.map(e => {
      selectedActionsObj = { ...selectedActionsObj, [e]: true };
    });
    setAllPermissions({
      [permissionName]: selectedActionsObj,
    });
  };

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
              Add Group
            </Typography>
            <TextField label="Name" onChange={e => setPermissionName(e.target.value)} />
            <Stack direction={"row"} alignItems="center">
              <FormControl sx={{ m: 1, flex: 1 }}>
                <InputLabel id="permission">Permissions</InputLabel>
                <Select
                  labelId="permission"
                  id="demo-multiple-name"
                  multiple
                  value={selectedActions}
                  onChange={actionChange}
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
              <FormControl sx={{ m: 1, flex: 1 }}>
                <InputLabel id="actions">Actions</InputLabel>
                <Select
                  labelId="actions"
                  id="demo-multiple-name"
                  multiple
                  value={selectedActions}
                  onChange={actionChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {permissionNames.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Button variant="contained" onClick={AddButton}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default AddGroupModal;
