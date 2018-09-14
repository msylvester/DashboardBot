// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList } from './posts';
import authProvider from './authProvider';


const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (


    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="posts" list={PostList} />
    </Admin>
);


export default App;
