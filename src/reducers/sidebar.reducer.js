/* eslint-disable indent */
import { sidebarConstants } from '../constants';

export function sidebar(state, action) {
    if (state === undefined) {
        return {
            visible: false
        };
    }
    switch (action.type) {
        case sidebarConstants.OPEN:
            return {
                visible: state.visible !== true
            };

        case sidebarConstants.CLOSE:
            return {
                visible: false
            };

        default:
            return state;
    }
}
