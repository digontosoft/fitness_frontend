import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import moment from "moment";
import * as React from "react";

import { base_url } from "@/api/baseUrl";
import { deleteEmail } from "@/api/deleteData";
import PaginationComp from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { toast } from "sonner";
import AddMail from "./AddMail";

export function ApproveMailTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [emails, setEmails] = React.useState([]);

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
              onClick={() => handleDelete(row.original)}
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
                <span className="text-green-500">Activate</span>
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
      const response = await axios.patch(
        `${base_url}/update-approved-mail`,
        data
      );
      if (response.status === 200) {
        toast.success("Date updated successfully.");
        setEmails((prevEmails) =>
          prevEmails.map((email) =>
            email._id === data._id
              ? { ...email, expiry_date: data.expiry_date }
              : email
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update date.");
    }
  };

  const handleStatus = async (rowData) => {
    const updatedStatus = !rowData.isActive;
    const data = {
      ...rowData,
      isActive: updatedStatus,
    };
    console.log("data", data);

    // try {
    //   const response = await axios.patch(
    //     `${base_url}/update-approved-mail`,
    //     data
    //   );
    //   if (response.status === 200) {
    //     toast.success(response.data.message);
    //     setEmails((prevEmails) =>
    //       prevEmails.map((email) =>
    //         email._id === rowData._id
    //           ? { ...email, isActive: updatedStatus }
    //           : email
    //       )
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error updating status:", error);
    //   toast.error("Failed to update status.");
    // }
  };

  const handleDelete = async (rowData) => {
    const payload = {
      email: rowData?.email,
      // isActive: false,
      // status: 0,
    };
    console.log("emaildDelete:", payload);
    try {
      await deleteEmail(payload);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email._id !== rowData._id)
      );
    } catch (error) {
      console.error("Error deleting email:", error);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/approved-mail?limit=10&page=${page}&search=${search}`
        );
        console.log("emails:", response.data);
        setEmails(response.data.approvedEmail);
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.currentPage);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchData();
  }, [page, totalPages, search]);

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

        <AddMail setEmails={setEmails} />
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
                  No results.
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
    </div>
  );
}
