import { useRef } from 'react';
import { useDrop, useDrag, XYCoord} from 'react-dnd';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorItem from './constructor-item.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {TIngredientTypeWithIndex, TIngredientTypeConstructorItemProps} from '../../utils/types'

function ConstructorItem({item, index, moveCard, handleClose} : TIngredientTypeConstructorItemProps) {
  const DragRef = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: 'component',

    hover(item: TIngredientTypeWithIndex, monitor) {
      if (!DragRef.current) {
        return;
      }
  
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = DragRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
  
  const [{ isDrag }, drag] = useDrag({
    type: 'component',
    item: { index, item, handleClose },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    })
  });

  const opacity = isDrag ? 0 : 1;
  if (item.type !== 'bun') drag(drop(DragRef));

  return (
    <>
      <div ref={DragRef} style={{ opacity }} className={`mb-4 mr-2 ${constructorItem.element}`}>
        <DragIcon type="primary"/>
        <ConstructorElement
          text={item.name}
          handleClose={handleClose}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    </>
  )
}

export default ConstructorItem;
