import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { people } from "../data/user";
import Item from "../components/Item";
import Empty from "./Empty";
import GlobalSearchItems from "./GlobalSearchItems";
import { getPeople } from "../services/dataMenagement";

const FilterList = ({ searchValue, clearSearchValue, userData }) => {
  const { search } = useParams();
  const [sortedUserData, setSortedUserData] = useState([]);

  let id = searchValue.slice(1);
  let mark = searchValue[0];

  useEffect(
    (e) => {
      let items;
      if (search === "people") {
        const friends = getPeople(people, userData.data.people);
        if (mark === "#")
          items = friends?.filter((item) =>
            item.id?.toLowerCase().includes(searchValue.slice(1)),
          );
        else
          items = friends?.filter((item) =>
            item.name?.toLowerCase().includes(searchValue),
          );
      } else
        items = userData.data.patterns.filter(
          (item) =>
            item.name?.toLowerCase().includes(searchValue) &&
            item.state === search,
        );

      setSortedUserData(
        items?.map((item, i) => {
          const { name, img, id } = item || {};
          return <Item name={name} img={img} id={id} key={id || name} i={i} />;
        }),
      );
    },
    [search, searchValue],
  );

  return (
    <div id="filterList">
      <GlobalSearchItems
        search={search}
        mark={mark}
        id={id}
        clearSearchValue={clearSearchValue}
        userData={userData}
      />
      {sortedUserData?.length ? sortedUserData : <Empty />}
    </div>
  );
};

export default FilterList;
