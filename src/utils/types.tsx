export type TLocationState = {
    background: any
  }

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

export type TIngredientType = {
    _id: string,
    key: number,
    dragId: number,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export type TIngredientTypeWithIndex = TIngredientType & {
    index: number;
}

export type TIngredientTypeCardDescription = {
    description : TIngredientType
}
  
export type TIngredientTypeConstructorItemProps = {
    item: TIngredientType,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    handleClose: () => void
}

export type TIngredientTypeIngredient = {
    id: string,
    innerRef: React.RefObject<HTMLInputElement> 
    type: string
}

export type TModal = {
    onClose:() => void,
    children: React.ReactNode
}

export type TModalOverlay = {
    onClose: () => void
}

export type TLocationStateLogin = {
    from: {
        pathname: string;
    };
}

export type TForm = {
    name?: string;
    email?: string, 
    password?: string,
    token?: string
}