import React, { useEffect, useState } from "react";
import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";

function Notation({ notation }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const onPageLoad = () => {
            setLoading(false);
        };

        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);
        }
    }, []);

    if (!loading) {
        // abcjs.renderAbc("paper", notation);

        // resize to page
        var visualOptions = { responsive: "resize" };
        abcjs.renderAbc("paper", notation, visualOptions);

        var visualObj = abcjs.renderAbc("*", notation, visualOptions);

        if (abcjs.synth.supportsAudio()) {
            var controlOptions = {
                displayLoop: true,
                displayRestart: true,
                displayPlay: true,
                displayProgress: true,
                displayWarp: true,
                displayClock: true,
            };
            var synthControl = new abcjs.synth.SynthController();
            synthControl.load("#audio", null, controlOptions);
            synthControl.disable(true);
            var midiBuffer = new abcjs.synth.CreateSynth();
            midiBuffer
                .init({
                    visualObj: visualObj[0],
                    options: {},
                })
                .then(function () {
                    synthControl
                        .setTune(visualObj[0], true)
                        .then(function (response) {
                            document
                                .querySelector(".abcjs-inline-audio")
                                .classList.remove("disabled");
                        });
                });
        } else {
            console.log("audio is not supported on this browser");
        }
    }

    function downloadMidi() {
        var a = document.getElementById("midi-download");
        var midi = abcjs.synth.getMidiFile(notation, { midiOutputType: "encoded" });
        a.setAttribute("href", midi);
        a.click();
    }

    return (
        <div>
            <div id="paper"></div>
            <div id="audio"></div>
            <div class="activate-audio"></div>
            <button id="midi" onClick={downloadMidi}>
                Download MIDI
            </button>
            <a
                id="midi-download"
                download="example.mid"
                href="twelve tone midi file"
            ></a>
        </div>
    );
}

export default Notation;
