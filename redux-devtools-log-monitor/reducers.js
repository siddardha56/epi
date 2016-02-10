"use strict";
const actions_1 = require('./actions');
function initialScrollTop(props, state = 0, action) {
    if (!props.preserveScrollTop) {
        return 0;
    }
    return action.type === actions_1.UPDATE_SCROLL_TOP ?
        action.scrollTop :
        state;
}
function reducer(props, state = {}, action) {
    return {
        initialScrollTop: initialScrollTop(props, state.initialScrollTop, action)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducer;
//# sourceMappingURL=reducers.js.map