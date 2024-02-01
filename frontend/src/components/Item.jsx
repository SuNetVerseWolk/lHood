import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../layouts/Navbar'
import Avatar from './Avatar'
import ItemsBtn from './ItemsBtn'

const Item = ({children, id, name, img, i}) => {
	const navigate = useNavigate();
	let [holded, setHolded] = useState(false);
	let isHolded = false;

	const item = {
		hidden: {
			display: 'none',
			scaleX: 0,
			transformOrigin: children ? 'center left' : 'center right'
		},
		showen: {
			scaleX: 1,
			display: 'flex'
		}
	}

	return (
		<motion.div
			className='item'
			animate={item.showen}
			initial={item.hidden}
			transition={{ease: 'easeOut', delay: i * .1 }}
			
			onClick={e => navigate(id)}
			onTouchStartCapture={e => {
				isHolded = true;
				setTimeout(e => isHolded && setHolded(true), 700);
			}}
			onTouchEnd={e => {
				isHolded = false;
				setTimeout(e => setHolded(false), 5000);
			}}
		>
			<motion.div id="main" transition={{ease: 'backInOut'}} whileTap={{scale: .95}}>
				{img && <Avatar src={img} href='' />}
				<p id='name'>{name}</p>
			</motion.div>
			{
				<motion.div
					initial={item.hidden}
					animate={(children || holded) ? item.showen : item.hidden}
				>
					<Navbar>
						<ItemsBtn children={children} holded={holded}/>
					</Navbar>
				</motion.div>
			}
		</motion.div>
	)
}

export default Item;