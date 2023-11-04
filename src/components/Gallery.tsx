import { useState } from "react";
import Card from "./Card";
import data from "../../data";
import styled from "styled-components";

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const Gallery = () => {
  const [items, setItems] = useState<number>(0);

  return (
    <>
      <p>{items} items selected</p>
      <GalleryGrid>
        {data.map((d) => (
          <Card
            // draggable={true}
            items={items}
            setItems={setItems}
            key={d.id}
            name={d.name}
            src={d.src}
          />
        ))}
      </GalleryGrid>
    </>
  );
};

export default Gallery;
