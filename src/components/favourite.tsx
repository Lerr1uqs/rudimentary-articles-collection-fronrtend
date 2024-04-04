import { Article } from './article'

// ------------------------------------ action types -------------------------------------
export const CREATE_FAVOURATE = "CREATE_FAVOURATE"
export const DELECT_FAVOURATE = "DELECT_FAVOURATE"

interface CreateFavourateAction {
    title: string,
    type: typeof CREATE_FAVOURATE
}

interface DeleteFavourateAction {
    fid: number,
    type: typeof DELECT_FAVOURATE
}

type FavouriteAction = CreateFavourateAction | 
                       DeleteFavourateAction

// ---------------------------------------- class ---------------------------

export class Favourite {
    title: string
    fid: number
    articles: Article[] = []

    constructor(title: string, fid: number) {
        this.title = title
        this.fid = fid
    }
}

// 文章合集状态
export class FavouriteState {

    favs: { [fid: number]: Favourite } = {}
    fidPool: Set<number>
    maxFid = 0

    generateFid = () => {
        // 如果池子里有可用的fid，使用它
        let availableFid = this.fidPool.values().next().value;
        if (availableFid !== undefined) {
            this.fidPool.delete(availableFid);
            return availableFid;
        }
        // 如果池子里没有可用的fid，创建一个新的
        return ++this.maxFid;
    }

    deleteFavourate = (fid: number) => {
        delete this.favs[fid];
        this.fidPool.add(fid);
    }

    createFavourite(title: string) {
        const fid = this.generateFid();
        const favourite = new Favourite(title, fid);
        this.favs[fid] = favourite;
        // return favourite;
    }
    
    constructor() {
        this.fidPool = new Set();
    }
}

// reducer接收一个action 返回一个新的状态
export function favouriteReducer(
    state: FavouriteState = new FavouriteState(),
    action: FavouriteAction
): FavouriteState {

    switch (action.type) {
        case CREATE_FAVOURATE:
            state.createFavourite(action.title)
            return state

        case DELECT_FAVOURATE:
            state.deleteFavourate(action.fid)
            return state

        default:
            console.log("favouriteReducer default")
            return state
    }
}

// ----------------------------------- 对外导出触发action的函数 ---------------------------------------
export function createFavourite(title: string): CreateFavourateAction {
    console.log("createFavourite")
    return {
        title: title,
        type: CREATE_FAVOURATE
    }
}

export function deleteFavourite(fid: number): DeleteFavourateAction {
    console.log("deleteFavourite")
    return {
        fid: fid, 
        type: DELECT_FAVOURATE
    }
}