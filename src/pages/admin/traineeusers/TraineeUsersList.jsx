import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ExerciseDetails from "./ExerciseDetails";
import Loading from "@/components/common/Loading";
import PaginationComp from "@/components/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoSearch } from "react-icons/go";
import { toast } from "sonner";
import UserDetails from "./UserDetails";

export function TraineeUsersLists() {
  const [users, setUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/traineelistforadmin?adminId=${userData?._id}`);
        setAdminUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAdminUser();
  }, [userData?._id]);

  const columns = [
    {
      accessorKey: "full_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם מלא
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("full_name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          כתובת דואר
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        const userId = row.original._id;
        return (
          <div className="flex space-x-2">
            <UserDetails userId={userId} />
            <Button
              className="bg-customBg"
              size="sm"
              onClick={() => handleOpenDeleteModal(userId)}
            >
              <Trash />
            </Button>
            <Link to={`/admin-dashboard/traineer/${userId}`}>
              <Button
                className="bg-customBg"
                size="sm"
                onClick={() => handleOpenDeleteModal(row.original)}
              >
                נהל מתאמן
              </Button>
            </Link>
            {/* <Button
              className="bg-customBg"
              size="sm"
              onClick={() =>
                updateStatus(
                  row.original.userType === "admin" ? "trainee" : "admin",
                  userId
                )
              }
            >
              {row.original.userType === "trainee"
                ? "הפוך למאמן"
                : "הפוך למתאמן"}
            </Button> */}
            <Button
              className="bg-green-100 hover:bg-green-200 text-green-500 font-bold uppercase"
              size="sm"
            >
              {row.original.userType === "trainee"
                ? "משתמש מתאמן"
                : row.original.userType === "recipe"
                ? "משתמש ספר מתכונים"
                : "Admin"}
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleOpenDeleteModal = (userId) => {
    setSelectedUser(userId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const data = {
        user_id: selectedUser,
        // userStatus: "Inactive",
      };
      // await deleteUser(data);
      const response = await axios.delete(
        `${base_url}/deleteUser/${selectedUser}`
      );
      console.log("delete:", data.user_id);
      if (response.status === 200) {
        toast.success("User deleted successfully.");
      }
      setUsers((prevUsers) => prevUsers.filter((e) => e._id !== selectedUser));
      setDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/getUsers?page=${page}&&limit=10&&search=${search}`
        );
        if (response.status === 200) {
          setPage(response.data.pagination.currentPage);
          setTotalPages(response.data.pagination.totalPages);
          setUsers(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
        throw error;
      }
    };
    fetchUsers();
  }, [page, totalPages, search]);

  const updateStatus = async (userType, userId) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: userId,
        userType,
      });

      if (response.status === 200) {
        toast.success("User Type Updated Successfully");
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === userId) {
              return { ...user, userType };
            }
            return user;
          })
        );
      }
    } catch (error) {
      toast.error("Failed to update user type");
      console.log("error:", error);
    }
  };

  const table = useReactTable({
    data: userData.userType === "admin" ? adminUsers : users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className="w-full" dir="ltr">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between py-4">
            <div
              className="flex justify-between items-center relative max-w-sm h-12"
              dir="rtl"
            >
              <input
                type="search"
                name=""
                id=""
                placeholder="סנן לפי שם..."
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
              />
              <div className="absolute bg-red-700 w-8 h-8 rounded-full flex justify-center items-center left-2">
                <GoSearch className="text-white" />
              </div>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this user?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 text-white" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
