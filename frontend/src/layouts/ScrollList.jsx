import React, { useRef } from 'react'
import Card from './Card'
import { scrollList } from '../styles/scrollList.module.css'

const ScrollList = ({items, setItems, isEditable, setCurrentId, type, newItem, setNewItem, isMain}) => {
	const ref = useRef();

	const getCurrentCardId = e => {
		if (!setCurrentId) return;

		const el = ref.current;
		const cardWidth = el.querySelector('div').offsetWidth;
		let cardId = Math.round((el.scrollLeft + cardWidth) / cardWidth);
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
					saveNewData={setItems}
				/>
			)}
			{items?.map((item, index) => (
				<Card
					data={item}
					index={index}
					key={item.id}
					isMain={isMain}
					setData={setItems}
					isEditable={isEditable}
				/>
			))}
		</div>
	)
}

export default ScrollList