import { useState } from "react";

import Card from "./Card";

import {
  useDeleteListMutation,
  useGetMovieListQuery,
  usePushMovieMutation,
} from "../rtkQueryCalls/apiSlice";

import { DataType } from "../interfaces/interface";

import * as constants from "../constants/constants";

interface ListComponentInterface {
  ListId: number;
}

const List = ({ ListId }: ListComponentInterface) => {
  const { data } = useGetMovieListQuery(ListId);
  const list = ["Series", "Trending", "Movies", "Bookmark"];
  const [pushUser] = usePushMovieMutation();
  const [deleteList] = useDeleteListMutation();

  const [listSelected, setListSelected] = useState();

  const handleDrop = (e: any) => {
    e.preventDefault();
    const dataTransferObject = JSON.parse(e.dataTransfer.getData("data"));
    pushUser({ id: ListId, details: [dataTransferObject] });
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="col border" style={{ backgroundColor: "#87cefa" }}>
      <h2 className="text-center">{list[ListId]}</h2>

      {data && data.length > 0 ? (
        data.map((value: DataType, index: number) => (
          <Card data={value} key={index} listId={ListId} />
        ))
      ) : (
        <div
          className="text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        ></div>
      )}

      <div
        style={{ height: "100%" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      ></div>
    </div>
  );
};
export default List;
