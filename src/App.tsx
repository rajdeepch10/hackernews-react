import { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Posts from "./components/Posts";
import TestComponent from "./TestComponent";
import TestComponent2 from "./TestComponent2";

const ITEM_URL = `https://hacker-news.firebaseio.com/v0/item/ITEMID.json?print=pretty`;
export const ThemeContext = createContext("dark");

function App(): JSX.Element {
  const [posts, setPosts] = useState<[]>([]);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => res.json())
      .then((response) => setPosts(response.slice(0, 10)));
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    // <BrowserRouter>
    <ThemeContext.Provider value={"dark"}>
      {/* <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/abc" element={<TestComponent2 />} />
        </Routes>
          <Link
            style={{
              padding: "10px 20px 10px 20px",
              borderRadius: "0.3rem",
              backgroundColor: "orange",
            }}
            to={"/"}
          >
            Home
          </Link>
          <Link to={"/abc"}>To ABC</Link> */}
      <div className="App">
        <Posts results={posts} />
      </div>
    </ThemeContext.Provider>
    // </BrowserRouter>
  );
}

export default App;
