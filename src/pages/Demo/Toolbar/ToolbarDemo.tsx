import React, { ReactElement } from "react";
import { Toolbar } from "../../../components/UI/Toolbar";
import Button from "../../../components/UI/Button/Button";
import Dropdown  from "../../../components/Forms/Dropdown/Dropdown";

const ToolbarDemo = ({
}): ReactElement => {
    return (
        <>
            <h2>Default</h2>
            <Toolbar
                title="Toolbar Demo"
                prefixItems={[
                    <Button key="btna1">Item 1</Button>,
                    <Button key="btna2">Item 2</Button>,
                ]}

                postfixItems={[
                    <Button key="btnb1">Item 1</Button>,
                    <Button key="btnb2">Item 2</Button>,
                ]}
            />

            <h2>Nav items</h2>
            <Toolbar
                title="Toolbar Demo"
                navItems={[
                    <Dropdown key="dropdown"
                        dropdownToggle={{
                            label: 'Click me'
                        }}
                        menuItems={[{
                            id: '1',
                            label: 'Item 1'
                        }, {
                            id: '2',
                            label: 'Item 2'
                        }]} />,

                     <Dropdown key="dropdown2"
                        dropdownToggle={{
                            label: 'Click me'
                        }}
                        menuItems={[{
                            id: '1',
                            label: 'Item 1'
                        }, {
                            id: '2',
                            label: 'Item 2'
                        }]} />,

                ]}
                showSeparator
                prefixItems={[
                    <Button key="btna1">Item 1</Button>,
                    <Button key="btna2">Item 2</Button>,
                ]}
                postfixItems={[
                    <Button key="btnb1">Item 1</Button>,
                    <Button key="btnb2">Item 2</Button>,
                ]}
            />
        </>
    )
}

export default ToolbarDemo;