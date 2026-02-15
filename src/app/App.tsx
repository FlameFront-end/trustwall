import { HashRouter, Route, Routes } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { HomeScreen } from '@/screens/home'
import { SecondScreen } from '@/screens/second'
import { ThirdScreen } from '@/screens/third'

export default function App() {
  return (
    <HashRouter>
      <div style={{ height: '100%' }}>
        <Routes>
        <Route path={ROUTES.HOME} element={<HomeScreen />} />
        <Route path={ROUTES.SECOND} element={<SecondScreen />} />
        <Route path={ROUTES.THIRD} element={<ThirdScreen />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
