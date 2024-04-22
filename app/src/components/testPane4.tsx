import { useEffect, useRef } from 'react';
import { components, type IEditorTab, type IMoleculeContext } from 'aixui';

import { getWorkspace } from '../utils';
import './testPane.css';
import {

	useQuery,
} from '@tanstack/react-query'
import { SimpleGrid } from '@mantine/core';
function randomId() {
    return Math.round(Math.random() * 1000);
}

export default function TestPane({ context: molecule }: { context: IMoleculeContext }) {
	const { isPending, error, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () =>
			fetch('https://api.github.com/repos/TanStack/query').then((res) =>
				res.json(),
			),
	})

	if (isPending) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	return (
		<SimpleGrid cols={3}>
			<div>
				<h1>{data.name}</h1>
				<p>{data.description}</p>
				<strong>👀 {data.subscribers_count}</strong>{' '}
				<strong>✨ {data.stargazers_count}</strong>{' '}
				<strong>🍴 {data.forks_count}</strong>
			</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
		</SimpleGrid>

	)
}
