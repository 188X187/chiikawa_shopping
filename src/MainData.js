import { createContext, useEffect, useState } from "react";

const initData = [
  {
    category1: "없음",
    image:
      "https://pbs.twimg.com/media/FZuGhtZaMAEMLdh?format=jpg&name=360x360",
    productId: 0,
    title: "치이카와",
    lprice: 100000,
  },
];

export const DataContext = createContext();

const MainData = ({ children }) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  // const [url, setUrl] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [data, setData] = useState(''); // 원래 더미데이터로 initData 있었음
  const [detail, setDetail] = useState('');
  const [carts, setCarts] = useState(() => {
    // 초기 로드 시 localStorage에서 데이터 가져오기
    const savedCarts = localStorage.getItem("carts");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });
  const [localcarts, setLocalcarts] = useState(() => {
    // 초기 로드 시 localStorage에서 데이터 가져오기
    const savedCarts = localStorage.getItem("carts");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });
  const [params, setParams] = useState('')

  useEffect(() => {
    fetch(
      `/v1/search/shop?query=치이카와${search}&filter=used:false&display=40&start=1${params}`,
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
        setFilter(json.items); // filter에서 필요한 데이터
      });
  }, [search, detail, params]);



  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      localStorage.removeItem('carts');
    }
    setLocalcarts(carts);
  }, [carts]);


  return (
    <DataContext.Provider value={{ search, filter, data, detail, cart, params, setSearch, setFilter, setData, setDetail, setCart, setParams }}>
      {children}
    </DataContext.Provider>
  );
};

export default MainData;
