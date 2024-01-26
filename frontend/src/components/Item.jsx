import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Item = ({to, children, itemKey}) => {
	const navigate = useNavigate();
	const handleItemClick = (e) => {
		console.log(e.target.tagName)
    if (e.target.tagName !== 'BUTTON') {
      navigate(`/${to}/${itemKey}`);
    }
  };

	return (
		<div className='item' onClick={handleItemClick}>
			{children}
		</div>
	)
}
