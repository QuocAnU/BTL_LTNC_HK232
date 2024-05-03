import React, { useMemo, useState, useEffect } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const TableTrip = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [customer, setCustomer] = useState([]);
  const [editingPhone, setEditingPhone] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: "STT",
        header: "STT",
        muiEditTextFieldProps: {
          type: "integer",
          required: true,
          error: !!validationErrors?.STT,
          helperText: validationErrors?.STT,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              STT: undefined,
            }),
        },
      },
      {
        accessorKey: "Length",
        header: "Length(km)",
        muiEditTextFieldProps: {
          type: "integer",
          required: true,
          error: !!validationErrors?.Length,
          helperText: validationErrors?.Length,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              STT: undefined,
            }),
        },
      },
      {
        accessorKey: "date_start",
        header: "Time departure",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.date_start,
          helperText: validationErrors?.date_start,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              STT: undefined,
            }),
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              STT: undefined,
            }),
        },
      },
      {
        accessorKey: "start_location",
        header: "Depart",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.start_location,
          helperText: validationErrors?.start_location,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              STT: undefined,
            }),
        },
      },
      {
        accessorKey: "end_location",
        header: "Dest",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.end_location,
          helperText: validationErrors?.end_location,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              STT: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );
  const data = [
    {
      STT: 1,
      Length: 100,
      date_start: "2022-12-12",
      status: "Đã hoàn thành",
      start_location: "Hà Nội",
      end_location: "Hồ Chí Minh",
    },
    {
      STT: 2,
      Length: 200,
      date_start: "2022-12-12",
      status: "Đã hoàn thành",
      start_location: "Hà Nội",
      end_location: "Hồ Chí Minh",
    },
    {
      STT: 3,
      Length: 300,
      date_start: "2022-12-12",
      status: "Đã hoàn thành",
      start_location: "Hà Nội",
      end_location: "Hồ Chí Minh",
    },
  ];

  const handleCreateUser = async ({ values, table }) => {
    console.log("Create user");
  };

  const handleSaveUser = async ({ values, table }) => {};

  const openDeleteConfirmModal = async (row) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        console.log("Delete trip");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleEditClick = (row) => {};

  const table = useMaterialReactTable({
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => {
      // Clear the editing phone number when canceling the edit
      setEditingPhone(null);
      setValidationErrors({});
    },
    onEditingRowSave: handleSaveUser,
    columns,
    data: data,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.STT,
    muiTableContainerProps: {
      sx: {
        overflowX: "auto",
        width: "100%",
      },
    },

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditClick(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        sx={{ marginBottom: "16px" }}
      >
        ĐĂNG KÍ KHÁCH HÀNG MỚI
      </Button>
    ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Thêm khách hàng</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents.slice(0, 2)}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit User</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
            gap: "1rem",
          }}
        >
          {internalEditComponents.slice(0, 1)}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
  });

  return <MaterialReactTable style={{ minWidth: "1000px" }} table={table} />;
};

export default TableTrip;
