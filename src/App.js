// // in src/App.js
// import React from 'react';
// import { Admin, Resource } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
// import { PostList } from './posts';
import authProvider from './authProvider';
//
//
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
// const App = () => (
//
//
//     <Admin dataProvider={dataProvider} authProvider={authProvider}>
//         <Resource name="posts" list={PostList} />
//     </Admin>
// );
//
//
// export default App;
 import React from 'react';
 import {UserList} from './users'

import { fetchUtils, Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';


const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    // options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider('https://lvqur5ibk3.execute-api.us-east-1.amazonaws.com/dev/handler', httpClient);





const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} >
        <Resource name="users" list={UserList} />
    </Admin>
);

export default App;
