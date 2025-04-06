import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ExerciseDetails from "./ExerciseDetails";
import { deleteUser } from "@/api/deleteData";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserDetails from "./UserDetails";
import { toast } from "sonner";

export function TraineeUsersLists() {
  const [users, setUsers] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  //   const [exercise, setExercise] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [traineeUsers, setTraineeUsers] = useState([]);
  const columns = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("firstName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
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
            <Link to={`/dashboard/traineer/${userId}`}>
              <Button className="bg-customBg" size="sm">
                Managing Training
              </Button>
            </Link>
            <Button
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
                ? "Make Admin"
                : "Make Trainee"}
            </Button>
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
        userStatus: "Inactive",
      };
      await deleteUser(data);
      setUsers((prevUsers) => prevUsers.filter((e) => e._id !== selectedUser));
      setDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${base_url}/getUsers`);
      console.log("Users:", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (userType, userId) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: userId,
        userType,
      });

      if (response.status === 200) {
        toast.success("User Type Updated Successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to update user type");
    }
  };

  const table = useReactTable({
    data: users,
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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter name..."
          value={table.getColumn("firstName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <Button
              key={index}
              className={`${
                table.getState().pagination.pageIndex === index
                  ? "bg-customBg"
                  : "bg-white text-black border hover:text-white"
              }`}
              size="sm"
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
