import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { routes } from './routes';
import axios from 'axios';

import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useQuery } from '@tanstack/react-query';
function App() {
  // useEffect(() => {
  //   fetchApi()

  // }, [])
  // console.log('env', process.env.REACT_API_URL_BACKEND)
  // const fetchApi = async () => {
  //   const res = await axios.get(`http://localhost:3001/api/product/get-all?page=0&limit=3&sort=esc&sort=image&filter=name&filter=cellphone`);
  //   // console.log('res', res);
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  // console.log('query', query)
  return (
    <div>
      <Router>
        <Routes>

          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            );
          })}
        </Routes>
      </Router>

    </div>

  )
}
export default App