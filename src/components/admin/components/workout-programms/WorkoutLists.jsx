import { base_url } from "@/api/baseUrl";
import { deleteWorkout } from "@/api/deleteData";
import Loading from "@/components/common/Loading";
import PaginationComp from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ArrowUpDown, Edit, Loader2, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import WorkoutDetails from "./WorkoutDetails";
import { useDebounce } from "@/hooks/useDebounce";
import { UI_TEXT } from "@/constants/hebrewText";

export default function WorkoutLists() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [workout, setWorkout] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWorkout, setselectedWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const prevDebouncedSearch = useRef(debouncedSearch);

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם האימון
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
          תיאור האימון
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
        const workoutId = row.original._id;
        return (
          <div className="flex space-x-2">
            <WorkoutDetails workoutId={workoutId} />
            <Link to={`/dashboard/edit-workout/${row.original._id}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-[#7994CB]"
              size="sm"
              onClick={() => handleOpenDeleteModal(workoutId)}
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
    setselectedWorkout(exercise);
    setDeleteModalOpen(true);
  };

  const fetchWorkouts = useCallback(async (pageToFetch, searchTerm) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pageToFetch),
        limit: "10",
      });

      const trimmedSearch = String(searchTerm ?? "").trim();
      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      }

      const response = await axios.get(`${base_url}/workout?${params.toString()}`);
      if (response.status === 200) {
        const data = response.data.data ?? [];
        const pagination = response.data.pagination ?? {};

        if (data.length === 0 && pageToFetch > 1) {
          setPage(pageToFetch - 1);
          return;
        }

        setWorkout(data);
        setTotalPages(
          pagination.pages ?? pagination.totalPages ?? pagination.total_pages ?? 1
        );
        setPage(
          pagination.page ??
            pagination.currentPage ??
            pagination.current_page ??
            pageToFetch
        );
      }
    } catch (error) {
      console.error("Error fetching workout:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async () => {
    if (!selectedWorkout || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteWorkout(selectedWorkout);
      setDeleteModalOpen(false);
      setselectedWorkout(null);
      await fetchWorkouts(page, debouncedSearch);
    } catch (error) {
      console.error("Error deleting workout:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const searchChanged = prevDebouncedSearch.current !== debouncedSearch;
    prevDebouncedSearch.current = debouncedSearch;

    const requestPage = searchChanged ? 1 : page;
    if (searchChanged && page !== 1) {
      setPage(1);
    }

    fetchWorkouts(requestPage, debouncedSearch);
  }, [page, debouncedSearch, fetchWorkouts]);

  const table = useReactTable({
    data: workout,
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
              className="flex justify-between items-center relative max-w-sm h-12"
              dir="rtl"
            >
              <input
                type="search"
                name=""
                id=""
                placeholder="שם מסנן...."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
              />
              <div className="absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2">
                <GoSearch className="text-white" />
              </div>
            </div>
            <Link to="/dashboard/workout-programme">
              <Button className="bg-[#7994CB] uppercase font-medium" size="sm">
                הוסף אימון חדש
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
                      {UI_TEXT.noResults}
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
            <DialogTitle>{UI_TEXT.confirmDeletion}</DialogTitle>
          </DialogHeader>
          <p>האם אתה בטוח שברצונך למחוק אימון זה?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              {UI_TEXT.cancel}
            </Button>
            <Button
              className="bg-[#7994CB] text-white"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {UI_TEXT.deleting}
                </span>
              ) : (
                UI_TEXT.delete
              )}
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
