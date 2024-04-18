'use client'

import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '@styles/aggrid.css'
import datesRenderer from './cell-renderers/datesRenderer';
import statusRenderer from './cell-renderers/statusRenderer';
import difficultyRenderer from './cell-renderers/difficultyRenderer';
import priorityRenderer from './cell-renderers/priorityRenderer';
import notesRenderer from './cell-renderers/notesRenderer';
import compareDates from '@utils/compareDates';

const LeetTable = () => {
  const router = useRouter();
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { data: session } = useSession();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/records`);
      const data = await response.json();
      data.sort((nodeA, nodeB) => {
        nodeA.dates.sort(compareDates)
        nodeB.dates.sort(compareDates)
        if (compareDates(nodeA.dates[0], nodeB.dates[0]) === -1) {
          return -1
        } else {
          return 1
        }
      })
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
      cellStyle: { display: 'flex', alignItems: 'center', textOverflow: 'ellipsis' }
    }
  }, []);

  const handleEditRecord = () => {
    if (gridRef.current.api.getSelectedRows().length !== 1) {
      alert('Please select one row to edit.');
      return
    }

    const record = gridRef.current.api.getSelectedRows()[0]
    router.push(`/edit-record?id=${record._id}`)
  }

  const handldDeleteRecord = async (event) => {
    if (gridRef.current.api.getSelectedRows().length !== 1) {
      alert('Please select one row to delete.');
      return
    }
    const record = gridRef.current.api.getSelectedRows()[0]
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/record/${record._id.toString()}`, {
          method: "DELETE",
        });

        const filteredRowData = rowData.filter((item) => item._id !== record._id);

        setRowData(filteredRowData);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('delete cancelled.');
    }
  }

  return (
    <div className="ag-theme-quartz w-full">
      {session?.user.id ? (<div className='flex gap-3 md:gap-5 mb-5'>
        <Link
          href='/create-record'
        >
          <button type='button' className='black_btn '>Create Record</button>
        </Link>
        <button type='button' onClick={handleEditRecord} className='outline_btn'>Edit</ button>
        <button type='button' onClick={handldDeleteRecord} className='outline_btn'>Delete</button>
      </ div>) :
        (<div className='logo_text'>Please sign in to see more data!</ div>)}

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
          />
        </div>
      </div>
    </div >
  )
}

export default LeetTable