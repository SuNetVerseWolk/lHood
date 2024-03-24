import React from 'react'
import SearchSvg from '../../assets/search.svg?react'
import AddBoxesSvg from '../../assets/addBoxes.svg?react'
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

export const Searcher = ({searchValue, setSearchValue}) => {
	const navigate = useNavigate();
	const { param, filter } = useParams();
	const patternsPage = param === 'patterns' && filter === 'all';
	const placeholder = filter || param ? `Search ${filter != 'all' ? filter : param}` : 'Not available for search';

	return (
		<motion.div id='searcherBox' className={patternsPage ? 'btnBox' : null} animate={{scale: 1}} initial={{scale: .95}}>
			<motion.label htmlFor="search" id='searcher' whileTap={{scale: .99}}>
				<input
					type="text"
					id='search'
					placeholder={placeholder}
					value={searchValue}
					onChange={e => setSearchValue(e.target.value.toLowerCase())}
				/>
				<SearchSvg />
			</motion.label>
			{patternsPage &&
				<motion.div
					animate={{scaleX: 1}}
					initial={{scaleX: 0, transformOrigin: 'center right'}}
					transition={{ease: 'backOut'}}
					whileTap={{scale: .97}}

					onClick={e => navigate('/patterns/' + import.meta.env.VITE_NEWDATAKEY)}>
						<AddBoxesSvg/>
				</motion.div>}
		</motion.div>
	)
}
