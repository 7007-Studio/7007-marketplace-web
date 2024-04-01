"use client" 

import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from '../../data'
import { ChevronDown } from 'lucide-react';

export default function table() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'token',
        header: () => 'TOKEN',
        cell: info => (
          <div>
            <div>Token: {info.getValue()}</div>
            <div>(additional info here)</div>
          </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'price',
        header: () => 'PRICE',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'age',
        header: () => 'AGE',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'buys',
        header: () => <span>BUYS</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'sells',
        header: 'SELLS',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'volume',
        header: 'VOLUME',
        footer: props => props.column.id,
        sortDescFirst: true, // This column will sort in descending order first (default for number columns anyway)
      },
      {
        accessorKey: 'makers',
        header: 'MAKERS',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'liquidity',
        header: 'LIQUIDITY',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'fdv',
        header: 'FDV',
        footer: props => props.column.id,
      },
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData(10_000))
  const refreshData = () => setData(() => makeData(10_000))

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
  })

  return (
    <div className=" border-black border-2">
      <details className="dropdown">
        <summary className="m-1 btn">LAST 24 HOURS <ChevronDown /></summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box w-[85%]">
        <li><a>TRENDINGS</a></li>
        <li><a>1HR</a></li>
        <li><a>6HR</a></li>
        <li><a>24HR</a></li>
        <li><a>7DAYS</a></li>
        <li><a>30DAYS</a></li>
        <li><a>ALL</a></li>
      </ul>
      <div className="h-2 " />
      <table className='w-full border-t-2 border-black p-4'>
        <thead className=''>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none text-left	'
                            : 'text-left	'
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length.toLocaleString()} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
);
}
