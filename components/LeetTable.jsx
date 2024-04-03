'use client'

import Link from 'next/link';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '@styles/aggrid.css'
import datesRenderer from './cell-renderers/datesRenderer';
import statusRenderer from './cell-renderers/statusRenderer';
import difficultyRenderer from './cell-renderers/difficultyRenderer';
import priorityRenderer from './cell-renderers/priorityRenderer';
import notesRenderer from './cell-renderers/notesRenderer';

const LeetTable = () => {
  const router = useRouter();
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { data: session } = useSession();
  const [rowData, setRowData] = useState([
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/records`);
      const data = await response.json();
      setRowData(data)
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const colDefs = useMemo(() => {
    return [
      { field: "title", flex: 2, checkboxSelection: true, headerCheckboxSelection: true },
      { field: "difficulty", flex: 1, cellRenderer: difficultyRenderer, },
      { field: "priority", flex: 1, cellRenderer: priorityRenderer },
      { field: "status", flex: 1, cellRenderer: statusRenderer },
      { field: "dates", flex: 2, cellRenderer: datesRenderer },
      { field: 'notes', flex: 1, cellRenderer: notesRenderer }
    ]
  }, [])

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      minWidth: 100,
      cellStyle: { display: 'flex', alignItems: 'center' }
    }
  }, []);

  const onSelectionChanged = useCallback(() => {
    console.log(gridRef.current.api.getSelectedRows());
  }, [])

  const handleEditRecord = (event) => {
    if (gridRef.current.api.getSelectedRows().length !== 1) {
      alert('Please select one row');
      return
    }

    router.push("/edit-record")
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
    >
      <div className='flex gap-3 md:gap-5 mb-5'>
        <Link
          href='/create-record'
        >
          <button
            type='button'
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

      <div style={containerStyle}>
        <div
          style={{ ...gridStyle, height: 700 }}
          className={
            "ag-theme-quartz"
          }
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection="multiple"
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </div>
    </div >
  )
}

export default LeetTable