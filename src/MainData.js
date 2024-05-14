import { createContext, useEffect, useState } from "react";


// 더미데이터
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


// useContext 훅을 사용하기 위한 준비, index.js에서 사용한다
export const DataContext = createContext();



const MainData = ({ children }) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  // data는 변경해서는 안되는 값으로 지정해놓고, 사용할 데이터들을 최초에 한번만 저장시키도록 하였음
  const [data, setData] = useState(initData);

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
        setData(json.items);
        setFilter(json.items); // 처음에는 data와 같게 설정해놓고, 이제부터는 data가 원본, filter를 바꾸는 식으로 작업함
      });
  }, []);




  // 공통으로 필요할거같은 state들을 만들어 놓는다
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [detail, setDetail] = useState('');
  const [params, setParams] = useState('')
  const [category, setcategory] = useState([]);
  const [carts, setCarts] = useState(() => {
    const savedCarts = localStorage.getItem("carts");
    return savedCarts ? JSON.parse(savedCarts) : [];
  });




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

  


  // 카트는 항상 변경될때마다 localstorage와 같게 갱신시켜준다
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
