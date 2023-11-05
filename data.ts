import { v4 as uuid } from "uuid";
import image1 from "/images/image-1.webp";
import image2 from "/images/image-2.webp";
import image3 from "/images/image-3.webp";
import image4 from "/images/image-4.webp";
import image5 from "/images/image-5.webp";
import image6 from "/images/image-6.webp";
import image7 from "/images/image-7.webp";
import image8 from "/images/image-8.webp";
import image9 from "/images/image-9.webp";
import image10 from "/images/image-10.jpeg";
import image11 from "/images/image-11.jpeg";

interface DataTypes {
  name: string;
  src: string;
  id: string;
}

const data: DataTypes[] = [
  {
    name: "image-1",
    src: image1,
    id: uuid(),
  },
  {
    name: "image-2",
    src: image2,
    id: uuid(),
  },
  {
    name: "image-3",
    src: image3,
    id: uuid(),
  },
  {
    name: "image-4",
    src: image4,
    id: uuid(),
  },
  {
    name: "image-5",
    src: image5,
    id: uuid(),
  },
  {
    name: "image-6",
    src: image6,
    id: uuid(),
  },
  {
    name: "image-7",
    src: image7,
    id: uuid(),
  },
  {
    name: "image-8",
    src: image8,
    id: uuid(),
  },
  {
    name: "image-9",
    src: image9,
    id: uuid(),
  },
  {
    name: "image-10",
    src: image10,
    id: uuid(),
  },
  {
    name: "image-11",
    src: image11,
    id: uuid(),
  },
];

export default data;
