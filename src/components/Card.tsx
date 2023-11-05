import { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const CardStyle = styled.div<{ $src: string }>`
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  background-image: "${(props) => props.$src}";
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
margin: 8px auto;
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
  width: 150px;
  height: 150px;
  z-index: -1;
`;

const MarkedImage = styled(Image)`
  // margin: 8px;
  width: 136px;
  height: 136px;
  border: 8px solid blue;
`;

const BlueMark = styled.div`
  width: 18px;
  height: 18px;
  margin: 3px;
  background: blue;
`;

type cardProps = {
  items: number;
  setItems: (items: number) => void;
  name: string;
  src: string;
};

const Card = ({ i, id, items, setItems, name, src }: cardProps) => {
  const [mark, setMark] = useState<Boolean>(false);

  const markItem = () => {
    if (!mark) {
      setItems(items + 1);
      setMark(true);
    } else {
      setItems(items - 1);
      setMark(false);
    }
  };

  return (
    <Draggable key={id} draggableId={id} index={i}>
      {(provided) => (
        <CardStyle
          className="card"
          $src={src}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DarkLayer>
            <Checkbox onClick={markItem}>{mark ? <BlueMark /> : ""}</Checkbox>
          </DarkLayer>
          {mark ? (
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
