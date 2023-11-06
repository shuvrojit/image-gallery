import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DataInterface } from "./Gallery";

interface CardInterface extends DataInterface {
  index: number;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  updateSelectedItems: (id: string) => void;
}

const Card = ({
  index,
  id,
  name,
  src,
  selectedItems,
  setSelectedItems,
  updateSelectedItems,
}: CardInterface): JSX.Element => {
  const pushToSelectedItems = (): void => {
    if (selectedItems.includes(id)) {
      const newItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(newItems);
    } else {
      updateSelectedItems(id);
    }
  };

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <CardStyle
          ref={provided.innerRef}
          {...provided.droppableProps}
          $isDraggingOver={snapshot.isDraggingOver}
        >
          <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
              <Box
                className="card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <DarkLayer>
                  <Checkbox onClick={pushToSelectedItems}></Checkbox>
                </DarkLayer>

                <Image src={src} alt={name} />
                {selectedItems.includes(id) ? (
                  <>
                    <Checkbox onClick={pushToSelectedItems}>
                      <BlueMark />
                    </Checkbox>
                  </>
                ) : (
                  ""
                )}
              </Box>
            )}
          </Draggable>
          {provided.placeholder}
        </CardStyle>
      )}
    </Droppable>
  );
};

export default Card;

const CardStyle = styled.div<{ $isDraggingOver: boolean }>`
  width: 150px;
  max-width: 100%;
  height: 150px;
  margin: 8px auto;

  background-color: ${(props) => (props.$isDraggingOver ? "#607D8B" : "none")};

  &:first-child {
    width: 100%;
    height: 95%;
    // grid-column: 1/3;
    grid-column: span 2;
    grid-row: span 2;
  }

  @media (min-width: 700px) {
    width: 180px;
    height: 180px;

    &:first-child {
      width: 92%;
      height: 95%;
    }
  }

  @media (min-width: 900px) {
    width: 200px;
    height: 200px;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const Checkbox = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: #fff;
  cursor: pointer;
  right: 8px;
  top: 8px;
  z-index: 100;
`;

const DarkLayer = styled.div`
  background: black;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
transition: opacity 0.5s ease;

  &:hover {
    opacity: 0.3;
  }
}
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BlueMark = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 18px;
  height: 18px;
  margin: 3px;
  background: #0288d1;
`;
