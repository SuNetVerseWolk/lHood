import React from 'react'
import { motion } from 'framer-motion'
import EditSvg from '../../assets/edit.svg?react'
import AcceptSvg from '../../assets/accept.svg?react'
import CancelSvg from '../../assets/cross.svg?react'

const Tools = ({
	isEditable,
	setIsEditable,
	cancelSaving,
	ecceptSaving
}) => {
	return (
		<div>
			{isEditable ? (
				<>
					<motion.div
						initial={{scale: .5}}
						animate={{scale: 1}}
						whileTap={{scale: .97}}
					>
						<CancelSvg
							//id={cancelSvg}
							style={{
								fill: '#fff',
								padding: 0
							}}
							onClick={cancelSaving}
						/>
					</motion.div>

					<motion.div
						initial={{scale: .5}}
						animate={{scale: 1}}
						whileTap={{scale: .97}}
					>
						<AcceptSvg onClick={ecceptSaving} />
					</motion.div>
				</>
			) : (
				<motion.div
					animate={{scale: 1}}
					initial={{scale: .5}}
					whileTap={{scale: .97}}
				>
					<EditSvg onClick={e => setIsEditable(true)} />
				</motion.div>
			)}
		</div>
	)
}

export default Tools