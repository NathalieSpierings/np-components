import React from "react";
import { Link } from "react-router";

const DemoPage: React.FC = () => {

    return (
        <>
            <p> Welcome to the demo page</p>

            <ul>
                <li><Link to='./dropdown'>Dropdown demo</Link>            </li>
                <li><Link to='./datagrid'>Datagrid demo</Link>            </li>
            </ul>
        </>
    )
}
export default DemoPage;