import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getMainMusic} from "../actions/mainMusic";
import {getTransitionMusic} from "../actions/transitionMusic";

class BeepBoxPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songArray: [],
            transitionArray: [],
            currentSong: "",
            currentTrans: "",
            songIsPlaying: false,
            transIsPlaying: false,
            songSelected: false,
            transSelected: false,
            barChecker: "",
            duration: 0,
            durationFunc: "",
            fadingOut: false
        }
    }

    // todo create fadein/fadeout timers (increase volume from 0 by .1 for the first 10 seconds)(decrease volume from 1 by .05 for the last 20 seconds)

    componentDidMount() {
        this.props.getTransitionMusic();
        this.props.getMainMusic();
        setTimeout(this.sessionBuild, 1000);
        setTimeout(this.startSession, 2000);
        setTimeout(this.durationStart, 2000);
        setTimeout(this.barCheckStart, 3000);
    };

    durationStart = () => {
        this.setState({
            durationFunc: setInterval(this.durationFunc, 30000)
        })
    };

    barCheckStart = () => {
        this.setState({
            barChecker: setInterval(this.checkStatus, 50)
        });
    };

    exit = () => {
        // stops music currently playing, sets all session details back to nothing, goes back to homepage
        if (this.state.currentSong !== "") {
            this.state.currentSong.song.pause();
        }
        if (this.state.currentTrans !== "") {
            this.state.currentTrans.song.pause();
        }
        this.setState({
            songArray: [],
            transitionArray: [],
            currentSong: {},
            currentTrans: {},
            songIsPlaying: false,
            transIsPlaying: false,
            songSelected: false,
            transSelected: false,
        });
        clearInterval(this.state.barChecker);
        clearInterval(this.state.durationFunc);
        clearInterval(this.state.fadeOutTimer);
        this.props.cancelMeditation()
    };

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // populates the state with the chosen keys for songs/transitions and the duration for the session
    sessionBuild = () => {
        this.props.sessionInfo.chosenMusic.forEach(key => {
            this.props.mainMusic.forEach(song => {
                if (key === song.key) {
                    this.state.songArray.push(song);
                }
            });
            this.props.transitions.forEach(trans => {
                if (key === trans.startKey && this.props.sessionInfo.chosenMusic.includes(trans.endKey)) {
                    this.state.transitionArray.push(trans);
                }
            })
        });
        this.setState({
            duration: parseInt(this.props.sessionInfo.timer)
        });
    };

    // picks first song at random, stores in state, plays song with fade in
    startSession = () => {
        let randInt = this.randomInt(0, (this.state.songArray.length - 1));
        let currentSong = new window.beepbox.Synth(this.state.songArray[randInt].songURL);
        this.setState({
            currentSong: {song: currentSong, key: this.state.songArray[randInt].key},
            songIsPlaying: true
        });
        // skips the empty space of the first bar of the first song
        currentSong.volume = 0;
        currentSong.snapToBar(1);
        currentSong.play();
        this.setState({
            fadeInTimer: setInterval(() => this.fadeIn(currentSong), 500)
        })
    };

    // narrows pool of transitions to those that start in the current song's key, selects a random trans from that narrowed pool and stores in the state as the current transition
    selectTrans = () => {
        let tempTransArray = [];
        this.state.transitionArray.forEach(trans => {
            if (trans.startKey === this.state.currentSong.key) {
                tempTransArray.push(trans)
            }
        });
        console.log(tempTransArray);
        let randInt = this.randomInt(0, (tempTransArray.length - 1));
        let transSynth = new window.beepbox.Synth(tempTransArray[randInt].songURL);
        this.setState({
            currentTrans: {
                song: transSynth,
                startKey: tempTransArray[randInt].startKey,
                endKey: tempTransArray[randInt].endKey
            }
        });
    };

    // same process as transition select but for main songs
    selectSong = () => {
        let tempSongArray = [];
        this.state.songArray.forEach(song => {
            if (song.key === this.state.currentTrans.endKey) {
                tempSongArray.push(song)
            }
        });
        console.log(tempSongArray);
        let randInt = this.randomInt(0, (tempSongArray.length - 1));
        let songSynth = new window.beepbox.Synth(tempSongArray[randInt].songURL);
        this.setState({
            currentSong: {song: songSynth, key: tempSongArray[randInt].key}
        })
    };

    fadeIn = (song) => {
        if (song.volume < 1) {
            song.volume += .02;
        } else if (song.volume >= 1) {
            console.log("stop fade in");
            song.volume = 1;
            clearInterval(this.state.fadeInTimer);
        }
    };

    // decreases volume of both song and transition to account for either one currently playing
    fadeOut = () => {
        if (this.state.currentSong !== "" && this.state.currentSong.song.volume > 0) {
            this.state.currentSong.song.volume -= .01
        }
        if (this.state.currentTrans !== "" && this.state.currentTrans.song.volume > 0) {
            this.state.currentTrans.song.volume -= .01
        }
    };

    checkStatus = () => {
        if (this.state.duration === .5 && !this.state.fadingOut) {
            this.setState({
                fadeOutTimer: setInterval(this.fadeOut, 300),
                fadingOut: true
            });
        } else if (this.state.duration === 0) {
            this.exit();
        } else {
            if (this.state.songIsPlaying) {
                console.log("check song");
                if (this.state.currentSong.song.bar === (this.state.currentSong.song.song.barCount - 3) && !this.state.transSelected) {
                    console.log("select transition");
                    this.selectTrans();
                    this.setState({
                        transSelected: true
                    })
                } else if (this.state.currentSong.song.bar === (this.state.currentSong.song.song.barCount - 2)) {
                    console.log(this.state.currentTrans);
                    console.log("play transition");
                    this.state.currentTrans.song.play();
                    this.setState({
                        songIsPlaying: false,
                        transIsPlaying: true,
                        transSelected: false
                    })
                }
            } else if (this.state.transIsPlaying) {
                console.log(this.state.currentTrans.song.song.barCount);
                if (this.state.currentTrans.song.bar === (this.state.currentTrans.song.song.barCount - 3) && !this.state.songSelected) {
                    console.log("select song");
                    this.selectSong();
                    this.setState({
                        songSelected: true
                    })
                } else if (this.state.currentTrans.song.bar === (this.state.currentTrans.song.song.barCount - 2)) {
                    console.log(this.state.currentSong);
                    console.log("play song");
                    this.state.currentSong.song.play();
                    this.setState({
                        songIsPlaying: true,
                        transIsPlaying: false,
                        songSelected: false
                    })
                }
            }
        }
    };

    // decreases duration by .5 to keep track of 30 second intervals
    durationFunc = () => {
        console.log(`the current time left is ${this.state.duration - .5}`);
        if (this.state.duration !== 0) {
            this.setState({
                duration: (this.state.duration - .5)
            })
        }
    };

    // reverb below 0 will break the playback
    increase = () => {
        // this.state.currentSong.song.reverb += 1;
        this.state.currentSong.volume += .1
    };

    decrease = () => {
        // this.state.currentSong.song.reverb -= 1;
        this.state.currentSong.volume -= .05
    };

    checkCurrentSong = () => {
        console.log(this.state.currentSong);
    };

    render() {
        return (
            <div>
                <h1>Beepbox Player</h1>
                <button onClick={() => this.sessionBuild()}>Build</button>
                <button onClick={() => this.startSession()}>Play</button>
                <button onClick={() => this.exit()}>Cancel</button>
                <button onClick={() => this.checkCurrentSong()}>Check</button>
                <button onClick={() => this.increase()}>Inc</button>
                <button onClick={() => this.decrease()}>Dec</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mainMusic: state.mainMusic.mainMusic,
    transitions: state.transitions.transitions
});

export default connect(mapStateToProps, {getMainMusic, getTransitionMusic})(BeepBoxPlayer);