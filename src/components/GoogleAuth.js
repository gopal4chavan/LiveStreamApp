import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component{
  componentDidMount(){
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '1090388858650-s3610tr2uu2ujbmhrsag4g9cpnrqn0qo.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // this.setState({ isSignedIn: this.auth.isSignedIn.get()});
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({ isSignedIn: this.auth.isSignedIn.get()});
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  }

  onSignInClick = () =>{
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }
  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    }else if(this.props.isSignedIn){
      return(
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className='google icon' />
          Sign Out
        </button>
      )
    }else{
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className='google icon' />
          Sign In With Google
        </button>
      )
    }
  }
  render(){
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);