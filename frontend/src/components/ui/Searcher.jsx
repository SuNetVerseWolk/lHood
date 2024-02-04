import React from 'react'
import SearchSvg from '../../assets/search.svg?react'
import AddBoxesSvg from '../../assets/addBoxes.svg?react'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

export const Searcher = ({searchValue, setSearchValue}) => {
	const { search } = useParams();
	const isLocal = search === 'local';
	const placeholder = search ? `Search ${search}` : 'Not available for search';

	return (
		<motion.div id='searcherBox' className={isLocal ? 'btnBox' : null} animate={{scale: 1}} initial={{scale: .95}}>
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
			{isLocal &&
				<motion.div
					animate={{scaleX: 1}}
					initial={{scaleX: 0, transformOrigin: 'center right'}}
					transition={{ease: 'backOut'}}
					whileTap={{scale: .97}}

					onClick={e => {}}>
						<AddBoxesSvg/>
				</motion.div>}
		</motion.div>
	)
}
