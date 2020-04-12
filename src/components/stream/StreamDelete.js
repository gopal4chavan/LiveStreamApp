import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom'

class StreamDelete extends React.Component{

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions(){
    const {id} = this.props.match.params;
    return(
      <>
        <button onClick={() => this.props.deleteStream(id)} className='ui button negative'>Delete</button>
        <Link to='/' className='ui button'>Cancel</Link>
      </>
    )
  }

  renderConent(){
    if(!this.props.stream){
      return 'Are you sure you want to delete this stream?'
    }else{
      return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
    }
  }

  render(){
    return (
        <Modal
          header='Delete Stream'
          content={this.renderConent()}
          onClose={() => history.push('/')}
          actions={this.renderActions()}
        />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);