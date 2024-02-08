import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import './App.css'
import Home from './pages/Home/Home'
import Recall from './pages/Recall';
import Menu from './pages/Menu';
import Person from './pages/Person';
import Search from './pages/Search'
import { isDeviceType } from './services/checkDeviceType';
import Subject from './pages/Subject';
import useUserDataManager from './data/user';

const App = () => {
	const userData = useUserDataManager();
	const [searchValue, setSearchValue] = useState('');
	const clearSearchValue = e => setSearchValue('');

  return (
		<>
			{isDeviceType()?.largeScreen && <link rel="stylesheet" href="/lHood/AppDesktop.css" />}
			<Routes>
				<Route path='/lHood' element={<Home search={searchValue} setSearch={setSearchValue} />}>
					<Route path='' element={<Recall />} />
					<Route path='recall' element={<Recall />} />
					<Route path='get'>
						<Route path=':search' element={<Search searchValue={searchValue} setSearchValue={setSearchValue} clearSearchValue={clearSearchValue} userData={userData} />} />
						<Route path='people/:id' element={<Person />} />
						<Route path='local/:param' element={<Subject />} />
					</Route>
					<Route path='menu' element={<Menu />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
