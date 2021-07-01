import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App';
import 'src/App.css';
import reportWebVitals from 'src/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Layout className="layout">
      <Layout.Content style={{ padding: '0 50px' }}>
        <App></App>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>TK HAR ©2021 Created by Khoi and Thuc</Layout.Footer>
    </Layout>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
