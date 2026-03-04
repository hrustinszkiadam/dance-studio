import { useEffect, useState } from 'react';
import { API_BASE_URL, type Course } from './types';

const fetchCourses = async () => {
	const response = await fetch(API_BASE_URL + '/courses');
	return (await response.json()) as Course[];
};

const applyToCourse = async (courseId: number) => {
	const response = await fetch(
		API_BASE_URL + '/courses/' + courseId + '/apply',
		{ method: 'POST' },
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Sikertelen Jelentkezés');
	}
};

const App = () => {
	const [courses, setCourses] = useState<Course[]>([]);

	useEffect(() => {
		const main = async () => {
			const coursesData = await fetchCourses();
			setCourses(coursesData);
		};

		main();
	}, [setCourses]);

	return (
		<div className='mx-auto container flex flex-col gap-16 p-4'>
			<header>
				<nav className='px-8 flex items-center gap-4 text-lg'>
					<a href='#contact'>Elérhetőség</a>
					<a
						href='https://petrik.hu/'
						target='_blank'
					>
						Petrik honlap
					</a>
				</nav>
				<h1 className='font-bold text-3xl'>Petrik Táncstúdió</h1>
			</header>
			<main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-center h-full'>
				{courses.map((course) => (
					<CourseCard
						key={course.id}
						course={course}
					/>
				))}
			</main>
			<footer id='contact'>
				<p>Cím: 1440 Budapest, Ady Endre utca 2-4.</p>
				<p>Telefon: +36 40 123 4567</p>
				<p>Készítette: Hrustinszki Ádám</p>
			</footer>
		</div>
	);
};

export default App;

const CourseCard = ({ course }: { course: Course }) => {
	const [applyMessage, setApplyMessage] = useState('');

	const handleApply = async () => {
		try {
			await applyToCourse(course.id);

			setApplyMessage('Sikeres Jelentkezés');
		} catch (e) {
			if (e instanceof Error) {
				setApplyMessage(e.message);
			}
		}
	};

	useEffect(() => {
		if (applyMessage.length === 0) return;

		const timeout = setTimeout(() => {
			setApplyMessage('');
		}, 3000);

		return () => clearTimeout(timeout);
	}, [applyMessage]);

	return (
		<div className='border border-gray-500 rounded-2xl px-4 py-8 flex flex-col items-center gap-4 w-full justify-between'>
			<h2>{course.name}</h2>
			<p>Hossz: {course.length} perc</p>
			<p>Tánctanár: {course.instructor}</p>
			<img
				src={`/images/${course.type}.svg`}
				alt='Course type image'
				className='w-3/4'
			/>
			<div className='mt-4 flex flex-col gap-2'>
				<button
					className='px-6 py-2 bg-blue-500 rounded-lg text-white hover:scale-105 cursor-pointer'
					onClick={handleApply}
				>
					Jelentkezés
				</button>
				{applyMessage.length > 0 && (
					<span
						className={`border text-center font-semibold p-4 ${applyMessage.includes('Sikeres') ? 'text-green-600 bg-green-200 border-green-900' : 'text-red-600 bg-red-200 border-red-900'}`}
					>
						{applyMessage}
					</span>
				)}
			</div>
		</div>
	);
};
