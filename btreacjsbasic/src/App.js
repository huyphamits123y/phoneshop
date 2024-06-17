import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { routes } from './routes';
import axios from 'axios';
import { useSelector } from 'react-redux'
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import * as UserService from './services/UserService'
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
import { jwtDecode } from 'jwt-decode';
import useSelection from 'antd/es/table/hooks/useSelection';
import Loading from './components/LoadingComponent/Loading';
function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()

    console.log('storageData:', storageData);
    console.log('decoded:', decoded);

    if (decoded?.id) {

      handleGetDetailsUser(decoded?.id, storageData)

    }


  }, [])
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')

    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
      console.log('decodedApp', decoded)

    }
    return { decoded, storageData }
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    console.log("expired okkkkk")
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      // const data = await UserService.refreshToken()


      // config.headers['token'] = `Bearer ${data?.access_token}`

    }
    return config;

  }, (err) => {
    console.error('Interceptor error:', err);
    return Promise.reject(err);
  })



  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    console.log('res', res)
    setIsLoading(false)
  }
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
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>

            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin
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
      </Loading>

    </div>

  )
}
export default App