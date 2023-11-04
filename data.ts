import { v4 as uuid } from "uuid"

interface DataTypes {
  name: string,
  src: string,
  id: string,
}

const data: DataTypes[] = [
  {
    name: "image-1",
    src: "/images/image-1.webp",
    id: uuid(),
  },
  {
    name: "image-2",
    src: "/images/image-2.webp",
    id: uuid(),
  },
  {
    name: "image-3",
    src: "/images/image-3.webp",
    id: uuid(),
  },
  {
    name: "image-4",
    src: "/images/image-4.webp",
    id: uuid(),
  },
  {
    name: "image-5",
    src: "/images/image-5.webp",
    id: uuid(),
  },
  {
    name: "image-6",
    src: "/images/image-6.webp",
    id: uuid(),
  },
  {
    name: "image-7",
    src: "/images/image-7.webp",
    id: uuid(),
  },
  {
    name: "image-8",
    src: "/images/image-8.webp",
    id: uuid(),
  },
  {
    name: "image-9",
    src: "/images/image-9.webp",
    id: uuid(),
  },
  {
    name: "image-10",
    src: "/images/image-10.jpeg",
    id: uuid(),
  },
  {
    name: "image-11",
    src: "/images/image-11.jpeg",
    id: uuid(),
  },
  {
    name: "image-1",
    src: "/images/image-1.webp",
    id: uuid(),
  },
  {
    name: "image-1",
    src: "/images/image-1.webp",
    id: uuid(),
  },
]

export default data
