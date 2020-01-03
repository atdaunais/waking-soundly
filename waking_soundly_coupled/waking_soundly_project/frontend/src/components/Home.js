import React, {Component} from 'react';
import BeepBoxPlayer from "./BeepBoxPlayer";
import {connect} from "react-redux";
import {getUserMusic} from "../actions/userMusic";
import DisplayUserMusic from "./display/DisplayUserMusic";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meditationActive: false,
            errorMsg: "",
            musicArray: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            sessionInfo: {}
        }
    }

    cancelMeditation = () => {
        this.setState({meditationActive: false})
    };

    startMeditation = (e) => {

        e.preventDefault();
        // set a temp object to store the keys and time selected by user
        let sessionInfo = {chosenMusic: [], timer: ""};
        this.state.musicArray.forEach(key => {
            if (document.getElementById(key).checked) {
                sessionInfo.chosenMusic.push(key)
            }
        });

        if (sessionInfo.chosenMusic.length <= 1 || parseInt(document.getElementById("timer").value) <= 0) {
            this.setState({errorMsg: "You must select at least two keys and the timer must be longer than 0 minutes."})
        } else {
            sessionInfo.timer = document.getElementById("timer").value;
            // console.log(sessionInfo);
            this.setState({meditationActive: true, sessionInfo: sessionInfo, errorMsg: ""})
        }
    };

    render() {
        let songDisplay = this.props.userMusic.map(song => (
            <div key={song.id}>
                <input type="checkbox"/> {song.name}
            </div>
        ));
        let noSongs = <div>
            Want to hear your own musical ideas while you meditate? Try adding your own music <Link className="misc_links" to="/addmusic/">Here</Link>!
        </div>;

        if (this.state.meditationActive) {
            return (
                <BeepBoxPlayer cancelMeditation={this.cancelMeditation} sessionInfo={this.state.sessionInfo}/>
            )
        } else {
            return (
                <div>
                    <h1>Waking Soundly</h1>
                    <p>Welcome to Waking Soundly. Pick a few tonal centers from the list below (as many as you like) and
                        we'll weave together a soundscape for your meditation.</p>
                    <form onSubmit={this.startMeditation}>
                        <div className="default_music">
                            <div>
                                <input type="checkbox" id="C"/> C
                            </div>
                            <div>
                                <input type="checkbox" id="C#"/> C#
                            </div>
                            <div>
                                <input type="checkbox" id="D"/> D
                            </div>
                            <div>
                                <input type="checkbox" id="D#"/> D#
                            </div>
                            <div>
                                <input type="checkbox" id="E"/> E
                            </div>
                            <div>
                                <input type="checkbox" id="F"/> F
                            </div>
                            <div>
                                <input type="checkbox" id="F#"/> F#
                            </div>
                            <div>
                                <input type="checkbox" id="G"/> G
                            </div>
                            <div>
                                <input type="checkbox" id="G#"/> G#
                            </div>
                            <div>
                                <input type="checkbox" id="A"/> A
                            </div>
                            <div>
                                <input type="checkbox" id="A#"/> A#
                            </div>
                            <div>
                                <input type="checkbox" id="B"/> B
                            </div>
                        </div>

                        {this.props.isAuthenticated ?
                            <div>
                                <div>Your Music</div>
                                {this.props.userMusic.length > 0 ? songDisplay : noSongs}
                            </div>
                            :
                            ""
                        }
                        <div>
                            How long would you like your meditation to last? <input type="number" id="timer"
                                                                                    defaultValue={0}/> minutes
                        </div>
                        <button>Begin</button>
                    </form>
                    <div>{this.state.errorMsg}</div>
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