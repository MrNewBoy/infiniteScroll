import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [listData, setListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const getData = async () => {
    let res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=9&page=" + { pageNo }
    );
    let data = await res.json();
    console.log(data);
    setListData([...listData, ...data]);
  };

  useEffect(() => {
    console.log(pageNo);
    getData(pageNo);
  }, [pageNo]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTOp" + document.documentElement.scrollTop);
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.documentElement.scrollHeight
    ) {
      setPageNo((prev) => prev + 1);
    }
  };

  return (
    <div className="App">
      <h1>LISt Infinite</h1>
      <ol>
        {listData.map((item, index) => (
          <li className="list" key={index}>
            {item.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
