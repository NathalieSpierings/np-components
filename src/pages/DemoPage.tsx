import React from "react";
import { Link } from "react-router";

const DemoPage: React.FC = () => {

    return (
        <>
            <p> Welcome to the demo page</p>

            <ul className="list">
                <li><Link to='./dg'>Datagrid demo</Link></li>
                <li><Link to='./dg-loading'>Datagrid loading demo</Link></li>
                <li><Link to='./dg-checkboxes'>Datagrid checkboxes demo</Link></li>
                <li><Link to='./dg-info'>Datagrid table info demo</Link></li>
                <li><Link to='./dg-toolbar'>Datagrid toolbar demo</Link></li>
            </ul>

            <br />
            <br />

            <ul className="list">
                <li><Link to='./contentitem'>Content item demo</Link></li>
                <li><Link to='./dropdown'>Dropdown demo</Link></li>
                <li><Link to='./collection'>Collection demo</Link></li>
                <li><Link to='./tooltip'>Tooltip demo</Link></li>
            </ul>
        </>
    )
}
export default DemoPage;