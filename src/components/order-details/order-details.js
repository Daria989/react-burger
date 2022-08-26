import done from '../../images/done.png';
import orderDetails from './order-details.module.css';
import PropTypes from 'prop-types';
function OrderDetails({res}) {
    return (
        <>
            <div className={`mr-25 ml-25 mt-4 mb-8 text text_type_digits-large`}>{res}</div>
            <div className={`mb-15 text text_type_main-medium`}>идентификатор заказа</div>
            <div className={`mb-15 ${orderDetails.image}`}>
                <img src={done} alt="done"></img>
            </div>
            <div className={`mb-2 text text_type_main-small`}>Ваш заказ начали готовить</div>
            <div className={`mb-30 text text_type_main-small ${orderDetails.text}`}>Дождитесь готовности на орбитальной станции</div>
        </>
    )
}

OrderDetails.propTypes = {
    res: PropTypes.number.isRequired
  }; 

export default OrderDetails;