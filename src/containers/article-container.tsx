import React, { useState } from 'react';
import { connect} from 'react-redux';
// import { AppDispatch } from './store';
import { Article, addArticle, delArticle } from '../components/article';
// import {dispatch} from "redux"
import { ArticlesState } from '../components/article';
import { AppState } from '../components/root';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';

type ArticlesProps = {
    articles: Article[],
    addArticle: (title: string, url: string) => void,
    delArticle: (title: string) => void
}

// interface ArticleItemProps {
//     todo: Todo;
//     deleteTodo: (id: number) => void;
//     toggleTodo: (id: number) => void;
// }

// function TodoItem() {
//     return (
//         <li style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
//             {todo.text}
//             <button onClick={() => toggleTodo(todo.id)}>toggle</button>
//             <button onClick={() => deleteTodo(todo.id)}>delete</button>
//         </li>
//     )
// }

function ArticleList({articles}: {articles: Article[]}) {
    console.log("ArticleList")
    if (articles === undefined) {
        console.log("articles is undefined")
        return(<></>)
    }
    console.log("ArticleList map")
    return (
        <ul>
            {articles.map((arti, idx) => (
                <li key={idx}>{arti.title} {arti.url}</li>
            ))}
        </ul>
    )
}

const Articles: React.FC<ArticlesProps> = (props: ArticlesProps) => {

    const [addTitle, setAddTitle] = useState('');
    const [addUrl, setAddUrl] = useState('');

    const handleAddArticleSubmit = (e: React.FormEvent) => {
        console.log("handleSubmit")
        console.log(props)
        e.preventDefault();
        // console.log(e.target)

        if (addTitle && addUrl) {
            console.log("prepare for add article")
            props.addArticle(addTitle, addUrl);
            setAddTitle('')
            setAddUrl('')
        }
        
    };

    const [delTitle, setDelTitle] = useState('');

    const handleDelArticleSubmit = (e: React.FormEvent) => {
        console.log("handleSubmit")
        console.log(props)
        e.preventDefault();
        // console.log(e.target)

        if (delTitle) {
            console.log("prepare for del article")
            props.delArticle(delTitle);
            setDelTitle('')
        }
        
    };

    return (
        <>
          <Stack tokens={{ childrenGap: 15 }}>
            <form onSubmit={handleAddArticleSubmit}>
              <Stack horizontal tokens={{ childrenGap: 15 }} verticalAlign="end">
                <TextField 
                  label="Title" 
                  value={addTitle} 
                  onChange={(_, newValue) => setAddTitle(newValue || '')} 
                />
                <TextField 
                  label="URL" 
                  value={addUrl} 
                  onChange={(_, newValue) => setAddUrl(newValue || '')} 
                />
                <PrimaryButton type="submit" text="Add Article" />
              </Stack>
            </form>
    
            <form onSubmit={handleDelArticleSubmit}>
              <Stack horizontal tokens={{ childrenGap: 15 }} verticalAlign="end">
                <TextField 
                  label="Title" 
                  value={delTitle} 
                  onChange={(_, newValue) => setDelTitle(newValue || '')} 
                />
                {/* 注意：为了确保按钮对齐，这里可能不需要调整 */}
                <PrimaryButton type="submit" text="Del Article" />
              </Stack>
            </form>
          </Stack>
    
          <ArticleList articles={props.articles} />
        </>
      );
};

// Mapping Redux state to component props
// TODO: 这里必须要appstate？？？
const mapStateToProps = (state: AppState) => ({
    // count: state.count,
    articles: state.article.articles
});
  
// Mapping Redux actions to component props
const mapDispatchToProps = {
    // addArticle: (title, text) => dispatch(), // Shortcut notation for `increment: () => dispatch(increment())`
    addArticle: (title: string, url: string) => addArticle(title, url),
    delArticle: (title: string) => delArticle(title)
};

const ArticleContainer = connect(mapStateToProps, mapDispatchToProps)(Articles);

export default ArticleContainer;
