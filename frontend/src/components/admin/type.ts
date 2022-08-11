import { Dispatch, SetStateAction } from "react";

export type EmployeeDataType = {
  name: string;
  phone: string;
  email: string;
  role: string;
  birthday: Date;
};

export type GroupDataType = {
  name: string;
  permissions: {
    users: {
      read: boolean;
      write: boolean;
      update: boolean;
      delete: boolean;
    };
    "salary-all": {
      read: boolean;
      write: boolean;
      update: boolean;
      delete: boolean;
    };
  };
};

export type EmployeeDetailType = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  data: Array<EmployeeDataType>;
};

export type GroupDetailType = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  data: GroupDataType;
};
