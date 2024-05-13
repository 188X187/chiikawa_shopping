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
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [data, setData] = useState(initData);
  const [detail, setDetail] = useState('');
  const [params, setParams] = useState('')
  const [origin, setOrigin] = useState([]);
  const [category, setcategory] = useState([]);
  const [carts, setCarts] = useState(() => {
    // 초기 로드 시 localStorage에서 데이터 가져오기
    const savedCarts = localStorage.getItem("carts");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });

  useEffect(() => {
    fetch(
      `/v1/search/shop?query=치이카와&filter=used:false&display=100&start=1`,
      {
        method: "GET",
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.items); // list에서 필요한 데이터
        setFilter(json.items); // filter에서 필요한 데이터 (원본유지필요)
        setOrigin(json.items) // 원본 data 유지 필요
      });
  }, []);

  useEffect(() => {
    fetch(
      `/v1/search/shop?query=치이카와${search}&filter=used:false&display=100&start=1${params}`,
      {
        method: "GET",
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setFilter(json.items);
      });
  }, [search, detail, params]);

  

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      localStorage.removeItem('carts');
    }
  }, [carts]);


  return (
    <DataContext.Provider value={{ search, filter, data, detail, carts, params, setSearch, setFilter, setData, setDetail, setCarts, setParams, origin, setOrigin, category, setcategory }}>
      {children}
    </DataContext.Provider>
  );
};

export default MainData;
