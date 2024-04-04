import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { AppState } from './components/root';
import { connect } from 'react-redux';
import ArticleContainer from './containers/article-container';

import { PrimaryButton } from '@fluentui/react';
import Articles from './containers/article-container';
import {TopBarWithSidebar} from "./components/topbar"

const App: React.FC = () => {
    const handleButtonClick = () => {
        console.log('Button clicked');
        // 在这里添加你想在按钮点击后执行的逻辑
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', // 如果你希望在视口的垂直方向上也居中
            minHeight: '100vh', // 确保外层<div>足够高以支持垂直居中
        }}>
            <TopBarWithSidebar/>
            <h1>My Articles</h1>
            <ArticleContainer />
            {/* 添加一个PrimaryButton */}
            <PrimaryButton
                text="Click Me"
                onClick={handleButtonClick}
                styles={{ root: { backgroundColor: 'blue', borderColor: 'yellow' } }}
            />
        </div>
    );
};

// connect这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
// const mapStateToProps = (state: AppState) => {
//     return {
//         count: state.count
//     }
//   }

export default App;
