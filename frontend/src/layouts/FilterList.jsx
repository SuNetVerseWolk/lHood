import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/Item";
import Empty from "./Empty";
import GlobalSearchItems from "./GlobalSearchItems";
import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import getDataAPI from "../data/getDataAPI";

const FilterList = ({ searchValue, clearSearchValue }) => {
	const
	{ param, filter } = useParams(),
	{ data, isLoading } = useQuery({
		queryKey: [param, { filter }],
		queryFn: e => getDataAPI(param, filter).then(data => {
			data = data.filter((obj, index, self) =>
				index === self.findIndex((o) =>
					( o.value === obj.value && o.IPA === obj.IPA && o.description === obj.description )))

			return data.sort((a, b) => a.value.localeCompare(b.value))
		}),
		refetchOnWindowFocus: true,
		refetchOnReconnect: true
	}),
	sortedData = useMemo(e => {
		const sortedData = data?.filter(item =>
			item.value?.toLowerCase().includes(searchValue)
		);

		return sortedData?.map((item, i) => {
				const { value, img, id } = item || {};

				return (
					<Item
						id={id}
						key={id}
						img={img?.src}
						value={value}
						isAvatarPhotoShown={param === 'patterns' ? false : true }
						i={param === 'patterns' && filter === 'all' ? i + 3 : i + 2}
					/>
				);
			}
		)
	}, [searchValue, param, filter, data]);

	let id = useMemo(e => searchValue.slice(1), [searchValue]);
	let mark = useMemo(e => searchValue[0], [searchValue]);

	//useEffect(e => {
	//	const api = search === 'people' ? '/api/people' : '/api/patterns';
	//	const abortController = new AbortController();
	//	const signal = abortController.signal;

	//	axios.get(api, {signal}).then(res => {
	//		const cards = []
	//		res.data.forEach(pattern => cards.push(...pattern?.cards));
	//		setdata(cards);
	//		console.log(cards)
	//		//setsortedData(cards);
	//	}).catch(e => console.log(e));

	//	return () => {
	//		abortController.abort();
	//	}
	//}, [search])

	//useEffect((e) => {
	//	//let items;
	//	//if (search === "people") {
	//	//	const friends = getPeople(people, data);
	//	//	if (mark === "#")
	//	//		items = friends?.filter((item) =>
	//	//			item.id?.toLowerCase().includes(searchValue.slice(1)),
	//	//		);
	//	//	else
	//	//		items = friends?.filter((item) =>
	//	//			item.name?.toLowerCase().includes(searchValue),
	//	//		);
	//	//} else
	//	//	items = data.filter(item => 
	//	//		item.value?.toLowerCase().includes(searchValue) &&
	//	//		item.state === search
	//	//	);

	//	setsortedData(
	//		data?.map((item, i) => {
	//			const { value, img, id } = item || {};
	//			return <Item value={value} img={img} id={id} key={id || value} i={i} />;
	//		}),
	//	);
	//}, [data]);

	//console.log(isRefetching)
	//console.log(data)

	return (
		isLoading ? (
			<Empty children="Loading..." />
		) : (
			<div id="filterList">
				<GlobalSearchItems
					search={filter}
					mark={mark}
					id={id}
					clearSearchValue={clearSearchValue}
					userData={data}
				/>
				{sortedData?.length ? sortedData : <Empty />}
			</div>
		)
	);
};

export default FilterList;
