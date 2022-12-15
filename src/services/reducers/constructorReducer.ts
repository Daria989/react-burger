import { 
    GET_CONSTRUCTOR_LIST,
    ADD_CONSTRUCTOR_ELEMENT,
    DELETE_CONSTRUCTOR_ELEMENT,
} from '../actions/constructorActions';

import { constructorInitialState } from '../initialData';
import { TConstructorInitialState } from '../../utils/types';
import { TIngredientsDataActions } from '../actions/ingredientsAction';

export const addConstructorList = (state = constructorInitialState, action: TIngredientsDataActions): TConstructorInitialState => { 
    switch (action.type) {
      case GET_CONSTRUCTOR_LIST: {
        return { 
          ...state, 
          data: action.data, 
        };
      }
      case ADD_CONSTRUCTOR_ELEMENT: {
        if (action.data.type === 'bun') {
          return {
            data: [
            ...state.data.filter(element => element.type !== "bun"), action.data, action.data
          ]}
        } else 
          return {
            data: [
              action.data, ...state.data
            ]}
      }
      case DELETE_CONSTRUCTOR_ELEMENT: {
       const arr = state.data.filter(element => element.dragId !== action.data);
        return { 
          data: arr
        }
      }
        default: {
          return state
        }
      }
  }