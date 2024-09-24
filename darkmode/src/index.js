import React, { useState,useEffect} from "react";
import {createRoot} from 'react-dom/client';
import ReactDOM from "react-dom";
// import axios from "axios";
import {useDarkMode} from './hooks/useDarkMode'
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
// import {useHttp} from './hooks/useHttp'
import "./styles.scss";
const config = {
  method: "GET",
  // mode:"no-cors",
  headers: {
    "Access-Control-Allow-Origin" : "http://localhost:3000",
    "Access-Control-Allow":"*",
    "Content-type": "application/json; charset=UTF-8"
  }};
const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode('darkMode');

// const {data:loadedData,loading,error} = useHttp("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true",config,[])
  useEffect(() => {

      async function getFetch()  {
      try{
        const req = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true",config)
      const jsn = req.json();
      setCoinData(jsn);
      }catch(e){
        console.log(e);
      }
      
      }
      getFetch();

    // axios
    //   .get(
    //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
    //   )
    //   .then(res => setCoinData(res.data))
    //   .catch(err => console.log(err));
  }, [coinData]);
  // if(loading){
  //   return(
  //     <p>Loading up please wait</p>
  //   )
  // }
  // if(!loading){
  //   setCoinData(loadedData);
  // }
  // if(error){
  //   return (
  //     <p>
  //       Theres an error {error}
  //     </p>
  //   )
  // }
  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
     {coinData.length &&  <Charts coinData={coinData} />}
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />, rootElement);
