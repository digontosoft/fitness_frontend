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
import { ArrowUpDown, Eye, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ExerciseDetails from "./ExerciseDetails";
import EditApproveMail from "@/components/admin/components/ApproveMailTable/EditApproveMail";
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
  const [viewUserModalOpen, setViewUserModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
   const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchAdminUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/traineelistforadmin?adminId=${userData?._id}`);
      setAdminUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },[userData?._id]);
  useEffect(() => {
    fetchAdminUser();
  }, [fetchAdminUser]);

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
             <Button className="bg-[#7994CB] hover:bg-[#7994CB]-dark" size="sm" onClick={() => {setViewUser(userId), setViewUserModalOpen(true)}}>
          <Eye className="w-4 h-4" />
        </Button>
           
            <EditApproveMail id={userId} updateDate={updateDate} />
            <Button
              className="bg-[#7994CB]"
              size="sm"
              onClick={() => handleOpenDeleteModal(userId)}
            >
              <Trash />
            </Button>
            {
              userData?.userType === "admin" ?(

              <Link to={`/admin-dashboard/traineer/${userId}`}>
                <Button
                  className="bg-[#7994CB]"
                  size="sm"
                  onClick={() => handleOpenDeleteModal(row.original)}
                >
                  נהל מתאמן
                </Button>
              </Link>
              ):
              (
            <Link to={`/dashboard/traineer/${userId}`}>
              <Button
                className="bg-[#7994CB]"
                size="sm"
                onClick={() => handleOpenDeleteModal(row.original)}
              >
                נהל מתאמן
              </Button>
            </Link>
              )
            }
            {/* <Button
              className="bg-[#7994CB]"
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
                :"Admin"}
            </Button>

            <Button
              className="bg-[#7994CB] font-bold"
              size="sm"
              onClick={() =>
                updateStatus(
                
                  userId
                )
              }
             
            >
            
               הפוך למאמן
            
            </Button>

            {/* {
              userData?.userType === "supperadmin" &&(
            <Button
              className="bg-[#7994CB] font-bold"
              size="sm"
              onClick={() =>
                updateStatus(
                  row.original.userType === "admin" ? "trainee" : "admin",
                  userId
                )
              }
              disabled={row.original.userType === "supperadmin"}
            >
             {
  row.original.userType === "trainee" || row.original.userType === "recipe"
    ? "הפוך למתאמן"
    : "הפוך למאמן"
}

            </Button>
              )
            } */}
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

   const updateDate = async (data) => {
    try {
      const response = await axios.patch(
        `${base_url}/update-approved-mail`,
        data
      );
      if (response.status === 200) {
        toast.success("Date updated successfully.");
        // setEmails((prevEmails) =>
        //   prevEmails.map((email) =>
        //     email._id === data._id
        //       ? { ...email, expiry_date: data.expiry_date }
        //       : email
        //   )
        // );
      }
    } catch (error) {
      toast.error("Failed to update date.");
    }
  };

    const updateStatus = async ( userId) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: userId,
        userType:"admin",
      });

      if (response.status === 200) {
        toast.success("User Type Updated Successfully");
        fetchAdminUser();
      }
    } catch (error) {
      toast.error("Failed to update user type");
      console.log("error:", error);
    }
  };

  const table = useReactTable({
    data: adminUsers,
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
                value={(table.getColumn("email")?.getFilterValue()) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
              />
              <div className="absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2">
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
      {
        viewUserModalOpen && (
          <UserDetails userId={viewUser} isOpen={viewUserModalOpen} onClose={() => setViewUserModalOpen(false)} />
        )
      }
    </div>
  );
}
