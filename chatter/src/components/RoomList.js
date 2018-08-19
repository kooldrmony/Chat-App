import React from 'react';

class RoomList extends React.Component {
	render() {
		return(
			<div className="rooms-list">
				<ul>
				<h3>Your Rooms</h3>
				{this.props.rooms.map(room => {
					<li>
						<a 
							onClick={() => this.props.subcribeToRoom(room.id)} 
							href="#">
							# {room.name}
						</a>
					</li>
			})}
				</ul>
			</div>
			)
	}

}

export default RoomList;
