"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUsers } from "@/lib/store/features/userlistSlice";
import axiosInstance from "@/utils/axios";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
 
  CircularProgress,
  Alert,
  Pagination,
  Chip,
} from "@mui/material";

function UsersList() {
  const dispatch = useAppDispatch();
  const { isLoading, error, users, totalPages } = useAppSelector(
    (state) => state.users
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleBlockUser = async (_id: string) => {
    try {
      const response = await axiosInstance.post(`/users/blockUser/${_id}`);
      console.log(response.data.message);
      dispatch(fetchUsers(currentPage));
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Users List
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Link href="/admin/blockedList" passHref>
          <Button variant="outlined" color="error">
            Blocked Users
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center">Profile</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Image
                      src={user.profileImage.thumbnail || "/default-avatar.png"}
                      width={40}
                      height={40}
                      alt={user.name}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">
                  {user.isDeleted || user.blocked ? (
                    <Chip
                      icon={<BlockIcon />}
                      label="Blocked"
                      color="error"
                      size="small"
                    />
                  ) : (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label="Active"
                      color="success"
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color={user.blocked ? "primary" : "error"}
                    onClick={() => handleBlockUser(user._id)}
                    startIcon={
                      user.blocked ? <CheckCircleIcon /> : <BlockIcon />
                    }
                    size="small"
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

export default UsersList;
