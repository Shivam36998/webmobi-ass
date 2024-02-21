/** @format */

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { ReactSortable } from "react-sortablejs";
import { imagedb } from "./firebase/config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  let [img, setImg] = useState("");
  let [list, setList] = useState([]);
  let [error, setError] = useState("Loading..., kindly wait!!!");

  const sortHandler = (ls) => {
    window.localStorage.setItem("webmobi", JSON.stringify(ls));
  };
  const loadStart = async () => {
    try {
      const imgs = await listAll(ref(imagedb, "webmobi"));
      let all = [];
      for (const val of imgs.items) {
        const url = await getDownloadURL(val);
        all.push(url);
      }
      console.log("sdl");
      let items = JSON.parse(window.localStorage.getItem("webmobi")) || [];
      let final = items.filter((item) => all.find((one) => one == item));
      setList(final);
      setError("😔 OOPs! nothing to show! Click on add button to add new...");
    } catch (error) {
      window.href = "";
    }
  };

  useEffect(() => {
    loadStart();
  }, []);

  const handleClick = async (e) => {
    toast.info("uploading image, stay on the page...");
    const newId = v4();
    const imgRef = ref(imagedb, `webmobi/${newId}`);
    await uploadBytes(imgRef, e.target.files[0]);
    const imgUrl = await getDownloadURL(imgRef);
    console.log(imgUrl);
    let items = JSON.parse(window.localStorage.getItem("webmobi")) || [];
    items = [imgUrl, ...items];
    window.localStorage.setItem("webmobi", JSON.stringify(items));
    console.log(items);
    loadStart();
  };

  return (
    <>
      <div className="page">
        {list.length > 0 ? (
          <ReactSortable
            list={list}
            setList={setList}
            className="image">
            {list.map((item, index) => (
              <img
                src={item}
                key={index}
                alt=""
                onDragEnd={() => sortHandler(list)}
              />
            ))}
          </ReactSortable>
        ) : (
          <div className="error">{error}</div>
        )}

        <form action="">
          <label htmlFor="imgup">
            <div className="addButton">
              <div>Add New</div> <span>➕</span>
            </div>
          </label>
          <input
            type="file"
            id="imgup"
            onChange={(e) => {
              handleClick(e);
            }}
          />
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
