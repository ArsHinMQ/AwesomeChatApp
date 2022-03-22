import React, { Component } from 'react';
import thumbnail from '../images/thumbnail.jpg';


const Message = (props) => {
    return (
        <div className={`message ${props.type}`}>
            <p>{props.message}</p>
        </div>
    )
}


class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            wasShift: false,
        }

        this.chatBoxRef = React.createRef();

        this.chatWrapperTogglerClick = this.chatWrapperTogglerClick.bind(this);
        this.messageChanged = this.messageChanged.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showUserDetails = this.showUserDetails.bind(this);
    }

    chatWrapperTogglerClick(_event) {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    messageChanged(event) {
        if (event.keyCode === 13 && this.state.wasShift) {
            this.setState({
                wasShift: false
            });
            this.sendMessage();
            event.preventDefault();
        }
        else if (event.keyCode === 16) {
            this.setState({
                wasShift: true
            });
        }
    }

    sendMessage(_event) {
        this.chatBoxRef.current.innerHTML = '';
    }

    showUserDetails(_event) {
        this.props.userDetailsRef.current.classList.add('open');
        this.props.blurRef.current.classList.add('on');
    }

    render() {
        const msg = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsa ea odit quia eos praesentium tempore ratione ad fugiat illum?'
        return (
            <div ref={this.props.chatRef} id='chat' className={(this.state.isOpen) ? 'open' : ''}>
                <div id='chatWrapper'>
                    <header id='userInfo' className='d-flex justify-content-start'>
                        <div id='chatWrapperToggler' className='d-flex justify-content-center mr-2'>
                            <button onClick={this.chatWrapperTogglerClick} className='btn btn-link'><i className='fa fa-arrow-left'></i></button>
                        </div>
                        <a href="#details" onClick={this.showUserDetails} className='d-flex justify-content-center'>
                            <div className='mr-3'>
                                <img className='thumbnail' src={thumbnail} alt='H' />
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <h4 className='m-0'>Header</h4>
                                <small className="status">Status</small>
                            </div>
                        </a>
                    </header>
                    <div id='messages' className='d-flex flex-column'>
                        <Message message='Hello There' type='other' />
                        <Message message='Hi! How you doing?' type='me' />
                        <Message message='I am fine, thanks.' type='other' />
                        <Message message='What about you?' type='other' />
                        <Message message={`Are you busy?\nbc ${msg}`} type='other' />
                        <Message message={`Um... sure just ${msg}`} type='me' />
                        <Message message="But I am in!" type='me' />
                        <Message message='Sweet! See u soon then.' type='other' />

                    </div>
                    <div id='chatBoxWrapper'>
                        <div id='chatBox' ref={this.chatBoxRef} onKeyDown={this.messageChanged} contentEditable='true' spellCheck='false'></div>
                        <button onClick={this.sendMessage} className='btn btn-link'><i className='fa fa-arrow-right'></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;