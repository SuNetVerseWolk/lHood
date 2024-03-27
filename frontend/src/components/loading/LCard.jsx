import React from 'react'
import { motion } from "framer-motion";
import styles from "../../styles/pattern.module.css";

function LCard({isMain}) {
	return (
		<motion.div
			className={styles.card}
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			whileTap={{ scale: 0.97, transition: { duration: 1 } }}
		>
			{isMain && (
				<select
					name="level"
					className={styles.level}
					disabled={true}
					defaultValue='A1'
				/>
			)}

			<input
				className={styles.value}
				type="text"
				name="value"
				placeholder="Value"
				disabled={true}
				value={""}
			/>

			{isMain && (
				<>
					<div className={styles.value}>
						<input
							id={styles.IPA}
							name="IPA"
							type="text"
							disabled={true}
							placeholder="transcription"
							value={""}
						/>
						<select
							name="type"
							id={styles.type}
							disabled={true}
							defaultValue='...'
						/>
					</div>
					<hr />
				</>
			)}

			<textarea
				name="description"
				className={styles.description}
				disabled={true}
				placeholder="Write a description..."
			/>

			<textarea
				name="example"
				className={styles.example}
				disabled={true}
				placeholder="Write an example..."
			/>
		</motion.div>
	)
}

export default LCard