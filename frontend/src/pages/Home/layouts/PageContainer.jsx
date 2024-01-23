import React from 'react'
import {
	Route,
	Link,
	Routes,
} from 'react-router-dom';
import { Recall } from '../../Recall';
import { People } from '../../People';
import { LearnSources } from '../../LearnSources';
import { Filter } from '../../Filter';

export const PageContainer = () => {
	return (
		<main>
			<Routes>
				<Route path='/people' element={<People />} />
				<Route path='/recall' element={<Recall />} />
				<Route path='/learnSourcesBtn' element={<LearnSources />} />
				<Route path='/filter/:learnType' element={<Filter />} />
			</Routes>
		</main>
	)
}
