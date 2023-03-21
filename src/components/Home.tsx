import { useEffect, useState } from "react";
import List from "../components/List";

import {
  useDeleteListMutation,
  useGetMovieListQuery,
  usePushMovieMutation,
} from "../rtkQueryCalls/apiSlice";
import CONSTANT from "../constants/constants";

const Home = () => {
  const [listSelected1, setListSelected1] = useState("");
  const [listSelected2, setListSelected2] = useState("");
  const [pushUser] = usePushMovieMutation();
  const [deleteList] = useDeleteListMutation();
  const { data } = useGetMovieListQuery(Number.parseInt(listSelected1));
  const handleChange1 = (e: any) => {
    setListSelected1(e.target.value);
  };

  const handleChange2 = (e: any) => {
    setListSelected2(e.target.value);
  };

  const handleCopy = () => {
    console.log(listSelected1);
    console.log(listSelected2);

    if (listSelected1 !== CONSTANT.No_SELECT && listSelected1 != "") {
      if (listSelected2 !== CONSTANT.No_SELECT && listSelected2 != "") {
        if (listSelected1 == listSelected2) {
          alert("please Select diffrent list");
        } else {
          pushUser({ id: listSelected2, details: data });
          deleteList(Number.parseInt(listSelected1));
        }
      } else {
        alert("please Select list to copy");
      }
    } else {
      alert("please Select list from");
    }
  };

  return (
    <div>
      <div className="row align-items-center">
        <select
          className="col-lg-3 m-2"
          value={listSelected1}
          onChange={handleChange1}
        >
          <option value={CONSTANT.No_SELECT}>{CONSTANT.No_SELECT}</option>
          {Array(4)
            .fill(0)
            .map((value, index) => (
              <option value={index}>List {index + 1}</option>
            ))}
        </select>
        <select
          className="col-lg-3 m-3"
          value={listSelected2}
          onChange={handleChange2}
        >
          <option value={CONSTANT.No_SELECT}>{CONSTANT.No_SELECT}</option>
          {Array(4)
            .fill(0)
            .map((value, index) => (
              <option value={index}>List {index + 1}</option>
            ))}
        </select>

        <button
          title="Copy"
          className="btn col-lg-1  btn-dark m-2"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
      <div className="row">
        {Array(4)
          .fill(0)
          .map((value, index) => {
            return <List key={index} ListId={index} />;
          })}
      </div>
    </div>
  );
};

export default Home;
