import React, { useEffect, useState } from "react";
import abcjs from "abcjs";

function Notation({ notation }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const onPageLoad = () => {
            setLoading(false);
        }

        if (document.readyState === "complete") {
            onPageLoad();
        }
        else {
            window.addEventListener("load", onPageLoad);
        }
    }, []);

    if (!loading)
    {
        // abcjs.renderAbc("paper", notation);

        // resize to page
        var visualOptions = { responsive: 'resize' };
        abcjs.renderAbc("paper", notation, visualOptions);
    }

    return <div>
        <div id="paper"></div>
    </div>;
}

export default Notation;
