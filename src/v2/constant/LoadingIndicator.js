import { HideFullScreenLoading, HideLoadingTopBar, ShowFullScreenLoading, ShowLoadingTopBar } from "../redux/action/LoadingFullScreen"

export const show2LoadingBars = (dispatch) => {
    dispatch(ShowFullScreenLoading())
    dispatch(ShowLoadingTopBar())
}

export const hide2LoadingBars = (dispatch) => {
    dispatch(HideLoadingTopBar())
    dispatch(HideFullScreenLoading())
}

export const showFullScreenLoading = (dispatch)=> {
    dispatch(ShowFullScreenLoading())
}

export const hideFullScreenLoading = (dispatch)=> {
    dispatch(HideFullScreenLoading())
}

export const showTopBarLoading = (dispatch)=> {
    dispatch(ShowLoadingTopBar())
}

export const hideTopBarLoading = (dispatch)=> {
    dispatch(HideLoadingTopBar())
}