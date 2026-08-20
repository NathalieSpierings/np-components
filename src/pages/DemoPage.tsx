import React from "react";
import { Link } from "react-router";

const DemoPage: React.FC = () => {

    return (
        <>
            <p> Welcome to the demo page</p>

            <h4>Datagrid</h4>
            <ul className="list">
                <li><Link to="/demo/dg-test">Test</Link></li>
                <li><Link to="/demo/dg-column-filter">Column filters</Link></li>
                <li><Link to="/demo/dg-column-pinning">Column pinning</Link></li>
                <li><Link to="/demo/dg-column-reorder">Column reorder</Link></li>
                <li><Link to="/demo/dg-column-resize">Column resize</Link></li>
                <li><Link to="/demo/dg-column-sticky">Column sticky</Link></li>
                <li><Link to="/demo/dg-column-visibility">Column visibility</Link></li>
                <li><Link to="/demo/dg-total-row">Total row</Link></li>                
                <li><Link to="/demo/dg-all">All</Link></li>
                <li><Link to="/demo/dg-checkbox">Checkboxes</Link></li>
                <li><Link to="/demo/dg">Default</Link></li>
                <li><Link to="/demo/dg-headerfooter">Header footer content</Link></li>
                <li><Link to="/demo/dg-loading">Loading</Link></li>
                <li><Link to="/demo/dg-nested">Nested</Link></li>
                <li><Link to="/demo/dg-pager">Pager</Link></li>
                <li><Link to="/demo/dg-actions">Row actions</Link></li>
                <li><Link to="/demo/dg-selected-row">Selected row</Link></li>
                <li><Link to="/demo/dg-sidebarandtabs">Sidebar & tabs</Link></li>
                <li><Link to="/demo/dg-sidebar">Sidebar</Link></li>
                <li><Link to="/demo/dg-info">Table info</Link></li>
                <li><Link to="/demo/dg-tabs">Tabs</Link></li>
                <li><Link to="/demo/dg-toolbar">Toolbar</Link></li>
            </ul>

            <br />
            <br />
            <h4>Forms</h4>
            <ul className="list">
                <li><Link to='multiselect'>Multiselect</Link></li>
                <li><Link to='./dropdown'>Dropdown</Link></li>
            </ul>

            <br />
            <br />
            <h4>UI</h4>
            <ul className="list">
                <li><Link to='modal'>Modal</Link></li>
                <li><Link to='./btn'>Button</Link></li>
                <li><Link to='./contentitem'>Content item</Link></li>
                <li><Link to='./collection'>Collection</Link></li>
                <li><Link to='./tooltip'>Tooltip</Link></li>
                <li><Link to='./descriptionlist'>Description list</Link></li>
                <li><Link to='./dismissbutton'>Dismiss button</Link></li>
                <li><Link to='./icon'>Icons</Link></li>
            </ul>
        </>
    )
}
export default DemoPage;