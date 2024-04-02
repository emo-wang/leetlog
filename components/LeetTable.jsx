'use client'

import Link from 'next/link';
import { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const LeetTable = () => {
  const [rowData, setRowData] = useState([
    { title: "9. Palindrome Number", difficulty: "Middle", priority: 'Low', status: 'Solved', attempts: 1, dates: 20240316, comments: ["test1", "test2"] },
    { title: "49. Group Anagrams", difficulty: "Middle", priority: 'High', status: 'Solved', attempts: 1, dates: 20240316, comments: [] },
    { title: "108. Convert Sorted Array to Binary Search Tree", difficulty: "Middle", priority: 'Low', status: 'Solved', attempts: 1, dates: 20240317, comments: ["test1", "test2"] },
  ]);

  const onGridReady = useCallback(() => {
    // todo: request data

  }, []);

  const [colDefs, setColDefs] = useState([
    { field: "title", flex: 2, checkboxSelection: true, },
    { field: "difficulty", flex: 1 },
    { field: "priority", flex: 1 },
    { field: "status", flex: 1 },
    { field: "attempts", flex: 1 },
    { field: "dates", flex: 2 },
    { field: 'comments', flex: 2 }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      minWidth: 120
    }
  }, []);

  const handleCreateRecord = (event) => {

  }

  const handleEditRecord = (event) => {

  }

  const handldDeleteRecord = (event) => {
    const text = prompt(`Type "delete" if you want to delete this record`);
    if (text === 'delete') {
      console.log('delete successfully');
    } else {
      console.log('delete cancelled');
    }
  }

  return (
    <div
      className="ag-theme-quartz w-full"
      style={{ height: 700 }}
    >
      <div className='flex gap-3 md:gap-5 mb-5'>
        <Link
          href='/create-record'
        >
          <button
            type='button'
            onClick={handleCreateRecord}
            className='black_btn '
          >
            Create Record
          </button>
        </Link>
        <button
          type='button'
          onClick={handleEditRecord}
          className='outline_btn'
        >
          Edit
        </button>
        <button
          type='button'
          onClick={handldDeleteRecord}
          className='outline_btn'
        >
          Delete
        </button>
      </div>

      <AgGridReact
        suppressRowClickSelection={true}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection="multiple"
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div >
  )
}

export default LeetTable