import { useState } from "react";

import {
  useDeleteMovieMutation,
  usePostMovieOverMutation,
} from "../rtkQueryCalls/apiSlice";

import { DataType } from "../interfaces/interface";

interface UserCardInterface {
  data: DataType;
  listId: number;
}

const Card = ({ data, listId }: UserCardInterface) => {
  const styles = {
    film: {
      display: "flex",
      flexGrow: 1,
      width: "80%",
      height: "110px",
      flexDirection: "row",
      justifyContent: "space-around",
      alignSelf: "center",
      marginHorizontal: "10%",
      marginVertical: "2%",
      borderColor: "#fff2cc",
      borderWidth: "3px",
      borderRadius: "8px",
      flexWrap: "wrap",
    },
    image: {
      width: "70%",
      height: "110px",
    },
    text: {
      color: "black",
      fontSize: 18,
      fontWeight: "400",
    },
    imageContainer: {
      flexBasis: "40%",
    },
    filmData: {
      flexBasis: "60%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
  };
  const [deleteUser] = useDeleteMovieMutation();
  const [postUser] = usePostMovieOverMutation();
  const [size, setSize] = useState(0);
  const [isDropping, setIsDropping] = useState(false);

  // drog start of a card
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("data", JSON.stringify(data));
    setSize(10);
    deleteUser({ id: listId, details: data });
  };

  // the dragged card dropped over a card
  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDropping(false);
    const dataTransferObject = JSON.parse(e.dataTransfer.getData("data"));
    postUser({ id: listId, overId: data.id, details: dataTransferObject });
  };

  // dragged card hover over other card
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDropping(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        width: "80%",
        height: "110px",
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "center",
        margin: "10% 2%",
        borderColor: "#fff2cc",

        borderRadius: "8px",
        flexWrap: "wrap",
        backgroundColor: "white",
        borderWidth: size + "px",
      }}
      draggable
      onDragLeaveCapture={() => setIsDropping(false)}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div style={styles.imageContainer}>
        <img draggable={false} style={styles.image} src={data.Poster} />
      </div>
      <div
        style={{
          flexBasis: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <p style={styles.text}>{data.Title}</p>
        <p style={{ ...styles.text, opacity: 0.7 }}>{data.id}</p>
      </div>
    </div>
  );
};

export default Card;
