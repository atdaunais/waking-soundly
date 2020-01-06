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
                <div className="display_user_music">
                    <EditMusic cancelEdit={this.cancelEdit} song={this.props.song}/>
                </div>
            );
        }
        else{
            return (
                <div className="display_user_music">
                    <div>Song Name: {this.props.song.name}</div>
                    <div>Key: {this.props.song.key}</div>
                    <button onClick={()=>this.setState({editing: true})}>Edit</button>
                    <button className="delete_button" onClick={this.props.deleteUserMusic.bind(this, this.props.song.id)}>Delete</button>
                </div>
            )
        }
    }
}

export default DisplayUserMusic;