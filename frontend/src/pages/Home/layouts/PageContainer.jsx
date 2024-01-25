import React from 'react'
import {
	Route,
	Routes,
} from 'react-router-dom';
import { Recall } from '../../Recall';
import { Menu } from '../../Menu';
import { PageSearchContainer } from './PageSearchContainer';

export const PageContainer = () => {
	return (
		<main>
			<Routes>
				<Route path='/*' element={<Recall />} />
				<Route path='/menu' element={<Menu />} />
				<Route path='/search/:value' element={<PageSearchContainer />} />
			</Routes>
		</main>
	)
}
