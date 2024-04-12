'use client'

import Link from "next/link";
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { formatDate } from "@utils/formatDate";

const Form = ({ type, record, setRecord, submitting, handleSubmit }) => {
	const [isEdittingHistory, setIsEdittingHistory] = useState(false)
	const [newHistory, setNewHistory] = useState({ dates: formatDate(new Date()), attempts: 2 })
	const [isAddingHistory, setIsAddingHistory] = useState(false)
	const [curHistoryIndex, setCurHistoryIndex] = useState(0)

	const handleEditOpen = (e, index) => {
		e.preventDefault()
		isAddingHistory && setIsAddingHistory(false)
		if (index === curHistoryIndex || !isEdittingHistory) {
			setIsEdittingHistory(!isEdittingHistory)
		}
		setCurHistoryIndex(index)
	}

	const handleAddOpen = (e) => {
		e.preventDefault()
		isEdittingHistory && setIsEdittingHistory(false)
		setIsAddingHistory(!isAddingHistory)
	}

	const handleAddHistory = (e) => {
		e.preventDefault()
		setRecord(prev => ({ ...prev, dates: [...prev.dates, newHistory.dates], attempts: [...prev.attempts, newHistory.attempts] }))
	}

	const handleDeleteHistory = (e) => {
		e.preventDefault()
		if (record.dates.length === 1) {
			alert("Please save at least one history")
			return
		}
		setRecord((prev) => {
			return {
				...prev,
				dates: prev.dates.filter((item, index) => index !== curHistoryIndex),
				attempts: prev.attempts.filter((item, index) => index !== curHistoryIndex)
			}
		})
	}


	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{type} Record</span>
			</h1>

			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism'
			>
				<div className='max-w-3xl flex gap-7'>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Title
						</span>
						<input
							value={record.title}
							onChange={(e) => setRecord({ ...record, title: e.target.value })}
							type='text'
							style={{ width: '280px' }}
							required
							className='form_input'
						/>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Difficulty
						</span>
						<select
							value={record.difficulty}
							onChange={(e) => { setRecord({ ...record, difficulty: parseInt(e.target.value) }) }}
							type='number'
							required
							className='form_input'
						>
							<option value={0}>easy</option>
							<option value={1}>medium-</option>
							<option value={2}>medium</option>
							<option value={3}>medium+</option>
							<option value={4}>hard</option>
						</select>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Priority
						</span>
						<select
							value={record.priority}
							onChange={(e) => setRecord({ ...record, priority: parseInt(e.target.value) })}
							type='number'
							required
							className='form_input'
						>
							<option value={0}>low</option>
							<option value={1}>medium-</option>
							<option value={2}>medium</option>
							<option value={3}>medium+</option>
							<option value={4}>high</option>
						</select>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Status
						</span>
						<select
							value={record.status}
							onChange={(e) => { setRecord({ ...record, status: parseInt(e.target.value) }) }}
							type='number'
							required
							className='form_input'
						>
							<option value={0}>Solved</option>
							<option value={1}>Unsolved</option>
							<option value={2}>Best Solution</option>
						</select>
					</label>
				</div>
				{type === "Create" &&
					<div className='max-w-3xl flex gap-6'>
						<label>
							<span className='font-satoshi font-semibold text-base text-gray-700'>
								Dates
							</span>
							<input
								value={record.dates}
								onChange={(e) => setRecord({ ...record, dates: e.target.value })}
								type='date'
								required
								className='form_input'
							/>
						</label>
					</div>}
				{type === 'Edit' && (
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							History
						</span>
						<Stack direction="row" className='mt-3' spacing={1}>
							{record.dates.map((item, index) => {
								return (
									<Tooltip
										onClick={e => { e.preventDefault(e) }}
										key={index}
										title={record.attempts[index] === 0 ? 'Solved' : (record.attempts[index] === 1 ? 'Unsolved' : 'Best Solution')}
										arrow>
										< Chip
											label={item}
											variant="outlined"
											color={record.attempts[index] === 0 ? 'primary' : (record.attempts[index] === 1 ? 'error' : 'success')}
											onDelete={(e) => { handleEditOpen(e, index) }}
											deleteIcon={<EditIcon />}
										/>
									</ Tooltip>)
							}
							)}
							<IconButton size="small" aria-label="add to shopping cart" >
								<AddIcon onClick={(e) => handleAddOpen(e)} />
							</IconButton>
						</Stack>
					</label>
				)}
				{isEdittingHistory && <div className='max-w-3xl flex gap-6' key={'edit'}>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Edit date
						</span>
						<input
							value={record.dates[curHistoryIndex]}
							type='date'
							required
							onChange={(e) => {
								setRecord(prev => {
									const updatedDates = prev.dates.map((item, index) => {
										if (index === curHistoryIndex) {
											return e.target.value;
										} else {
											return item;
										}
									});

									return { ...prev, dates: updatedDates };
								});

							}}
							className='form_input'
						/>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Edit attempt result
						</span>
						<select
							value={record.attempts[curHistoryIndex]}
							type='text'
							required
							onChange={(e) => {
								setRecord(prev => {
									const updateAttempt = prev.attempts.map((item, index) => {
										if (index === curHistoryIndex) {
											return parseInt(e.target.value);
										} else {
											return item;
										}
									});

									return { ...prev, attempts: updateAttempt };
								});

							}}
							className='form_input'
						>
							<option value={0}>Solved</option>
							<option value={1}>Unsolved</option>
							<option value={2}>Best Solution</option>
						</select>
					</label>
					<div className='flex-end mt-8 gap-5'>
						<Button size="small" variant="outlined" color="error" onClick={(e) => handleDeleteHistory(e)}>
							delete
						</Button>
					</div>
				</div>}
				{isAddingHistory && <div className='max-w-3xl flex gap-6' key={'add'}>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Add date
						</span>
						<input
							value={newHistory.dates}
							type='date'
							required
							onChange={(e) => setNewHistory({ ...newHistory, dates: e.target.value })}
							className='form_input'
						/>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Add attempt result
						</span>
						<select
							value={newHistory.attempts}
							type='text'
							required
							onChange={(e) => setNewHistory({ ...newHistory, attempts: e.target.value })}
							className='form_input'
						>
							<option value={0}>Solved</option>
							<option value={1}>Unsolved</option>
							<option value={2}>Best Solution</option>
						</select>
					</label>
					<div className='flex-end mt-8 gap-5'>
						<Button variant="outlined" size="small" onClick={(e) => { handleAddHistory(e) }}>
							confirm
						</Button>
					</div>
				</div>}
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Field of Notes{" "}
						<span className='font-normal'>
							(#key word, #catgorey, #short hint, etc. Better not to paste detail solution)
						</span>
					</span>
					<textarea
						value={record.notes}
						onChange={(e) => setRecord({ ...record, notes: e.target.value })}
						placeholder='Write your notes here'
						className='form_textarea '
					/>
				</label>

				<div className='flex-end mx-3 mb-5 gap-4'>
					<Button>
						<Link href='/'>
							Cancel
						</Link>
					</Button>

					<Button
						type='submit'
						disabled={submitting}
						variant="contained"
					>
						{submitting ? `${type}ing...` : type}
					</Button>
				</div>
			</form>
		</section >
	);
};

export default Form;