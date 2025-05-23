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
import ExerciseDetails from "./ExerciseDetails";
import { deleteExercise } from "@/api/deleteData";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Select from "react-dropdown-select";
import PaginationComp from "@/components/pagination";
import { GoSearch } from "react-icons/go";
import Loading from "@/components/common/Loading";

const bodyPartOptions = [
  { label: "כל חלקי הגוף", value: "" },
  {
    label: "יד קדמית",
    value: "יד קדמית",
  },
  {
    label: "יד אחורית",
    value: "יד אחורית",
  },
  { label: "כתפיים", value: "כתפיים" },
  { label: "חזה", value: "חזה" },
  { label: "גב", value: "גב" },
  { label: "רגליים", value: "רגליים" },
  { label: "בטן", value: "בטן" },
  { label: "ישבן", value: "ישבן" },
  { label: "גב תחתון", value: "גב תחתון" },
];

const equipmentOptions = [
  { label: "כל הציוד", value: "" },
  { label: "ללא ציוד", value: "ללא ציוד" },
  { label: "TRX", value: "TRX" },
  { label: "גומיות", value: "גומיות" },
  { label: "משקולות", value: "משקולות" },
  { label: "מכונות", value: "מכונות" },
  { label: "מוטות", value: "מוטות" },
  { label: "פולי", value: "פולי" },
];

export function ExerciseTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [exercise, setExercise] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [body_part, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם התרגיל
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
          הוראות לתרגיל
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
      accessorKey: "body_part",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          אזור בגוף
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("body_part")}</div>
      ),
    },
    {
      accessorKey: "equipment",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ציוד
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("equipment")}</div>
      ),
    },
    {
      accessorKey: "video_url",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          לינק לסרטון התרגיל
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">
          <a
            href={row.getValue("video_url")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.getValue("video_url")}
          </a>
        </div>
      ),
    },
    {
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        const exerciseId = row.original._id;
        return (
          <div className="flex space-x-2">
            <ExerciseDetails exerciseId={exerciseId} />
            <Link to={`/dashboard/edit-exercise/${row.original._id}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-customBg"
              size="sm"
              onClick={() => handleOpenDeleteModal(row.original)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleOpenDeleteModal = (exercise) => {
    setSelectedExercise(exercise);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedExercise) return;
    try {
      await deleteExercise(selectedExercise._id);
      setExercise((prevExercise) =>
        prevExercise.filter((e) => e._id !== selectedExercise._id)
      );
      setDeleteModalOpen(false);
      setSelectedExercise(null);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/exercise?search=${searchValue}&body_part=${body_part}&equipment=${equipment}&page=${page}&limit=10`
        );
        if (response.status === 200) {
          setExercise(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          setPage(response.data.pagination.currentPage);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercise();
  }, [searchValue, body_part, equipment, page, totalPages]);

  const table = useReactTable({
    data: exercise,
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
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-3">
            <div
              className="flex justify-between items-center relative min-w-40 h-12"
              dir="rtl"
            >
              <input
                type="search"
                name=""
                id=""
                placeholder="סנן לפי שם"
                onChange={(e) => setSearchValue(e.target.value)}
                className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-40 h-12"
              />
              <div className="absolute bg-red-700 w-8 h-8 rounded-full flex justify-center items-center left-2">
                <GoSearch className="text-white" />
              </div>
            </div>

            <Select
              direction="rtl"
              className="min-w-40 h-12 border-2 p-2"
              placeholder="סנן לפי חלק בגוף"
              options={bodyPartOptions}
              onChange={(e) => setBodyPart(e[0].value)}
            />
            <Select
              direction="rtl"
              options={equipmentOptions}
              className=" min-w-40   rounded-lg h-12 border-2 p-2"
              placeholder="סנן לפי ציוד"
              onChange={(e) => setEquipment(e[0].value)}
            />
            <Link to="/dashboard/exercise-library">
              <Button className="bg-customBg uppercase font-medium" size="sm">
                הוסף תרגיל חדש
              </Button>
            </Link>
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
