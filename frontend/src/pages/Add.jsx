import React from 'react'
import avatar from '../assets/profileGif.gif'
import Navbar from '../layouts/Navbar'
import Item from '../components/Item'

const Add = () => {
	return (
		<div>
			<img src={avatar} style={{width: '100%', height: '30svh'}} />
			<div>
				<div>
					<div>
						<div className="card">
							<h3>Word</h3>
							<div>
								Сharacteristics of this word
							</div>
							<hr />
							<h4>Description</h4>
							<p>Example</p>
						</div>
					</div>
				</div>
				<div>
					<h2>Pro Tips</h2>
					<div>
						<div className="card">
							<h4>Header</h4>
							<p>Description</p>
							<p>Example</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2>Compare with</h2>
				<Navbar>
					<Item><span>Word</span> <span>Word</span> <span>Word</span></Item>
				</Navbar>
				<div>
					Description
				</div>
				...
			</div>
		</div>
	)
}

export default Add