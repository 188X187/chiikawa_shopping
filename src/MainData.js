// MainData.js

import { createContext, useEffect, useState } from "react";

const initData = [
  {
    category1: "없음",
    image:
      "https://pbs.twimg.com/media/FZuGhtZaMAEMLdh?format=jpg&name=360x360",
    productId: 0,
    title: "치이카와",
    lprice: 1000000000,
  },
];

export const DataContext = createContext();

const MainData = ({ children }) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const [data, setData] = useState(initData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(initData);
  const [detail, setDetail] = useState('');
  const [params, setParams] = useState('');
  const [category, setcategory] = useState([]);
  const [carts, setCarts] = useState(() => {
    const savedCarts = localStorage.getItem("carts");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });

  const fetchData = (searchQuery, params) => {
    fetch(`/v1/search/shop?query=치이카와${searchQuery}&filter=used:false&display=100&start=1${params}`, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json.items);
        setFilter(json.items);
      });
  };

  useEffect(() => {
    fetchData('', '');
  }, []);

  useEffect(() => {
    fetchData(search, params);
  }, [search, params]);

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      localStorage.removeItem('carts');
    }
  }, [carts]);

  return (
    <DataContext.Provider value={{ search, filter, data, detail, carts, params, setSearch, setFilter, setData, setDetail, setCarts, setParams, category, setcategory }}>
      {children}
    </DataContext.Provider>
  );
};

export default MainData;
