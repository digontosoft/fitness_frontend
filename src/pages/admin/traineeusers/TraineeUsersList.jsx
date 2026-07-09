import { updateApprovedMail } from "@/api/approvedMail";
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
import { UI_TEXT } from "@/constants/hebrewText";
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
  const fetchAdminUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/traineelistforadmin?adminId=${userData?._id}`);
      setAdminUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
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
           
            <EditApproveMail
              id={userId}
              email={row.original.email}
              updateDate={updateDate}
              defaultExpiryDate={row.original.expiry_date}
            />
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
                :"מנהל"}
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
      // console.log("delete:", data.user_id);
      if (response.status === 200) {
        toast.success("המשתמש נמחק בהצלחה.");
      }
      setUsers((prevUsers) => prevUsers.filter((e) => e._id !== selectedUser));
      setDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

   const updateDate = async (data) => {
    if (!data?.email) {
      toast.error("נדרש דואר אלקטרוני לעדכון תאריך התפוגה.");
      throw new Error("Missing email");
    }
    try {
      const response = await updateApprovedMail({
        email: data.email,
        expiry_date: data.expiry_date,
      });
      if (response.status === 200) {
        toast.success("התאריך עודכן בהצלחה.");
        setAdminUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === data.email
              ? { ...user, expiry_date: data.expiry_date }
              : user
          )
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "עדכון התאריך נכשל."
      );
      throw error;
    }
  };

    const updateStatus = async ( userId) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: userId,
        userType:"admin",
      });

      if (response.status === 200) {
        toast.success("סוג המשתמש עודכן בהצלחה");
        fetchAdminUser();
      }
    } catch (error) {
      toast.error("עדכון סוג המשתמש נכשל");
      // console.log("error:", error);
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

  if (loading) {
    return (
      <div className="w-full" dir="ltr">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full" dir="ltr">
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
            value={(table.getColumn("full_name")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("full_name")?.setFilterValue(event.target.value)
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
                  {UI_TEXT.noResults}
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
            <DialogTitle>{UI_TEXT.confirmDeletion}</DialogTitle>
          </DialogHeader>
          <p>{UI_TEXT.confirmDeletionUser}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              {UI_TEXT.cancel}
            </Button>
            <Button className="bg-[#7994CB] text-white" onClick={handleDelete}>
              {UI_TEXT.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComp
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(p) => table.setPageIndex(p - 1)}
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
