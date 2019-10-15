import { sidebarConstants } from '../constants';

function open() {
    return { type: sidebarConstants.OPEN };
}

function close() {
    return { type: sidebarConstants.CLOSE };
}

export const sidebarActions = {
    open,
    close
};
