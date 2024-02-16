import React, { useRef } from 'react'
import Card from './Card'
import { scrollList } from '../styles/scrollList.module.css'

const ScrollList = ({
	type,
	items,
	isMain,
	newItem,
	saveItem,
	setNewItem,
	removeItem,
	isEditable,
	setCurrentId
}) => {
	const ref = useRef();

	const getCurrentCardId = e => {
		if (!setCurrentId) return;

		const el = ref.current;
		const cardWidth = el.querySelector('div')?.offsetWidth;
		let cardId = Math.round((el?.scrollLeft + cardWidth) / cardWidth);
		cardId = isEditable ? cardId - 2 : cardId - 1;
		cardId = cardId < 0 ? items.length : cardId;

		setCurrentId(cardId);
	};

	return (
		<div ref={ref} data-type={type} className={scrollList} onScroll={getCurrentCardId}>
			{isEditable && (
				<Card
					data={newItem}
					isMain={isMain}
					isEditable={true}
					setData={setNewItem}
					index={items?.length || 0}
					saveNewData={saveItem}
				/>
			)}
			{items?.map((item, index) => (
				<Card
					data={item}
					index={index}
					key={item.id}
					isMain={isMain}
					setData={saveItem}
					remove={removeItem}
					isEditable={isEditable}
				/>
			))}
		</div>
	)
}

export default ScrollList