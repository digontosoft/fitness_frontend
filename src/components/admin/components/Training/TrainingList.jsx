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
import { ArrowUpDown, Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { deleteTraining } from "@/api/deleteData";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComp from "@/components/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoSearch } from "react-icons/go";
import { UI_TEXT } from "@/constants/hebrewText";
import TrainingDetails from "./TrainingDetails";

export function TrainingList() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [training, setTraining] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { state: userId } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const prevDebouncedSearch = useRef(debouncedSearch);

  useEffect(() => {
    const fetchData = async () => {
      const searchChanged = prevDebouncedSearch.current !== debouncedSearch;
      prevDebouncedSearch.current = debouncedSearch;

      const requestPage = searchChanged ? 1 : page;
      if (searchChanged && page !== 1) {
        setPage(1);
      }

      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(requestPage),
          limit: "10",
        });
        const trimmedSearch = debouncedSearch.trim();
        if (trimmedSearch) {
          params.set("search", trimmedSearch);
        }

        const response = await axios.get(
          `${base_url}/training?${params.toString()}`
        );
        if (response.status === 200) {
          setTraining(response.data.data ?? []);
          setTotalPages(
            response.data.pagination?.pages ??
              response.data.pagination?.totalPages ??
              1
          );
          setPage(
            response.data.pagination?.page ??
              response.data.pagination?.currentPage ??
              requestPage
          );
        }
      } catch (error) {
        console.error("Error fetching training:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, debouncedSearch]);
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם תוכנית אימון
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
            <TrainingDetails trainingId={trainingId} />
            <Link to={`/dashboard/edit-training/${row.original._id}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-[#7994CB]"
              size="sm"
              onClick={() => handleOpenDeleteModal(trainingId)}
            >
              <Trash />
            </Button>
            {userId ? (
              <Link
                to={`/dashboard/assign-training/${row.original._id}/${userId}`}
              >
                <Button className="bg-[#7994CB]" size="sm">
                  {/* שייך תוכנית אימון */}
                  שייך אימון למתאמן
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleOpenDeleteModal = (trainingId) => {
    // console.log('training id:', trainingId)
    setSelectedTraining(trainingId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTraining || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteTraining(selectedTraining);
      setTraining((prevTraining) =>
        prevTraining.filter((e) => e._id !== selectedTraining)
      );
      setDeleteModalOpen(false);
      setSelectedTraining(null);
    } catch (error) {
      console.error("Error deleting training:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  

  const table = useReactTable({
    data: training || [],
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
        <div
          className="flex justify-between items-center relative max-w-sm h-12"
          dir="rtl"
        >
          <input
            type="search"
            placeholder="סנן לפי שם תוכנית אימון..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
          />
          <div className="absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2">
            <GoSearch className="text-white" />
          </div>
        </div>
        {user.userType === "supperadmin" && (
          <Link to="/dashboard/add-training-program">
            <Button className="bg-[#7994CB] uppercase font-medium" size="sm">
              צור תוכנית אימון{" "}
            </Button>
          </Link>
        )}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 border-4 border-gray-300 border-t-[#7994CB] rounded-full animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
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
          <p>{UI_TEXT.confirmDeletionTraining}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              {UI_TEXT.cancel}
            </Button>
            <Button className="bg-[#7994CB] text-white" onClick={handleDelete} disabled={isDeleting}>
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
