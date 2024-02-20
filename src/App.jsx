/** @format */

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { ReactSortable } from "react-sortablejs";
import "./App.css";

function App() {
  let [list, setList] = useState([
    "/001.png",
    "/002.png",
    "/003.png",
    "/004.png",
    "/005.png",
    "/006.png",
    "/007.png",
    "/008.png",
  ]);
  return (
    <div className="page">
        <ReactSortable
          list={list}
          setList={setList}
          className="image">
          {list.map((item) => (
            <img
              src={item}
              alt=""
            />
          ))}
        </ReactSortable>

      <form action="">
        <label htmlFor="imgup">
          <div className="addButton">
            <div>Add New</div> <span>➕</span>
          </div>
        </label>
        <input
          type="file"
          id="imgup"
        />
      </form>
    </div>
  );
}

export default App;
