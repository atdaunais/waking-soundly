import React, {Component} from 'react';

class About extends Component {
    render() {
        return (
            <div>
                <h1>Waking Soundly</h1>
                <p>Waking Soundly is a music-led meditation aid that aims to make it easier to drift into a mentally refreshed state. Music will be randomly weaved together throughout your meditation session so you don't have to think about a thing.</p>
                <h2>The Concept</h2>
                <p>Music has inherent moments of tension and release when moving from one key to another. When we meditate, we want to achieve those same moments of release as we breathe and drift more deeply into the mental state we wish to reach. Having short clips of music in each key allows for you to experience this feeling of constantly riding this wave between tension and release.</p>
                <h2>Create Your Happy</h2>
                <p>Waking Soundly made all music using <a className="misc_links" href="https://beepbox.co/" target="_blank">Beepbox</a>, an open-source synthesizer with a great range of auditory possibilities. We want you to feel welcome to make your own creations using Beepbox and put it into your meditation sessions. Waking Soundly is ultimately a place for you to find your own calm and joy, so feel free to tailor your session to the musical ideas in your own head. You don't have to be a musician to make music. You just have to know what sounds bring you joy. So check out Beepbox and just play with sound!</p>
            </div>
        );
    }
}

export default About;