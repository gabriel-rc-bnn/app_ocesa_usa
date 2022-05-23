import { combineReducers } from 'redux';
import { RESET } from '../../utils/types';
import LoginReducer from './login.reducer';
import TastesReducer from './taste.reducer';
import SearchReducer from './search.reducer';
import CalendarReducer from './calendar.reducer';
import MyEventsReducer from './myEvents.reducer';
import SelectionDateReducer from './selectDate.reducer';
import NotificationsReducer from './notification.reducer';
import PassHomeNavigationReducer from './passHomeNavigation.reducer';

export default (state, action) =>
  combineReducers({
    Login: LoginReducer,
    Search: SearchReducer,
    Tastes: TastesReducer,
    MyInterest: MyEventsReducer,
    SelectDateId: SelectionDateReducer,
    Notifications: NotificationsReducer,
    PassHomeNavigation: PassHomeNavigationReducer,
    Calendar: CalendarReducer,
  })(action.type === RESET ? undefined : state, action);
