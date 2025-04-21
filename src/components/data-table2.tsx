"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, MoreVertical, Filter } from "lucide-react" // Import Filter icon
import { useState } from "react"

type ComplaintData = {
  id: number
  judul_pengaduan: string
  deskripsi_pengaduan: string
  cuaca: string
  nilai_kerusakan: string
  alamat: string
  status: string
}

interface DataTableProps {
  data: ComplaintData[]
}

export function DataTable({ data }: DataTableProps) {
  const [showTable, setShowTable] = useState(true)
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<ComplaintData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "judul_pengaduan",
      header: "Judul Pengaduan",
      cell: ({ row }) => (
        <span className="font-bold">{row.original.judul_pengaduan}</span>
      ),
    },
    {
      accessorKey: "deskripsi_pengaduan",
      header: "Deskripsi Pengaduan",
      cell: ({ row }) => row.original.deskripsi_pengaduan,
    },
    {
      accessorKey: "cuaca",
      header: "Cuaca",
      cell: ({ row }) => row.original.cuaca,
    },
    {
      accessorKey: "nilai_kerusakan",
      header: "Nilai Kerusakan",
      cell: ({ row }) => row.original.nilai_kerusakan,
    },
    {
      accessorKey: "alamat",
      header: "Alamat",
      cell: ({ row }) => row.original.alamat,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.original.status,
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold">Data Laporan</h2>
        <div className="flex gap-2">
          {/* Filter Button with Filter Icon */}
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> {/* Filter Icon */}
            Filters
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-2"
          >
            {showTable ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span>{showTable ? "Sembunyikan" : "Tampilkan"}</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      {showTable && (
        <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
          <div className="w-full min-w-[1335px] mx-auto px-4">
            <table className="min-w-full text-sm text-gray-700 dark:text-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-300 border-b dark:border-gray-700"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-3 border-b dark:border-gray-700"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {showTable && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            &lt;
          </Button>
          {Array.from({ length: table.getPageCount() }).map((_, index) => (
            <Button
              key={index}
              variant={table.getState().pagination.pageIndex === index ? "default" : "ghost"}
              size="icon"
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  )
}
