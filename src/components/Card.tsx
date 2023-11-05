import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
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
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <CardStyle
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DarkLayer>
            <Checkbox onClick={pushToSelectedItems}>
              {selectedItems.includes(id) ? <BlueMark /> : ""}
            </Checkbox>
          </DarkLayer>

          {selectedItems.includes(id) ? (
            <MarkedImage src={src} alt={name} />
          ) : (
            <Image src={src} alt={name} />
          )}
        </CardStyle>
      )}
    </Draggable>
  );
};

export default Card;

const CardStyle = styled.div`
  width: 150px;
  max-width: 100%;
  height: 150px;
  border: 1px solid #000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  margin: 8px auto;

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
      height: 96%;
    }
  }

  @media (min-width: 900px) {
    width: 200px;
    height: 200px;
  }
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
  opacity: 1;
`;

const DarkLayer = styled.div`
  background: black;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;

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

const MarkedImage = styled(Image)`
  // margin: 8px;
  width: 100%;
  height: 100%;
  border: 1rem solid blue;
`;

const BlueMark = styled.div`
  width: 18px;
  height: 18px;
  margin: 3px;
  background: blue;
`;
