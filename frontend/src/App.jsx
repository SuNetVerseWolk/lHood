import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import './App.css'
import Home from './pages/Home/Home'
import Recall from './pages/Recall';
import Menu from './pages/Menu';
import Person from './pages/Person';
import Search from './pages/Search'
import { isDeviceType } from './services/checkDeviceType';
import Pattern from './pages/Pattern/Pattern';
import Logined from './features/authentication/components/Logined';

const App = () => {
	const [searchValue, setSearchValue] = useState('');
	const clearSearchValue = e => setSearchValue('');

	return (
		<>
			{isDeviceType()?.largeScreen && <link rel="stylesheet" href="AppDesktop.css" />}
			<Routes>
				<Route path='*' element={<Home search={searchValue} setSearch={setSearchValue} />}>
					<Route path='' element={<Logined><Recall /></Logined>} />
					<Route path='recall' element={<Logined><Recall /></Logined>} />
					<Route path='people/:id' element={<Logined><Person /></Logined>} />
					<Route path='patterns/:value' element={<Logined><Pattern/></Logined>} />
					<Route path=':param/filter'>
						<Route
							path=':filter'
							element={
								<Logined>
									<Search
										searchValue={searchValue}
										setSearchValue={setSearchValue}
										clearSearchValue={clearSearchValue}
									/>
								</Logined>
							}
						/>
					</Route>
					<Route path='menu' element={<Menu />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
