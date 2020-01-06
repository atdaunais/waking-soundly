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
        this.setState({
            songURL: "",
            key: "",
            name: ""
        })
    };

    render() {
        const { songURL, key, name } = this.state;
        let songDisplay = this.props.userMusic.map(song => (
            <div key={song.id}>
                <DisplayUserMusic song={song} deleteUserMusic={this.props.deleteUserMusic}/>
            </div>
        ));
        let noSongs = (<div className="misc_text">
            Looks like you don't have any songs right now. Head over to <a className="misc_links" href="https://beepbox.co/" target="_blank">Beepbox</a> and create your own music. Let your creativity fly!
        </div>);

        return (
            <div>
                <h1>Add Your Own Music</h1>
                <div className="form_container">
                    <form onSubmit={this.submitForm}>
                        <label htmlFor="songURL">Song URL: </label><input className="form_input_field" id="songURL" name="songURL" value={songURL} onChange={this.changeState} type="text"/>
                        <br/>
                        <label htmlFor="key">Key: </label>
                        {/*<input className="form_input_field" id="key" value={key} name="key" onChange={this.changeState} type="text"/>*/}
                        <select className="form_input_field" name="key" value={key} id="key" onChange={this.changeState}>
                            <option value="C">C</option>
                            <option value="C#">C#</option>
                            <option value="D">D</option>
                            <option value="D#">D#</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="F#">F#</option>
                            <option value="G">G</option>
                            <option value="G#">G#</option>
                            <option value="A">A</option>
                            <option value="A#">A#</option>
                            <option value="B">B</option>
                        </select>
                        <br/>
                        <label htmlFor="name">Song Name: </label><input className="form_input_field" id="name" value={name} name="name" onChange={this.changeState} type="text"/>
                        <br/>
                        <div className="form_button">
                            <button>Add Song</button>
                        </div>

                    </form>
                </div>

                <h2>Your Current Music</h2>

                {this.props.userMusic.length > 0 ? <div className="user_music_container">{songDisplay}</div> : noSongs}
                <hr/>
                <h3>A Few Things to Keep in Mind</h3>
                <p>In order for your music to work properly during meditation in Waking Soundly, there are a few things you should know while creating in <a className="misc_links" href="https://beepbox.co/" target="_blank">Beepbox</a>:</p>
                <div className="instruction_list">
                    <ul>
                        <li className="misc_text">Make sure you're making your music in a specific key and you note that key properly when saving it to this app. Otherwise, the transitions might be uncomfortable during meditation.</li>
                        <br/>
                        <li className="misc_text">To properly upload your song after you made it in Beepbox, just copy everything in the url in your browser after the "#" mark. That's all the information we'll need to play your music during your session.</li>
                        <br/>
                        <li className="misc_text">Note that all the default music was written with a tempo of 30bpm. For a more seamless experience, it would be best to work within 30bpm or multiples such as 60 or 120 if you wish.</li>
                        <br/>
                        <li className="misc_text">One last thing: make sure you leave one empty bar at the beginning and end of your music when you upload it. This allows for us to smoothly transition from one song to the next.</li>
                    </ul>
                </div>
                <h3>Have fun creating and finding your happy!</h3>
            </div>
        );
    }
}

const mapStateToProps = state => ({
     userMusic: state.userMusic.userMusic
});

export default connect(mapStateToProps, { getUserMusic, deleteUserMusic, addUserMusic })(AddMusic);