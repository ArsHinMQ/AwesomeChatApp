import React, { Component } from 'react';
import thumbnail from '../images/thumbnail.jpg';


const ChatRoom = (props) => {
    return (
        <button type='button' id={props.id} onClick={props.switchChatRoom} className={`chat-room d-flex align-items-center px-3 btn text-left btn-link ${props.className}`}>
            <div>
                <img className='thumbnail' src={thumbnail} alt='' />
            </div>
            <div className='content'>
                <div className='ml-3'>
                    <small className='float-right mt-1'>00:00 AM</small>
                    <h5>Header</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nemo pariatur repellat explicabo, sint saepe mollitia totam hic nihil culpa aspernatur? Possimus dicta consectetur tempora?
                    </p>
                </div>
            </div>
        </button>
    )
}


class Inbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'activeLink': 1
        }

        this.settingsTogglerClick = this.settingsTogglerClick.bind(this);
        this.switchChatRoom = this.switchChatRoom.bind(this);
    }

    settingsTogglerClick() {
        this.props.settingsRef.current.classList.add('open');
        this.props.blurRef.current.classList.add('on');
    }

    switchChatRoom(event) {
        this.setState(
            {
                'activeLink': event.currentTarget.id
            }
        )
        if (window.screen.width <= 800) {
            this.props.chatRef.current.classList.add('open');
        }
    }

    render() {
        const chatRooms = [];
        for (let i = 0; i < 10; i++) {
            chatRooms.push(i)
        }
        return (
            <div id='inbox'>
                <header className='d-flex pb-2'>
                    <button onClick={this.settingsTogglerClick} id='settingsToggler' className='btn btn-link mr-2'><i className='fa fa-bars'></i></button>
                    <input id='searchInput' type='text' placeholder='Search' />
                </header>
                <div id='chatRooms'>
                    {
                        chatRooms.map(id => {
                            return(
                                <ChatRoom id={id} key={id} switchChatRoom={this.switchChatRoom} className={(this.state.activeLink == id) ? 'selected' : ''} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Inbox;