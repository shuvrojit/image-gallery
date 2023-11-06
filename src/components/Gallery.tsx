import { useState } from "react";
import Card from "./Card";
import rawData from "../../data";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Trash from "../assets/trash.svg";
import UploadSvg from "../assets/upload-rounded.svg";
import Upload from "../assets/upload.svg";

export interface DataInterface {
  id: string;
  name: string;
  src: string;
}

const Gallery = (): JSX.Element => {
  const [data, setData] = useState<DataInterface[]>(rawData);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const updateSelectedItems = (newItem: string): void => {
    setSelectedItems([...selectedItems, newItem]);
  };

  const deleteSelectedItems = (): void => {
    const newData = data.filter((item) => !selectedItems.includes(item.id));
    setData(newData);
    setSelectedItems([]);
  };

  const onDragEnd = (result: DropResult): void => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    // check to see if we're dropping the item in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Take the item and place in the destination index
    const newData: DataInterface[] = Array.from(data);
    newData.splice(source.index, 1);
    newData.splice(destination.index, 0, data[source.index]);
    setData(newData);
  };

  return (
    <div className="gallery">
      {selectedItems.length === 0 ? (
        <MenuBar>
          <h2>Gallery</h2>
          <img src={Upload} alt="upload" />
        </MenuBar>
      ) : (
        <MenuContainer>
          <p style={{ fontSize: "1.3rem" }}>
            {selectedItems.length} items selected
          </p>
          <img
            onClick={deleteSelectedItems}
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
              {data.map((d, index) => (
                <Card
                  key={index}
                  name={d.name}
                  src={d.src}
                  index={index}
                  id={d.id}
                  selectedItems={selectedItems}
                  updateSelectedItems={updateSelectedItems}
                  setSelectedItems={setSelectedItems}
                />
              ))}
              {provided.placeholder}
            </GalleryGrid>
          )}
        </Droppable>
      </DragDropContext>
      <UploadButton>
        <img style={{ cursor: "pointer" }} src={UploadSvg} alt="upload" />
      </UploadButton>
    </div>
  );
};

export default Gallery;

const GalleryGrid = styled.div`
  margin: 1rem auto;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;

  @media (min-width: 550px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 940px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1140px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const MenuBar = styled.div`
  height: 64px;
  padding: 1rem;
  border-bottom: 2px solid black;
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
