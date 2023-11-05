import { useState } from "react";
import Card from "./Card";
import rawdata from "../../data";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Trash from "../assets/trash.svg";
import UploadSvg from "../assets/upload-rounded.svg";
import Upload from "../assets/upload.svg";

const GalleryGrid = styled.div`
  margin: 1rem auto;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 550px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 940px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1140px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  grid-gap: 8px;
`;

const MenuBar = styled.div`
  height: 64px;
  padding: 1rem;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  img {
    cursor: pointer;
    display: none;
  }
  @media (min-width: 600px) {
    img {
      display: block;
    }
  }
`;

const MenuContainer = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
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
  const [selectedItems, setSelectedItems] = useState([]);

  function pushToSelected(newItem) {
    setSelectedItems([...selectedItems, newItem]);
  }

  function removeSelectedItems() {
    const indx = [];
    for (let i in selectedItems) {
      // console.log(selectedItems[i])
      for (let d in data) {
        // console.log(data[d])
        if (selectedItems[i] === data[d].id) {
          indx.push(d);
        }
      }
    }
    const newData = data.filter((item) => !selectedItems.includes(item.id));
    setData(newData);
    // for (let i in indx) {
    // setData(data.filter((item) => item.id !== [selectedItems]))
    // }
    setSelectedItems([]);
  }

  console.log(selectedItems);

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

  console.log(selectedItems);

  // TODO: Implement delete feature for selected Images

  return (
    <>
      {selectedItems.length === 0 ? (
        <MenuBar>
          <h2>Gallery</h2>
          <img src={Upload} alt="upload" />
        </MenuBar>
      ) : (
        <MenuContainer>
          {" "}
          <p style={{ fontSize: "1.3rem" }}>
            {selectedItems.length} items selected
          </p>{" "}
          <img
            onClick={removeSelectedItems}
            style={{ width: "28px", height: "28px", cursor: "pointer" }}
            src={Trash}
            alt="trash"
          />
        </MenuContainer>
      )}
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
                  setSelectedItems={setSelectedItems}
                  selectedItems={selectedItems}
                  pushToSelected={pushToSelected}
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
