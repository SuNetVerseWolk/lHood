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
	
	if (children) return (
		<motion.div
			initial={variants.initial}
			animate={variants.animate}
			transition={variants.transition}
		>{children}</motion.div>
	)
	
	return (
		<motion.div
			initial={variants.initial}
			animate={variants.animate}
			transition={variants.transition}

			onClick={e => {
			e.stopPropagation();
		}}><ItemMenuSvg /></motion.div>
	)
}

export default ItemsBtn