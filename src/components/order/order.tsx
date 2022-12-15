import order from './order.module.css';
import { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from '../../utils/hooks';
import { formatDate, findCorrespondingArr, unique } from '../../utils/functions';
import { getOrderRequest } from '../../services/actions/getOrderAction';
import { TIngredientTypeWithCount, TIngredientType } from '../../utils/types';

function Order () {
    const dispatch = useDispatch();
    const { id } = useParams<{id?: string}>();
    const dataIngredients: any = useSelector(store => store.addIngredientsList.data);
    const dataOrderByNumber: any = useSelector((store) => store.addBurgerOrder.data);
    console.log(dataOrderByNumber)    

    useEffect(
        () => {
          dispatch(getOrderRequest(Number(id)))
        },
        [dispatch, id]
      );

    if (!dataOrderByNumber) {
        return null
    }

    const correspondingArr: Array<TIngredientType> = findCorrespondingArr(dataOrderByNumber.ingredients, dataIngredients);

    const getArrWithCount = (arr: Array<TIngredientType>) => arr?.reduce((acc: any, el: TIngredientType) => {
            acc[el._id] = (acc[el._id] || 0) + 1;
            return acc;
          }, {})

    const objWithRepeat = getArrWithCount(correspondingArr);

    const uniqueArr = unique(correspondingArr);

    const arrWithCount = uniqueArr.map((el: TIngredientTypeWithCount) => {
        el.repeat = objWithRepeat[el._id]
        return el
    })

    const totalPrice = arrWithCount.reduce((acc: number, el: TIngredientTypeWithCount) => {
        return acc + el.price*el.repeat;
    },0)

    function ingredientsList(curOrder: Array<TIngredientTypeWithCount>): any {
        return curOrder.map((obj: TIngredientTypeWithCount, index: number) =>
        <div key={index} className = {`mb-2 ${order.ingredient}`}>
            <div className = {`mr-4 ${order.image_wrapper}`}>
                <img className = {order.image} src={obj.image_mobile} alt='img'/>
            </div>
            <div className = {`text text_type_main-default mr-4 ${order.ingredient_name}`}>{obj.name}</div>
            <div className = {`text text_type_digits-default ${order.count}`}>
                {obj.repeat}x{obj.price}
                <div className = {'ml-2'}><CurrencyIcon type="primary"/></div>
            </div>
        </div>
        )
    }

    return (
        <div className = {order.wrapper}>
            <div className = {order.container}>
                <p className = 'mb-10 text text_type_digits-default'>#{dataOrderByNumber.number}</p>
                <p className = {`text text_type_main-medium mb-3 ${order.status}`}>{dataOrderByNumber.name}</p>
                <p className = {`text text_type_main-default mb-15 ${order.name}`}>{dataOrderByNumber.status}</p>
                <p className = {`text text_type_main-medium mb-6 ${order.status}`}>Состав:</p>
                <div className = {`mb-15 ${order.ingredients}`}>
                    {ingredientsList(arrWithCount)}
                </div>
                <div className = {`${order.info}`}>
                    <div className = {`text text_type_main-default text_color_inactive mr-4 ${order.date}`}>
                        {formatDate(dataOrderByNumber.createdAt)}
                    </div>
                    <div className = {`text text_type_digits-default ${order.price}`}>
                        {totalPrice}
                        <div className = {'ml-2'}><CurrencyIcon type="primary"/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;