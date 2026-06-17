import React, { ReactElement } from "react";
import { Link } from "react-router";

const HomePage = ({
}): ReactElement => {

    return (
        <>
        <h3>Welkom to the Homepage</h3>
            <ul>
                <li><Link to='./demo'>Go to the demo's</Link>            </li>
            </ul>
        </>
    )
}

export default HomePage;