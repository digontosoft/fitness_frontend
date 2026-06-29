import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Loader2, Trash } from "lucide-react";
import moment from "moment";
import * as React from "react";

import { updateApprovedMail } from "@/api/approvedMail";
import { base_url } from "@/api/baseUrl";
import { deleteEmail } from "@/api/deleteData";
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
import { UI_TEXT } from "@/constants/hebrewText";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { toast } from "sonner";
import AddMail from "./AddMail";

export function ApproveMailTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [emails, setEmails] = React.useState([]);
  const [loading, setLoading]=React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const columns = [
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            דואר אלקטרוני
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "expiry_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            תאריך סיום
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {row.getValue("expiry_date") &&
            moment(row.getValue("expiry_date")).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        //console.log("row", row);
        const id = row.original._id;
        return (
          <div className="flex space-x-2">
            {/* <EditApproveMail id={id} updateDate={updateDate} /> */}

            <Button
              className="bg-[#7994CB]"
              size="sm"
              onClick={() => handleOpenDeleteModal(row.original)}
            >
              <Trash />
            </Button>
            <Button
              // variant="secondary"
              className="border bg-white hover:bg-white"
              size="sm"
              onClick={() => handleStatus(row.original)}
            >
              {row.original.isActive === true ? (
                <span className="text-[#7994CB]">בטל מנוי</span>
              ) : (
                <span className="text-green-500">{UI_TEXT.activate}</span>
              )}
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const updateDate = async (data) => {
    try {
      const response = await updateApprovedMail({
        email: data.email,
        expiry_date: data.expiry_date,
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.status !== undefined && { status: data.status }),
      });
      if (response.status === 200) {
        toast.success("התאריך עודכן בהצלחה.");
        setEmails((prevEmails) =>
          prevEmails.map((email) =>
            email.email === data.email
              ? { ...email, expiry_date: data.expiry_date }
              : email
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

  const handleStatus = async (rowData) => {
    const updatedStatus = !rowData.isActive;
    const data = {
      ...rowData,
      isActive: updatedStatus,
    };
    // console.log("data", data);

    try {
      const response = await axios.patch(
        `${base_url}/update-approved-mail`,
        data
      );
      if (response.status === 200) {
        toast.success("האימייל המאושר עודכן בהצלחה");
        setEmails((prevEmails) =>
          prevEmails.map((email) =>
            email._id === rowData._id
              ? { ...email, isActive: updatedStatus }
              : email
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("עדכון הסטטוס נכשל.");
    }
  };

  const handleOpenDeleteModal = (rowData) => {
    setSelectedEmail(rowData);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedEmail || isDeleting) return;
    const payload = {
      email: selectedEmail?.email,
    };
    setIsDeleting(true);
    try {
      await deleteEmail(payload);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email._id !== selectedEmail._id)
      );
      setDeleteModalOpen(false);
      setSelectedEmail(null);
    } catch (error) {
      console.error("Error deleting email:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const table = useReactTable({
    data: emails,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${base_url}/approved-mail?limit=10&page=${page}&search=${search}`
      );
      setEmails(response.data.approvedEmail ?? []);
      setTotalPages(response.data.pagination?.totalPages ?? 1);
      setPage(response.data.pagination?.currentPage ?? page);
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handleEmailAdded = async () => {
    if (page !== 1) {
      setPage(1);
    } else {
      await fetchEmails();
    }
  };

  return (
    <div className="w-full" dir="ltr">
      <div className="flex sm:flex-row flex-col items-center sm:justify-between justify-center py-4 space-y-4 sm:space-y-0">
        <div
          className="flex justify-between items-center relative max-w-sm h-12"
          dir="rtl"
        >
          <input
            type="search"
            name=""
            id=""
            placeholder="סנן לפי כתובת דואר אלקטרוני..."
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
          />
          <div className="absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2">
            <GoSearch className="text-white" />
          </div>
        </div>

        <AddMail onEmailAdded={handleEmailAdded} />
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
          {/* <TableBody>

            {table.getRowModel().rows?.length ? (
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
          </TableBody> */}
          <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-[#7994CB] rounded-full animate-spin"></div>
        </div>
      </TableCell>
    </TableRow>
  ) : table.getRowModel().rows?.length ? (
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
      <TableCell colSpan={columns.length} className="h-24 text-center">
        {UI_TEXT.noResults}
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      {/* {open&& <EditApproveMail open={open} setOpen={setOpen} approveMail={approveMail}/>} */}

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{UI_TEXT.confirmDeletion}</DialogTitle>
          </DialogHeader>
          <p>האם אתה בטוח שברצונך למחוק כתובת דואר אלקטרוני זו?</p>
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
    </div>
  );
}
