import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUserMusic, getUserMusic } from "../../actions/userMusic";

class EditMusic extends Component {
    state = {
        songURL: this.props.song.songURL,
        key: this.props.song.key,
        name: this.props.song.name
    };

    static propTypes = {
        // userMusic: PropTypes.array.isRequired,
        getUserMusic: PropTypes.func.isRequired,
        editUserMusic: PropTypes.func.isRequired
    };

    changeState = e => this.setState({ [e.target.name]: e.target.value });

    updateSong = e => {
        e.preventDefault();
        const { songURL, key, name } = this.state;
        const song = {songURL, key, name};
        this.props.editUserMusic(this.props.song.id, song);
        this.props.cancelEdit()
    };

    render() {
        return (
            <div>
                <form onSubmit={this.updateSong}>
                    <label htmlFor="songURL">Song URL: </label><input id="songURL" name="songURL" defaultValue={this.state.songURL || ''} onChange={this.changeState} type="text"/>
                    <label htmlFor="key">Key: </label><input id="key" defaultValue={this.state.key || ''} name="key" onChange={this.changeState} type="text"/>
                    <label htmlFor="name">Song Name: </label><input id="name" defaultValue={this.state.name || ''} name="name" onChange={this.changeState} type="text"/>
                    <button>Save Changes</button>
                </form>
                <button onClick={this.props.cancelEdit}>Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userMusic: state.userMusic.userMusic
});

export default connect(mapStateToProps, {editUserMusic, getUserMusic}) (EditMusic);