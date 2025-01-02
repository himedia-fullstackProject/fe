// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';
import LoginForm from './components/LoginForm'; // 로그인 폼 추가

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>Blog</h1>
                <LoginForm /> {/* 로그인 폼 추가 */}
                <SearchBar />
                <PostForm />
                <PostList />
            </div>
        </Provider>
    );
};

export default App;
