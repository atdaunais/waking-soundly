import React, {Component} from 'react';
import BeepBoxPlayer from "./BeepBoxPlayer";
import {connect} from "react-redux";
import {getUserMusic} from "../actions/userMusic";
import {BrowserRouter as Router, Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meditationActive: false,
            errorMsg: "",
            musicArray: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            userMusicArray: [],
            sessionInfo: {}
        }
    }

    componentDidMount() {
        this.props.getUserMusic();
    }

    cancelMeditation = () => {
        this.setState({meditationActive: false})
    };

    startMeditation = (e) => {
        e.preventDefault();
        // set a temp object to store the keys and time selected by user
        let sessionInfo = {chosenMusic: [], chosenUserMusic: [], allSessionKeys: [], timer: "", background: ""};
        this.state.musicArray.forEach(key => {
            if (document.getElementById(key).checked) {
                sessionInfo.chosenMusic.push(key);
                sessionInfo.allSessionKeys.push(key);
            }
        });

        this.props.userMusic.forEach(userSong => {
            if (document.getElementById(userSong.name).checked) {
                sessionInfo.chosenUserMusic.push(userSong.name);
                if (!sessionInfo.allSessionKeys.includes(userSong.key)){
                    sessionInfo.allSessionKeys.push(userSong.key)
                }
            }
        });

        if (sessionInfo.chosenMusic.length <= 1 || parseInt(document.getElementById("timer").value) <= 0) {
            this.setState({errorMsg: "You must select at least two keys and the timer must be longer than 0 minutes."})
        } else {
            sessionInfo.timer = document.getElementById("timer").value;
            sessionInfo.background = document.getElementById("image_choice").value;
            console.log(sessionInfo);
            this.setState({meditationActive: true, sessionInfo: sessionInfo, errorMsg: ""})
        }
    };

    render() {
        let songDisplay = this.props.userMusic.map(song => (
            <div key={song.id} className="checkbox">
                <input type="checkbox" id={song.name}/><label htmlFor={song.name}>{song.name} ({song.key})</label>
            </div>
        ));

        let noSongs = <div>
            <div className="misc_text">Want to hear your own musical ideas while you meditate? Try adding your own music <Link
                className="misc_links" to="/addmusic/">Here</Link>!</div>
        </div>;

        let defaultCheckboxes = this.state.musicArray.map(key => (
            <div className="checkbox" key={key}>
                <input type="checkbox" id={key}/><label htmlFor={key}>{key}</label>
            </div>
        ));

        if (this.state.meditationActive) {
            return (
                <BeepBoxPlayer cancelMeditation={this.cancelMeditation} changeContainer={this.props.changeContainer} sessionInfo={this.state.sessionInfo}/>
            )
        } else {
            return (
                <div>
                    <img src="../../static/frontend/logo_transparent_background.png" id="home_logo" alt="logo"/>
                    <p>Welcome to Waking Soundly. Pick a few tonal centers from the list below (as many as you like) and
                        we'll weave together a soundscape for your meditation.</p>
                    <div id="error_msg">{this.state.errorMsg}</div>
                    <form onSubmit={this.startMeditation}>
                        <div className="default_music">
                            {defaultCheckboxes}
                        </div>
                        <div className="misc_text">
                            What would you like on your screen while you meditate? <select className="form_input_field" name="image_choice" id="image_choice">
                            <option value="default">Current Picture</option>
                            <option value="blackout">Blackout Screen</option>
                        </select>
                        </div>

                        {this.props.isAuthenticated ?
                            <div>
                                <Link to="/addmusic/" id="my_music_link"><h2>My Music</h2></Link>
                                    {this.props.userMusic.length > 0 ? <div className="user_music">{songDisplay}</div> : noSongs}
                            </div>
                            :
                            ""
                        }
                        <div className="misc_text">
                            How long would you like your meditation to last? <input type="number" id="timer"
                                                                                    defaultValue={0}/> minutes
                        </div>
                        <button>Begin</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    userMusic: state.userMusic.userMusic
});

export default connect(mapStateToProps, {getUserMusic})(Home);