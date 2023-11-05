import { useState } from "react";
import Card from "./Card";
import rawdata from "../../data";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Trash from "../assets/trash.svg";
import UploadSvg from "../assets/upload-rounded.svg";

const GalleryGrid = styled.div`
  margin: 1rem auto;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 550px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const MenuBar = styled.div`
  height: 64px;
  padding: 1rem;
  border: 2px solid black;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UploadButton = styled.div`
  margin: 1rem 0 8px;
  bottom: 0;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 600px) {
    display: none;
  }
`;

const Gallery = () => {
  const [items, setItems] = useState<number>(0);
  const [data, setData] = useState(rawdata);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    // check to see if destination hav value
    if (!destination) {
      return;
    }

    // check to see destination is the same as source
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // create new array and cut and paste data with splice
    const newData = Array.from(data);
    newData.splice(source.index, 1);
    newData.splice(destination.index, 0, data[source.index]);
    setData(newData);
    return;
  }

  return (
    <>
      <MenuBar>
        {items === 0 ? (
          <h2>Gallery</h2>
        ) : (
          <MenuContainer>
            {" "}
            <p style={{ fontSize: "1.3rem" }}>{items} items selected</p>{" "}
            <img
              style={{ width: "28px", height: "28px", cursor: "pointer" }}
              src={Trash}
              alt="trash"
            />
          </MenuContainer>
        )}
      </MenuBar>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <GalleryGrid ref={provided.innerRef} {...provided.droppableProps}>
              {data.map((d, i) => (
                <Card
                  items={items}
                  setItems={setItems}
                  key={i}
                  name={d.name}
                  src={d.src}
                  i={i}
                  id={d.id}
                />
              ))}
              {provided.placeholder}
            </GalleryGrid>
          )}
        </Droppable>
      </DragDropContext>
      <UploadButton>
        <img src={UploadSvg} alt="upload" />
      </UploadButton>
    </>
  );
};

export default Gallery;
