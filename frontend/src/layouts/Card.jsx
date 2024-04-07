import React, { useMemo } from "react";
import { motion } from "framer-motion";
import RightArrowSvg from "../assets/rightArrow.svg?react";
import ClearTSvg from "../assets/clearText.svg?react";
import CrossSvg from "../assets/cross.svg?react";
import styles from "../styles/pattern.module.css";

const Card = ({
	data,
	index,
	remove,
	isMain,
	setData,
	newChild,
	isEditable,
	saveNewData
}) => {
	const levels = useMemo(
		(e) => JSON.parse(import.meta.env.VITE_CardLevels),
		[],
	);
	const types = useMemo(
		(e) => JSON.parse(import.meta.env.VITE_CardTypeOfValue),
		[],
	);

	const changeData = (e) => {
		const el = e.target;

		if (el.localName === "textarea") {
			el.style.height = "auto";
			el.style.height = `${el.scrollHeight}px`;
		}

		setData((prev) => {
			if (!saveNewData) {
				prev[index] = { ...prev[index], [el.name]: el.value };

				return [...prev];
			}

			return { ...prev, [el.name]: el.value };
		});
	};

	const handleClear = (e) => {
		setData((prev) => {
			let clearedData = { value: "", description: "", example: "" };

			if (prev.IPA) clearedData = { ...clearedData, IPA: "" };

			return { ...prev, ...clearedData };
		});
	};

	const handleRightArrow = (e) => {
		saveNewData((prev) => {
			prev[index] = { ...data, id: new Date().getTime() };
			//console.log("Prev", prev);
			//console.log("NewChild", newChild);

			if (newChild && Object.keys(newChild).length) {
				const newTip = {...newChild, id: new Date().getTime()};
				prev[index] = { ...prev[index], tips: [...(prev[index].tips || []), newTip] }
			}
			
			setData({});
			return [...prev];
		});
	};

	return (
		<motion.div
			className={styles.card}
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			whileTap={{ scale: 0.97, transition: { duration: 1 } }}
		>
			{!!saveNewData ? (
				<>
					<div className={styles.ridBtn} onClick={handleClear}>
						<ClearTSvg />
					</div>
					<div id={styles.rightArrow} onClick={handleRightArrow}>
						<RightArrowSvg />
					</div>
				</>
			) : (
				isEditable && (
					<div
						id={styles.cross}
						className={styles.ridBtn}
						onClick={(e) => remove(data.id)}
					>
						<CrossSvg />
					</div>
				)
			)}

			{isMain && (
				<select
					name="level"
					className={styles.level}
					disabled={!isEditable}
					defaultValue={data?.level}
					onChange={changeData}
				>
					{levels.map((level) => (
						<option key={level}>{level}</option>
					))}
				</select>
			)}

			<input
				className={styles.value}
				type="text"
				name="value"
				placeholder="Value"
				disabled={!isEditable}
				value={data?.value || ""}
				onInput={changeData}
			/>

			{isMain && (
				<>
					<div className={styles.value}>
						<input
							id={styles.IPA}
							name="IPA"
							type="text"
							disabled={!isEditable}
							placeholder="transcription"
							value={data?.IPA || ""}
							onInput={changeData}
						/>
						<select
							name="type"
							id={styles.type}
							disabled={!isEditable}
							defaultValue={data?.type}
							onChange={changeData}
						>
							{types.map((type) => (
								<option key={type}>{type}</option>
							))}
						</select>
					</div>
					<hr />
				</>
			)}

			<textarea
				name="description"
				className={styles.description}
				value={data?.description || ""}
				disabled={!isEditable}
				placeholder="Write a description..."
				onInput={changeData}
			/>

			<textarea
				name="example"
				className={styles.example}
				value={data?.example || ""}
				disabled={!isEditable}
				placeholder="Write an example..."
				onInput={changeData}
			/>
		</motion.div>
	);
};

export default Card;
