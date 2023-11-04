import { useState } from "react";
import styled from "styled-components";

const CardStyle = styled.div<{ $src: string }>`
  display: flex;
  width: 168px;
  height: 128px;
  padding: 16px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border: 1px solid #000;
  background-image: "${(props) => props.$src}";
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
`;

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: #fff;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BlueMark = styled.div`
  width: 18px;
  height: 18px;
  margin: 3px;
  background: blue;
`;

const Card = ({ items, setItems, name, src }) => {
  const [mark, setMark] = useState(false);

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
    <>
      <CardStyle $src={src}>
        <Image src={src} alt={name} />
        <Checkbox onClick={markItem}>{mark ? <BlueMark /> : ""}</Checkbox>
      </CardStyle>
    </>
  );
};

export default Card;
