import { useDrop, useDrag } from 'react-dnd';
import { useRef } from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorItem from './constructor-item.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorItem({ item, index, moveCard, handleClose}) {
    const ref = useRef(null);

    const [, drop] = useDrop({
      accept: 'component',

      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
  
        const dragIndex = item.index;
        const hoverIndex = index;
  
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
  
    const [{ isDragging }, drag] = useDrag({
      type: 'component',
      item: () => ({ id: item.id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const opacity = isDragging ? 0 : 1;
    if (item.type !== 'bun') drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();

    return (
      <div ref={ref} style={{ opacity }} onDrop={preventDefault} className={`mb-4 mr-2 ${constructorItem.element}`}>
        <DragIcon />
        <ConstructorElement
          text={item.name}
          handleClose={handleClose}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
  )}

  export default ConstructorItem;
