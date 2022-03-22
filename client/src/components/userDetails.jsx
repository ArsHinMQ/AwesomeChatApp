import { Component } from 'react';
import thumbnail from '../images/thumbnail.jpg';


class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.closeBtnClick = this.closeBtnClick.bind(this);
    }
    
    closeBtnClick() {
        this.props.userDetailsRef.current.classList.remove('open');
        this.props.blurRef.current.classList.remove('on');
    }

    render() {
        return (
            <div id='userDetails' className='' ref={this.props.userDetailsRef}>
                <div className='d-flex justify-content-end'>
                    <button onClick={this.closeBtnClick} className='btn btn-link'>
                        <i className='fa fa-close'></i>
                    </button>
                </div>
                <div className='d-flex align-items-center flex-column'>
                    <img className='thumbnail large mb-2' src={thumbnail} alt='' />
                    <h2>Header</h2>
                    <small className="status">Status</small>
                </div>
                <div id='userDetailsInfo'>
                    <h6>Info</h6>
                    <div>
                        <p>
                            example@email.com
                        </p>
                        <small>Email</small>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias voluptate et praesentium maxime minima illum qui molestiae iure maiores culpa quidem, inventore harum nam numquam delectus!</p>
                        <small>Bio</small>
                    </div>
                    <div>
                        <p>
                            @username
                        </p>
                        <small>Username</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetails;