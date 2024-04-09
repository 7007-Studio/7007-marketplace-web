"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { makeData, TradingTable } from "../../../data";
import { ChevronDown } from "lucide-react";

export default function Table() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [clickedItem, setClickedItem] = useState<string | null>("1");

  const columns = React.useMemo<ColumnDef<TradingTable>[]>(
    () => [
      {
        accessorKey: "token",
        header: (isFirstColumn) => (
          <div className={`ml-${isFirstColumn ? "5" : "0"} py-2 text-sm` }>TOKEN</div>
        ),
        cell: (info) => (
          <div className="ml-5 py-4">
            <div className="flex gap-2 text-md">
              <span className="text-white/60">#1</span>
              <img
                className="w-[20px] h-[20px]"
                src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png"
                alt=""
              />{" "}
              <span><>{info.getValue()}</> / SOL</span> 
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span>
                <img
                  className="w-[10px] h-[10px]"
                  src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png"
                  alt=""
                />{" "}
              </span>{" "}
              godme of meme
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "price",
        header: () => <span className="px-2 text-sm">PRICE</span>,
        cell: (info) => (
          <div className="flex gap-2 px-2 text-sm">
           $  <>{info.getValue()}</> 
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => <span className="px-2 text-sm">AGE</span>,
        cell: (info) => (
          <div className="flex gap-1 text-sm">
            <>{info.getValue()}H {info.getValue()}M</> 
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "buys",
        header: () => <span className="px-2 text-sm">BUYS</span>,
        cell: (info) => (
          <div className="px-2 text-sm">
            <>{info.getValue()}</> 
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "sells",
        header: () => <span className="px-2 text-sm">SELLS</span>,
        cell: (info) => (
          <div className="px-2 text-sm">
            <>{info.getValue()}</> 
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "volume",
        header: () => <span className="px-2 text-sm">VOLUME</span>,
        cell: (info) => (
          <div className="flex gap-2 px-2 text-sm">
           $  <>{info.getValue()}</> M
          </div>
        ),
        footer: (props) => props.column.id,
        sortDescFirst: true, // This column will sort in descending order first (default for number columns anyway)
      },
      {
        accessorKey: "makers",
        header: () => <span className="px-2 text-sm">MAKERS</span>,
        cell: (info) => (
          <div className="flex gap-2 px-2 text-sm">
            <>{info.getValue()}</> 
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "time",
        header: () => (
          <span className="flex px-2 text-sm">
            5M <ChevronDown />
          </span>
        ),
        cell: (info) => (
          <div
            style={{
              color: Number(info.getValue()) > 0 ? "#1D9E4B" : "#F64646",
            }}
            className="flex gap-2 px-2 text-sm"
          >
            <>{info.getValue()}</> %
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "liquidity",
        header: () => <span className="px-2 text-sm">LIQUIDITY</span>,
        cell: (info) => (
          <div className="flex gap-2 px-2 text-sm">
           $  <>{info.getValue()}</>M
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "fdv",
        header: () => <span className="px-2 text-sm">FDV</span>,
        cell: (info) => (
          <div className="flex gap-2 text-sm">
           $  <>{info.getValue()}</>M
          </div>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(10_000));

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleClickTimeFilter = (timeFilter: string) => {
    setClickedItem(timeFilter);
  };

  return (
    <div className=" border-white rounded-md my-4 border-2 col-span-10">
      <div className="flex border-b-2 border-white">
        <details className="dropdown">
          <summary
            style={{ backgroundColor: "#313131CC", height: "10px" }}
            className="m-1 btn text-white border-none"
          >
            LAST 24 HOURS <ChevronDown />
          </summary>
          <ul
            style={{ backgroundColor: "#313131CC", color: "text-white/0" }}
            className="p-2 shadow menu dropdown-content z-[1] bg-red-500 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </details>
        <div className="2xl:w-1/2 flex justify-start items-center">
          <ul className="menu menu-vertical lg:menu-horizontal text-white/50 flex items-center">
            <span>TREDNINGS</span>
            <li
              className="border-r-2 border-grey"
              onClick={() => handleClickTimeFilter("1")}
            >
              <a className={clickedItem === "1" ? "text-white" : ""}>1HR</a>
            </li>
            <li
              className="border-r-2  border-grey"
              onClick={() => handleClickTimeFilter("6")}
            >
              <a className={clickedItem === "6" ? "text-white" : ""}>6HR</a>
            </li>
            <li
              className="border-r-2  border-grey"
              onClick={() => handleClickTimeFilter("24")}
            >
              <a className={clickedItem === "24" ? "text-white" : ""}>24HR</a>
            </li>
            <li
              className="border-r-2  border-grey"
              onClick={() => handleClickTimeFilter("168")}
            >
              <a className={clickedItem === "168" ? "text-white" : ""}>7DAYS</a>
            </li>
            <li
              className="border-r-2  border-grey"
              onClick={() => handleClickTimeFilter("720")}
            >
              <a className={clickedItem === "720" ? "text-white" : ""}>
                30DAYS
              </a>
            </li>
            <li
              className="border-r-2  border-grey"
              onClick={() => handleClickTimeFilter("1000000")}
            >
              <a className={clickedItem === "1000000" ? "text-white" : ""}>
                ALL
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-2 " />
      <table className="w-[100%] border-t-2 border-black">
        <thead
          style={{ paddingLeft: "0.8rem" }}
          className="border-b-2 border-grey"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="pl-4" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none text-left"
                            : "text-left	"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="mx-5">
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <div>{table.getRowModel().rows.length.toLocaleString()} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre> */}
    </div>
  );
}
