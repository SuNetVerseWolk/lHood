import React from 'react'
import SearchSvg from '../../assets/search.svg?react'
import AddBoxes from '../AddPattern';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import { searcher, svgButton, btnBox, tools, searchIcon } from 'styles/searcher.module.css'

export const Searcher = ({searchValue, setSearchValue}) => {
	const { param, filter } = useParams();
	const patternsPage = param === 'patterns' && filter === 'all';
	const placeholder = filter || param ? `Search ${filter != 'all' ? filter : param}` : 'Not available for search';

	return (
		<motion.label
			htmlFor="search"
			className={`${patternsPage ? btnBox : null} ${searcher}`}

			animate={{scale: 1}}
			initial={{scale: .95}}
		>
			<input
				type="text"
				id='search'
				placeholder={placeholder}
				value={searchValue}
				onChange={e => setSearchValue(e.target.value.toLowerCase())}
			/>
			<div className={searchIcon}>
				<SearchSvg />
			</div>
			<div className={tools}>
				{patternsPage && (
					<AddBoxes className={svgButton} />
				)}
			</div>
		</motion.label>
	)
}
