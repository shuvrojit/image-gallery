import { useState } from "react"
import styled from "styled-components"

const CardStyle = styled.div`
display: flex;
width: 168px;
height: 128px;
padding: 16px;
justify-content: flex-end;
align-items: flex-start;
gap: 8px;
flex-shrink: 0;
border: 1px solid #000;
background: #D9D9D9;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
&:hover {
background: rgba(0, 0, 0, 0.50);
}
`

const Checkbox = styled.div`
width: 24px;
height: 24px;
flex-shrink: 0;
background: #FFF;
cursor: pointer;
`

const BlueMark = styled.div`
width: 18px;
height: 18px;
margin: 3px;
background: blue;
`


const Card = ({items,setItems}) => {
  const [mark, setMark] = useState(false)


  const markItem = () => {
    if(!mark) {
      setItems(items + 1);
      setMark(true)
    } else {
      setItems(items - 1)
      setMark(false)
    }
  }

  return (
    <>
      <CardStyle>
        <Checkbox onClick={markItem}>
          {mark ? <BlueMark /> : "" }
        </Checkbox>
        </CardStyle>
    </>

  )
}

export default Card
