import React from 'react'
import { motion } from 'framer-motion'
import ItemMenuSvg from '../assets/itemMenu.svg?react'

const ItemsBtn = ({children, holded}) => {
	const variants = {
		initial: {
			scaleX: 0,
			transformOrigin: 'center right'
		},
		animate: {scaleX: 1},
		transition: {delay: .3, ease: 'backOut'},
	}
	
	return (
		<motion.div
			initial={variants.initial}
			animate={variants.animate}
			transition={variants.transition}
			whileTap={{scale: .97}}
		>{children ? children : <ItemMenuSvg />}</motion.div>
	)
}

export default ItemsBtn