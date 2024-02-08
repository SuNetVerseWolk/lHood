const selectAllText = (e, ifTextIs) => {
	const el = e.target;

	if(e.target.textContent != ifTextIs) return;

	if (navigator.userAgent.match(/ipad|iphone/i))
		return el.setSelectionRange(0, el.value.length);

	return window.getSelection().selectAllChildren(el);
};

export default selectAllText;