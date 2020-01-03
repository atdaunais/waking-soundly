import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserMusic, deleteUserMusic, addUserMusic } from '../actions/userMusic';
import DisplayUserMusic from "./display/DisplayUserMusic";

class AddMusic extends Component {
    state = {
        songURL: '',
        key: '',
        name: ''
    };

    static propTypes = {
        // userMusic: PropTypes.array.isRequired,
        getUserMusic: PropTypes.func.isRequired,
        deleteUserMusic: PropTypes.func.isRequired,
        addUserMusic: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getUserMusic();
    }

    changeState = e => this.setState({ [e.target.name]: e.target.value });

    submitForm = e => {
        e.preventDefault();
        const { songURL, key, name } = this.state;
        const song = {songURL, key, name};
        this.props.addUserMusic(song);
    };

    render() {
        const { songURL, key, name } = this.state;
        let songDisplay = this.props.userMusic.map(song => (
            <div key={song.id}>
                <DisplayUserMusic song={song} deleteUserMusic={this.props.deleteUserMusic}/>
            </div>
        ));
        let noSongs = (<div>
            Looks like you don't have any songs right now. Head over to <a className="misc_links" href="https://beepbox.co/" target="_blank">Beepbox</a> and create your own music. Let your creativity fly!
        </div>);

        return (
            <div>
                <h1>Add Music Form</h1>
                <form onSubmit={this.submitForm}>
                    <label htmlFor="songURL">Song URL: </label><input id="songURL" name="songURL" value={songURL} onChange={this.changeState} type="text"/>
                    <label htmlFor="key">Key: </label><input id="key" value={key} name="key" onChange={this.changeState} type="text"/>
                    <label htmlFor="name">Song Name: </label><input id="name" value={name} name="name" onChange={this.changeState} type="text"/>
                    <button>Add Song</button>
                </form>

                <h2>Your Current Music</h2>
                {this.props.userMusic.length > 0 ? songDisplay : noSongs}
                <h3>A Few Things to Keep in Mind</h3>
                <p>notes about how to structure music and upload: tempo, url, empty bars</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
     userMusic: state.userMusic.userMusic
});

export default connect(mapStateToProps, { getUserMusic, deleteUserMusic, addUserMusic })(AddMusic);