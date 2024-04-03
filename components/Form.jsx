import Link from "next/link";

const Form = ({ type, record, setRecord, submitting, handleSubmit }) => {
	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{type} Record</span>
			</h1>

			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism'
			>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Title
					</span>
					<input
						value={record.title}
						onChange={(e) => setRecord({ ...record, title: e.target.value })}
						type='text'
						required
						className='form_input'
					/>
				</label>
				<div className='w-full max-w-7xl flex gap-6'>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Difficulty
						</span>
						<select
							value={record.difficulty}
							onChange={(e) => { console.log(e.target.value);; setRecord({ ...record, difficulty: e.target.value }) }}
							type='number'
							required
							className='form_input'
						>
							<option value={0}>0 for easiest</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4 for hardest</option>
						</select>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Priority
						</span>
						<select
							value={record.priority}
							onChange={(e) => setRecord({ ...record, priority: e.target.value })}
							type='number'
							required
							className='form_input'
						>
							<option value={0}>0 for lowest priority</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4 for highest priority</option>
						</select>
					</label>
					<label>
						<span className='font-satoshi font-semibold text-base text-gray-700'>
							Status
						</span>
						<select
							value={record.status}
							onChange={(e) => setRecord({ ...record, status: e.target.value })}
							type='text'
							required
							className='form_input'
						>
							<option value={'Solved'}>Solved but not best</option>
							<option value={'Unsolved'}>Unsolved</option>
							<option value={'Best Solution'}>Best Solution</option>
						</select>
					</label>
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
				</div>

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
					<Link href='/' className='text-gray-500 text-sm'>
						Cancel
					</Link>

					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;