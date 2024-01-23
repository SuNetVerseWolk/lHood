export const isDevice = () => {
	return {
		phone: window.innerWidth <= 425,
		tablet: window.innerWidth > 425 && window.innerWidth <= 768,
		portable: window.innerWidth <= 768,
		pc: window.innerWidth > 768 && window.innerWidth <= 1440,
		tv: window.innerWidth > 1440 && window.innerWidth <= 2560,
		largeScreen: window.innerWidth > 768
	}
}