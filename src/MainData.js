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
  const [search, setSearch] = useState('')
  const [data, setData] = useState(''); // 원래 더미데이터로 initData 있었음
  const [cart, setCart] = useState(null);
  const [params, setParams] = useState('')

  useEffect(() => {
    fetch(
      `/v1/search/shop?query=치이카와${search}&filter=used:false&display=10&start=1${params}`,
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
        setData(json.items);
      });
  }, [search, params]);



  useEffect(()=>{
    if(cart===null){
        return
    }
    localStorage.setItem(`${cart.productId}`, JSON.stringify(cart))
  },[cart])


  return (
    <DataContext.Provider value={{ search, data, cart, params, setSearch, setData, setCart, setParams }}>
      {children}
    </DataContext.Provider>
  );
};

export default MainData;
