import orders from "./orders.module.css";
import CardOrder from '../card-order/card-order';
import { useEffect} from 'react';
import {useSelector, useDispatch} from '../../utils/hooks';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSED_AUTH } from '../../services/actions/wsActionsAuth';
import { TBurgerOrder } from '../../utils/types';
import {Link, useLocation} from "react-router-dom";

function Orders() {
    const dispatch = useDispatch();
    const data: any = useSelector((store) => store.wsReducerAuth.messages);
    const location = useLocation();

    function card(arr: Array<TBurgerOrder>) {
        return arr.map((obj: TBurgerOrder) => 
    <Link
        to={{
            pathname: `/feed/${obj.number}`,
            state: { background: location }
        }}
        key={obj._id}
        className={orders.link}>
        <CardOrder key={obj._id} data = {obj}/>
    </Link>)
    }

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START_AUTH,
        });
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED_AUTH})
        }
    }, [dispatch]);

    if (!data || !data.orders) {
        return null
    }

    return (
        <div className={orders.wrapper}>{card([...data.orders].reverse())}</div>
    )
}

export default Orders;