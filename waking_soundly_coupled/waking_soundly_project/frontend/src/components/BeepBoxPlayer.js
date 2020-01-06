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
import {getUserMusic} from "../actions/userMusic";

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
        this.changeBG();
        this.props.changeContainer();
        this.props.getTransitionMusic();
        this.props.getMainMusic();
        this.props.getUserMusic();
        setTimeout(this.sessionBuild, 1000);
        setTimeout(this.startSession, 2000);
        setTimeout(this.durationStart, 2000);
        setTimeout(this.barCheckStart, 3000);
    };

    // componentWillUnmount() {
    //     this.exit()
    // }

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

    // stops music currently playing, sets all session details back to nothing, goes back to homepage
    exit = () => {
        this.props.changeContainer();
        if (document.body.classList.contains("body_blackout")){
            document.body.classList.add("body_default");
            document.body.classList.remove("body_blackout")
        }
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
        });
        this.props.sessionInfo.chosenUserMusic.forEach(name => {
            this.props.userMusic.forEach(userSong => {
                if (name === userSong.name){
                    this.state.songArray.push(userSong);
                }
            })
        });
        this.props.sessionInfo.allSessionKeys.forEach(key => {
            this.props.transitions.forEach(trans => {
                if (key === trans.startKey && this.props.sessionInfo.allSessionKeys.includes(trans.endKey)) {
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

    dynamicEffects = () => {

    };

    checkStatus = () => {
        // if (this.state.duration === (parseInt(this.props.sessionInfo.timer)/2) && this.state.duration > 5) {
        //     this.dynamicEffects()
        // }
        if (this.state.duration === .5 && !this.state.fadingOut) {
            this.setState({
                fadeOutTimer: setInterval(this.fadeOut, 300),
                fadingOut: true
            });
        } else if (this.state.duration === 0) {
            this.exit();
        } else {
            if (this.state.songIsPlaying) {
                if (this.state.currentSong.song.bar === (this.state.currentSong.song.song.barCount - 3) && !this.state.transSelected) {
                    this.selectTrans();
                    this.setState({
                        transSelected: true
                    })
                } else if (this.state.currentSong.song.bar === (this.state.currentSong.song.song.barCount - 2)) {
                    this.state.currentTrans.song.play();
                    this.setState({
                        songIsPlaying: false,
                        transIsPlaying: true,
                        transSelected: false
                    })
                }
            } else if (this.state.transIsPlaying) {
                if (this.state.currentTrans.song.bar === (this.state.currentTrans.song.song.barCount - 3) && !this.state.songSelected) {
                    this.selectSong();
                    this.setState({
                        songSelected: true
                    })
                } else if (this.state.currentTrans.song.bar === (this.state.currentTrans.song.song.barCount - 2)) {
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
        if (this.state.duration !== 0) {
            this.setState({
                duration: (this.state.duration - .5)
            })
        }
    };

    // reverb below 0 will break the playback
    increase = () => {
        console.log(this.state.currentSong.song.song.reverb);
        this.state.currentSong.song.song.reverb += 1;
        // this.state.currentSong.volume += .1
    };

    decrease = () => {
        this.state.currentSong.song.reverb -= 1;
        // this.state.currentSong.volume -= .05
    };

    checkCurrentSong = () => {
        // console.log(this.state.currentSong);
        console.log(this.state)
    };

    changeBG = () => {
        if (this.props.sessionInfo.background === "blackout"){
            document.body.classList.add("body_blackout");
            document.body.classList.remove("body_default");
        }
    };

    render() {
        return (
            <div>
                {/*<h1>Beepbox Player</h1>*/}
                {/*<button onClick={() => this.sessionBuild()}>Build</button>*/}
                {/*<button onClick={() => this.startSession()}>Play</button>*/}
                <button onClick={() => this.exit()}>Exit Session</button>
                {/*<button onClick={() => this.checkCurrentSong()}>Check</button>*/}
                {/*<button onClick={() => this.increase()}>Inc</button>*/}
                {/*<button onClick={() => this.decrease()}>Dec</button>*/}
                {/*<button onClick={() => this.changeBG()}>Switch background</button>*/}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mainMusic: state.mainMusic.mainMusic,
    transitions: state.transitions.transitions,
    userMusic: state.userMusic.userMusic,
});

export default connect(mapStateToProps, {getMainMusic, getTransitionMusic, getUserMusic})(BeepBoxPlayer);