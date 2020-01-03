import React, {Component} from 'react';
import EditMusic from "./EditMusic";

class DisplayUserMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    cancelEdit = () => {
        this.setState({editing: false})
    };

    render() {
        if(this.state.editing){
            return (
                <div>
                    <EditMusic cancelEdit={this.cancelEdit} song={this.props.song}/>
                </div>
            );
        }
        else{
            return (
                <div>
                    <p>Song URL: {this.props.song.name}</p>
                    <p>Key: {this.props.song.key}</p>
                    <button onClick={this.props.deleteUserMusic.bind(this, this.props.song.id)}>Delete</button>
                    <button onClick={()=>this.setState({editing: true})}>Edit</button>
                </div>
            )
        }
    }
}

export default DisplayUserMusic;