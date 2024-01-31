import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../layouts/Navbar'
import Avatar from './Avatar'
import ItemMenuSvg from '../assets/itemMenu.svg?react'

const Item = ({children, id, name, img}) => {
	const navigate = useNavigate();
	let [holded, setHolded] = useState(false);

	return (
		<motion.div
			className='item'
			animate={{scaleX: 1}}
			initial={{scaleX: 0, transformOrigin: children ? 'center left' : 'center right'}}
			transition={{ease: 'easeOut'}}
			
			onClick={(e) => navigate(id)}
			onTouchStart={e => setTimeout(e => setHolded(true), 500)}
			onTouchEnd={e => setTimeout(e => setHolded(false), 5000)}
		>
			<motion.div id="main" transition={{ease: 'backInOut'}}>
				{img && <Avatar src={img} href='' />}
				<p id='name'>{name}</p>
			</motion.div>

			{console.log(holded)}
			{
				<motion.div
					animate={{visibility: 'visible', scaleX: 1}}
					transition={{delay: .3, ease: 'backOut'}}
					initial={{
						visibility: 'hidden',
						scaleX: 0,
						transformOrigin: 'center right'
					}}>
					<Navbar>
						{children || !holded ?
							children :
							<motion.div
								animate={{scaleX: 1}}
								transition={{delay: .3, ease: 'backOut'}}
								initial={{
									scaleX: 0,
									transformOrigin: 'center right'
								}}
								onClick={e => {
								e.stopPropagation();
							}}>
								<ItemMenuSvg />
							</motion.div>
						}
					</Navbar>
				</motion.div>
			}
		</motion.div>
	)
}

export default Item;