export const getPeople = (people, user) => {
	return people?.filter(person => user?.people?.includes(person.id));
};