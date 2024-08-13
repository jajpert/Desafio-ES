import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import BlockIcon from "@mui/icons-material/Block";
import Checkbox from "@mui/material/Checkbox";
import type { BaseTable, Lista } from "../types/table.types";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Table({ data }: BaseTable<Lista>) {
  const [tableData, setTableData] = useState<Lista[]>(data);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const handleStatusChange = async (id: number, isActive: boolean) => {
    try {
      const updatedStatus = !isActive;
      await axios.patch(`http://localhost:3001/editarStatusInst/${id}`, {
        ativo: updatedStatus,
      });

      // Atualizar a tabela após a alteração do status
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ativo: updatedStatus } : item,
        ),
      );

      setCheckedIds((prev) => {
        const updatedSet = new Set(prev);
        if (updatedStatus) {
          updatedSet.add(id);
        } else {
          updatedSet.delete(id);
        }
        return updatedSet;
      });

      console.log("Status atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  const columns = useMemo<ColumnDef<Lista>[]>(
    () => [
      {
        accessorKey: "nome",
        header: "Nome",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "sigla",
        header: "Sigla",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "pais",
        header: "País",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ativo",
        header: "Ações",
        cell: (info) => {
          const isActive: boolean = Boolean(info.getValue());
          const id = info.row.original.id;

          return (
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                {isActive ? (
                  <>
                    <Link to={`/visualizar?id=${id}`}>
                      <VisibilityIcon
                        sx={{ color: "#5d5d5d", cursor: "pointer" }}
                      />
                    </Link>
                    <Link
                      to={`/editar?id=${id}`}
                      className="ml-4 cursor-pointer"
                    >
                      <CreateIcon
                        sx={{ color: "#20a0e5", cursor: "pointer" }}
                      />
                    </Link>
                    <BlockIcon
                      sx={{ color: "#a2051f", cursor: "pointer" }}
                      onClick={() => handleStatusChange(id, isActive)}
                    />
                  </>
                ) : (
                  <Checkbox
                    sx={{ cursor: "pointer" }}
                    checked={checkedIds.has(id)}
                    onChange={() => handleStatusChange(id, isActive)}
                  />
                )}
              </div>
            </div>
          );
        },
      },
    ],
    [checkedIds, tableData],
  );

  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded border border-gray-300 text-left">
          <thead className="border-b-2 bg-blue-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="cursor-pointer text-white whitespace-nowrap px-4 py-2 text-left font-montserrat text-sm font-medium tracking-wide"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "flex cursor-pointer select-none"
                            : "flex",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => {
              const isActive = Boolean(row.original.ativo);
              return (
                <tr
                  key={row.id}
                  className={`${isActive ? "" : "bg-[#e2e2e2]"}`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="whitespace-normal p-1 px-5 font-montserrat text-sm"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow-hidden whitespace-normal">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex items-center gap-2">
          <span>Itens por página</span>
          <select
            className="cursor-pointer border-0 p-1 text-base font-semibold outline-0"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize.toLocaleString("pt-BR", { minimumIntegerDigits: 2 })}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div>Página</div>
            <strong>
              {(table.getState().pagination.pageIndex + 1).toLocaleString(
                "pt-BR",
                {
                  minimumIntegerDigits: 2,
                },
              )}
            </strong>
            {" de "}
            <strong>
              {table
                .getPageCount()
                .toLocaleString("pt-BR", { minimumIntegerDigits: 2 })}
            </strong>
          </span>

          <span className="flex items-center gap-1">| Ir para:</span>
          <select
            className="cursor-pointer border-0 p-1 text-base font-semibold outline-0"
            value={table.getState().pagination.pageIndex}
            onChange={(e) => table.setPageIndex(Number(e.target.value))}
          >
            {[...Array(table.getPageCount())].map((_, index) => (
              <option key={index} value={index}>
                {" "}
                {(index + 1).toLocaleString("pt-BR", {
                  minimumIntegerDigits: 2,
                })}
              </option>
            ))}
          </select>

          <button
            className="cursor-pointer rounded border-none bg-inherit px-2 py-1"
            onClick={(e) => {
              e.preventDefault();
              table.firstPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="cursor-pointer rounded border-none bg-inherit px-2 py-1"
            onClick={(e) => {
              e.preventDefault();
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="cursor-pointer rounded border-none bg-inherit px-2 py-1"
            onClick={(e) => {
              e.preventDefault();
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="cursor-pointer rounded border-none bg-inherit px-2 py-1"
            onClick={(e) => {
              e.preventDefault();
              table.lastPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
