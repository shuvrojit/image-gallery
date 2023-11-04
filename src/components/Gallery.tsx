import { useState } from "react";
import Card from "./Card";
import rawdata from "../../data";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const Gallery = () => {
  const [items, setItems] = useState<number>(0);
  const [data, setData] = useState(rawdata);

  function onDragEnd(result) {
    console.log(result);
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
      <p>{items} items selected</p>
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
    </>
  );
};

export default Gallery;
