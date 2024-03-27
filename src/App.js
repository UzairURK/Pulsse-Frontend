import React from 'react'
import { ApiProvider } from './scenes/global/ApiContext' // Import ApiProvider from your ApiContext
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/Sidebar'
import Horizontalbar from './scenes/global/Horizontalbar'
import Dashboard from './scenes/dashboard'
import Bar from './scenes/bar'
// import Form from "./scenes/form";
import Line from './scenes/CountLine'
import GLine from './scenes/GCountLine'
import Pie from './scenes/pie'
import CCTV from './scenes/Video'
import CurrentCountsLine from './scenes/liveCount'
import CountLiveMinute from './scenes/lineMinutes'
import DailyLineChart from './scenes/DailyLine'
import WeeklyLineChart from './scenes/WeeklyLine'
import MonthlyLineChart from './scenes/MonthlyLine'
import FiveMinuteLineChart from './scenes/FiveMinuteLine'
import RepeatRatioPieChart from './scenes/RepeatRatioPie'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Users from './components/user'
import Customers from './components/customer'
import EEDepartmentDashboard from './scenes/dashboard/EEDepartmentDashboard'
import ISDepartmentDashboard from './scenes/dashboard/ISDepartmentDashboard'
// import SidebarContext from './scenes/global/SidebarContextt/SidebarContext'
import SidebarContextProvider from './scenes/global/SidebarContextt/SidebarContextProvider'
function App() {
  const [theme, colorMode] = useMode()

  return (
    <SidebarContextProvider>
    <ColorModeContext.Provider value={colorMode}>
      <div className='maincontainer'>
      {sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined ? null : <Horizontalbar />}
    
     
        {/* <CssBaseline /> */}
        <div className='app'>
          {sessionStorage.getItem('token') === null ||
          sessionStorage.getItem('token') === undefined ? (
            <Routes>
              <Route
                path='/'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Login />
                  ) : (
                    <Dashboard />
                  )
                }
              />
              <Route
                path='/register'
                element={<Register />}
              />
              <Route
                path='/'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Login />
                  ) : (
                    <Dashboard />
                  )
                }
              />
              <Route
                path='/EEDepartmentDashboard'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Login />
                  ) : (
                    <EEDepartmentDashboard />
                  )
                }
              />
              <Route
                path='/ISDepartmentDashboard'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Login />
                  ) : (
                    <ISDepartmentDashboard />
                  )
                }
              />
              <Route
                path='/users'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <Users />
                  )
                }
              />
              <Route
                path='/customers'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <Customers />
                  )
                }
              />

              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route
                path='/bar'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <Bar />
                  )
                }
              /> */}
              <Route
                path='/pie'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <Pie />
                  )
                }
              />
              <Route
                path='/line_count'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <Line />
                  )
                }
              />
              <Route
                path='/line_gCount'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <GLine />
                  )
                }
              />
              <Route
                path='/liveCount'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <CurrentCountsLine />
                  )
                }
              />
              <Route
                path='/video'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <CCTV />
                  )
                }
              />
              <Route
                path='/liveCountMinute'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <CountLiveMinute />
                  )
                }
              />
              <Route
                path='/DailyLineChart'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <DailyLineChart />
                  )
                }
              />
              <Route
                path='/WeeklyLineChart'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <WeeklyLineChart />
                  )
                }
              />
              <Route
                path='/MonthlyLineChart'
                element={
                sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <MonthlyLineChart />
                  )
                }
              />
              <Route
                path='/FiveMinuteLineChart'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <FiveMinuteLineChart />
                  )
                }
              />
              <Route
                path='/RepeatRatioPieChart'
                element={
                  sessionStorage.getItem('token') === null ||
                  sessionStorage.getItem('token') === undefined ? (
                    <Navigate
                      replace
                      to='/'
                    />
                  ) : (
                    <RepeatRatioPieChart />
                  )
                }
              />
            </Routes>
          ) : (
            
              <>
                
                <Sidebar />
                
                <main className='content'>
                  <Routes>
                  <Route
                    path='/'
                    element={<Dashboard/>}
                  />
                  <Route
                    path='/users'
                    element={<Users />}
                  />
                  <Route
                    path='/customers'
                    element={<Customers />}
                  />
                  <Route
                    path='/video'
                    element={<CCTV />}
                  />
                  <Route
                    path='/EEDepartmentDashboard'
                    element={<EEDepartmentDashboard />}
                  />
                  <Route
                    path='/ISDepartmentDashboard'
                    element={<ISDepartmentDashboard />}
                  />
                </Routes>
                
                </main>
              {/* <main className='content'>
                <Topbar />
                <Routes>
                  <Route
                    path='/'
                    element={<Dashboa
                      rd />}
                  />
                  <Route
                    path='/EEDepartmentDashboard'
                    element={<EEDepartmentDashboard />}
                  />
                  <Route
                    path='/ISDepartmentDashboard'
                    element={<ISDepartmentDashboard />}
                  />
                  <Route
                    path='/users'
                    element={<Users />}
                  />
                  <Route
                    path='/customers'
                    element={<Customers />}
                  />

                 
                  <Route
                    path='/bar'
                    element={<Bar />}
                  />
                  <Route
                    path='/pie'
                    element={<Pie />}
                  />
                  <Route
                    path='/line_count'
                    element={<Line />}
                  />
                  <Route
                    path='/line_gCount'
                    element={<GLine />}
                  />
                  <Route
                    path='/liveCount'
                    element={<CurrentCountsLine />}
                  />
                  <Route
                    path='/video'
                    element={<CCTV />}
                  />
                  <Route
                    path='/liveCountMinute'
                    element={<CountLiveMinute />}
                  />
                  <Route
                    path='/DailyLineChart'
                    element={<DailyLineChart />}
                  />
                  <Route
                    path='/WeeklyLineChart'
                    element={<WeeklyLineChart />}
                  />
                  <Route
                    path='/MonthlyLineChart'
                    element={<MonthlyLineChart />}
                  />
                  <Route
                    path='/FiveMinuteLineChart'
                    element={<FiveMinuteLineChart />}
                  />
                  <Route
                    path='/RepeatRatioPieChart'
                    element={<RepeatRatioPieChart />}
                  />
                </Routes>
              </main> */}
            </>
          )}
        </div>
      </div>
      </ColorModeContext.Provider>
      </SidebarContextProvider>
  )
}

// Wrap your App component with ApiProvider
export default function WrappedApp() {
  return (
    <ApiProvider>
      <App />
    </ApiProvider>
  )
}
