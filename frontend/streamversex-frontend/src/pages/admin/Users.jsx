// src/pages/admin/Users.jsx
import { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { Ban, CheckCircle, Eye } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/admin/layout/PageHeader";
import DataTable from "../../components/admin/common/DataTable";
import SearchBar from "../../components/admin/common/SearchBar";
import StatusBadge from "../../components/admin/common/StatusBadge";
import ActionMenu from "../../components/admin/common/ActionMenu";
import ConfirmDialog from "../../components/admin/common/ConfirmDialog";

import {
  getAllUsers,
  searchUsers,
  blockUser,
  unblockUser,
} from "../../services/adminService";

const PAGE_SIZE = 10;

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);

  // { user, action: "block" | "unblock" } | null
  const [confirmState, setConfirmState] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: rowsPerPage };
      const res = query
        ? await searchUsers(query, params)
        : await getAllUsers(params);

      // Defensive: supports either a raw array or a paginated envelope
      // ({ content, totalElements } is the common Spring Boot shape).
      const list = res?.content ?? res?.items ?? res ?? [];
      const total = res?.totalElements ?? res?.totalCount ?? list.length;

      setRows(list);
      setTotalCount(total);
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, query]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(0);
  };

  const openConfirm = (user, action) => setConfirmState({ user, action });
  const closeConfirm = () => (actionLoading ? null : setConfirmState(null));

  const handleConfirm = async () => {
    if (!confirmState) return;
    const { user, action } = confirmState;
    setActionLoading(true);
    try {
      if (action === "block") {
        await blockUser(user.id ?? user.userId);
        toast.success(`${user.name ?? "User"} blocked`);
      } else {
        await unblockUser(user.id ?? user.userId);
        toast.success(`${user.name ?? "User"} unblocked`);
      }
      setConfirmState(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => (
        <StatusBadge status={row.blocked ? "Blocked" : row.status ?? "Active"} />
      ),
    },
    {
      key: "premium",
      label: "Plan",
      align: "center",
      render: (row) =>
        row.premium ? <StatusBadge status="Premium" /> : <StatusBadge status="Free" />,
    },
    { key: "createdAt", label: "Joined", sortable: true },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (row) => (
        <ActionMenu
          row={row}
          actions={[
            { label: "View details", icon: Eye, onClick: () => {} },
            {
              label: "Block user",
              icon: Ban,
              danger: true,
              hidden: (r) => r.blocked,
              onClick: (r) => openConfirm(r, "block"),
            },
            {
              label: "Unblock user",
              icon: CheckCircle,
              hidden: (r) => !r.blocked,
              onClick: (r) => openConfirm(r, "unblock"),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage platform users, block or unblock accounts"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Users" }]}
        actions={
          <SearchBar
            placeholder="Search users by name or email..."
            onSearch={handleSearch}
          />
        }
      />

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyMessage="No users found"
        getRowId={(row) => row.id ?? row.userId}
        rowsPerPageOptions={[10, 25, 50]}
        serverPagination={{
          page,
          rowsPerPage,
          totalCount,
          onPageChange: setPage,
          onRowsPerPageChange: (val) => {
            setRowsPerPage(val);
            setPage(0);
          },
        }}
      />

      <ConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.action === "block" ? "Block this user?" : "Unblock this user?"}
        message={
          confirmState?.action === "block"
            ? `${confirmState?.user?.name ?? "This user"} will lose access to the platform immediately.`
            : `${confirmState?.user?.name ?? "This user"} will regain access to the platform.`
        }
        severity={confirmState?.action === "block" ? "danger" : "default"}
        confirmLabel={confirmState?.action === "block" ? "Block" : "Unblock"}
        loading={actionLoading}
        onConfirm={handleConfirm}
        onClose={closeConfirm}
      />
    </>
  );
}