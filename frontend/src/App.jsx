import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import { useState } from 'react';
import './App.css'
import Home from './pages/Home/Home'
import Recall from './pages/Recall';
import Menu from './pages/Menu';
import Person from './pages/Person';
import Search from './pages/Search'
import { isDeviceType } from './services/checkDeviceType';
//import '../public/AppDesktop.css'

const App = () => {
	const [search, setSearch] = useState('');
	const { value } = useParams();
	console.clear();
	console.log(location)
	console.log(value)

  return (
		<>
			{isDeviceType()?.largeScreen && <link rel="stylesheet" href="/lHood/AppDesktop.css" />}
			<Routes>
				<Route path='/lHood' element={<Home value={value} search={search} setSearch={setSearch} />}>
					<Route path='' element={<Recall />} />
					<Route path='recall' element={<Recall />} />
					<Route path='get'>
						<Route path=':value' element={<Search value={value} search={search} setSearch={setSearch} />} />
						<Route path=':value/:id' element={<Person />} />
					</Route>
					<Route path='menu' element={<Menu />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
