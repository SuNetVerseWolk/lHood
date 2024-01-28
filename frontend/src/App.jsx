import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Recall from './pages/Recall';
import Menu from './pages/Menu';
import Person from './pages/Person';
import Search from './pages/Search'

const App = () => {
  return (
		<Routes>
			<Route path='/lHood' element={<Home />}>
				<Route path='' element={<Recall />} />
				<Route path='recall' element={<Recall />} />
				<Route path='get'>
					<Route path=':value' element={<Search />} />
					<Route path=':value/:key' element={<Person />} />
				</Route>
				<Route path='menu' element={<Menu />} />
			</Route>
		</Routes>
	)
}

export default App
