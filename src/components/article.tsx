
const articleIdGenerator = function*() {
    let id = 0
    while (true) {
        yield id++
    }
}()

const generateArticleId = () => articleIdGenerator.next().value

export class Article {
    title: string
    url: string
    id: number
    constructor(title: string, url: string) {
        this.title = title
        this.url = url
        this.id = generateArticleId()
    }
}

// 文章合集状态
export type ArticlesState = {
    articles: Article[]
}

/* --------------------------- actions------------------------------------- */
export const ADD_ARTICLE = "ADD_ARTICLE"
export const DEL_ARTICLE = "DEL_ARTICLE"

interface AddArticleAction {
    title: string,
    url: string,
    type: typeof ADD_ARTICLE
}

interface DelArticleAction {
    title: string,
    type: typeof DEL_ARTICLE
}

// interface DeleteSourceAction {
//     type: typeof DELETE_SOURCE
//     source: RSSSource
// }
export type SourceActionTypes = AddArticleAction |
                                DelArticleAction


/* ----------------------------- 对外导出的dispatch接口 -------------------------------- */

export function addArticle(title: string, url: string): SourceActionTypes {
    console.log("addArticle")
    return {
        title: title, 
        url: url, 
        type: ADD_ARTICLE
    }
}

export function delArticle(title: string): SourceActionTypes {
    console.log("delArticle")
    return {
        title: title, 
        type: DEL_ARTICLE
    }
}

/* -----------------------------处理action 返回新的状态------------------------------------ */
// reducer接收一个action 返回一个新的状态
export function articleReducer(
    state: ArticlesState = {articles: []},
    action: SourceActionTypes
): ArticlesState {
    switch (action.type) {
        case ADD_ARTICLE:
            return {
                articles: [
                    ...state.articles, 
                    new Article(action.title, action.url)
                ]
            }
        case DEL_ARTICLE:
            return {
                articles: state.articles.filter(article => article.title !== action.title)
            }
        default:
            console.log("article default")
            return state
    }
}