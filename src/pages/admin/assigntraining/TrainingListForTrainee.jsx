import { base_url } from "@/api/baseUrl";
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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ExerciseDetails from "./ExerciseDetails";
import { deleteUserTraining } from "@/api/deleteData";
import PaginationComp from "@/components/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TrainingForTraineeDetails from "./TrainingForTraineeDetails";
// import TrainingDetails from "./TrainingDetails";

export function TrainingListForTrainee({ userId }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [training, setTraining] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [user, setUser] = useState({});
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  const updateStatus = async (userType) => {
    try {
      await axios.post(`${base_url}/updateUserInfo`, {
        user_id: user._id,
        userType,
      });
      setUser((prevUser) => ({
        ...prevUser,
        userType,
      }));
    } catch (error) {
      error;
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          סנן לפי שם תוכנית אימון
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          תיאור תוכנית אימון
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const description = row.getValue("description") || "";
        const truncatedDescription =
          description.length > 100
            ? description.slice(0, 100) + "..."
            : description;
        return <div className="lowercase">{truncatedDescription}</div>;
      },
    },
    {
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        const trainingId = row.original._id;
        return (
          <div className="flex space-x-2">
            <TrainingForTraineeDetails trainingId={trainingId} />
            <Link to={`/dashboard/edit-training/${trainingId}/${userId}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-customBg"
              size="sm"
              onClick={() => handleOpenDeleteModal(trainingId)}
            >
              <Trash />
            </Button>
            <Button
              className="bg-green-100 hover:bg-green-100 text-green-500 font-bold uppercase tracking-wide"
              size="sm"
            >
              {row.original.status === "active"
                ? "תוכנית אימון פעילה"
                : "תוכנית אימון לא פעילה"}
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleOpenDeleteModal = (trainingId) => {
    setSelectedTraining(trainingId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTraining) return;
    try {
      await deleteUserTraining(selectedTraining);
      setTraining((prevTraining) =>
        prevTraining.filter((e) => e._id !== selectedTraining)
      );
      setDeleteModalOpen(false);
      setSelectedTraining(null);
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/get-training-by-user-id/${userId}?page=${page}&&limit=10&&search=${search}`
        );
        setTraining(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setPage(response.data.pagination.page);
        console.log("response:", response);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchData();
  }, [userId, page, totalPages, search]);

  const table = useReactTable({
    data: training,
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
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-3">
        <Input
          dir="rtl"
          placeholder="סנן לפי שם תוכנית אימון ..."
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
      <div className="flex gap-3">
         {
        userData?.userType === "admin" ?
         <Link to={`/admin-dashboard/training-list`} state={userId}>
          <Button className="bg-customBg uppercase font-medium" size="sm">
            שייך אימון למתאמן
          </Button>
        </Link>
        :
         <Link to={`/dashboard/training-list`} state={userId}>
          <Button className="bg-customBg uppercase font-medium" size="sm">
            שייך אימון למתאמן
          </Button>
        </Link>
       }
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
                  לא הוקצו תוכניות אימון למתאמן
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
          <p>Are you sure you want to delete this exercise?</p>
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
