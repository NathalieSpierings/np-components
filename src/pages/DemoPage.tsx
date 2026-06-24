import React from "react";
import { Link } from "react-router";

const DemoPage: React.FC = () => {

    return (
        <>
            <p> Welcome to the demo page</p>

            <ul className="list">
                <li><Link to='./datagrid'>Datagrid demo</Link></li>
                <li><Link to='./datagridcheckboxes'>Datagrid checkboxes demo</Link></li>
                <li><Link to='./datagridactions'>Datagrid actions demo</Link></li>
                <li><Link to='./datagridnested'>Datagrid nested demo</Link></li>
            </ul>

            <br />
            <br />

            <ul className="list">
                <li><Link to='./dropdown'>Dropdown demo</Link></li>
                <li><Link to='./tooltip'>Tooltip demo</Link></li>
            </ul>
        </>
    )
}
export default DemoPage;