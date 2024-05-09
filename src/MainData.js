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
  const [data, setData] = useState(initData);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetch(
      `/v1/search/shop?query=치이카와&filter=used:false&sort=sim&display=10&start=1`,
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
  }, []);

  return (
    <DataContext.Provider value={{ data, cart, setData, setCart }}>
      {children}
    </DataContext.Provider>
  );
};

export default MainData;
