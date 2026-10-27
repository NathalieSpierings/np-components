import React, { ReactElement, useState } from "react";
import CollapsibleMenu, { CollapsibleMenuItem } from "../../../components/UI/CollapsibleMenu/CollapsibleMenu";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const collectParentIds = (items: CollapsibleMenuItem[]): string[] =>
    items.flatMap((item) =>
        item.children?.length ? [item.id, ...collectParentIds(item.children)] : []
    );

const CollapsibleMenuDemo = ({ }): ReactElement => {

    const [clicked, setClicked] = useState<string>('-');
    const handleClick = (item: CollapsibleMenuItem) => setClicked(String(item.title));

    const createMenuItems = (withIcons: boolean): CollapsibleMenuItem[] => {
        const icon = (name: IconDefinitions) =>
            withIcons ? <Icon icon={name} size={SizeDefinitions.Small} /> : undefined;

        return [
            { id: 'home', title: 'Home', icon: icon(IconDefinitions.home), url: '/' },
            {
                id: 'products',
                title: 'Products',
                description: 'Catalogue and stock',
                icon: icon(IconDefinitions.tag),
                children: [
                    { id: 'products-all', title: 'All products', onClick: handleClick },
                    { id: 'products-new', title: 'New product', onClick: handleClick },
                    {
                        id: 'products-categories',
                        title: 'Categories',
                        children: [
                            {
                                id: 'cat-living',
                                title: 'Living',
                                children: [
                                    { id: 'cat-living-furniture', title: 'Furniture', onClick: handleClick },
                                    { id: 'cat-living-lighting', title: 'Lighting', onClick: handleClick },
                                    { id: 'cat-living-decoration', title: 'Decoration', onClick: handleClick },
                                ],
                            },
                            {
                                id: 'cat-household',
                                title: 'Household',
                                children: [
                                    { id: 'cat-household-kitchen', title: 'Kitchen', onClick: handleClick },
                                    { id: 'cat-household-cleaning', title: 'Cleaning', onClick: handleClick },
                                ],
                            },
                            {
                                id: 'cat-garden',
                                title: 'Garden',
                                children: [
                                    { id: 'cat-garden-furniture', title: 'Garden furniture', onClick: handleClick },
                                    { id: 'cat-garden-tools', title: 'Tools', onClick: handleClick },
                                    { id: 'cat-garden-plants', title: 'Plants', onClick: handleClick },
                                ],
                            },
                        ],
                    },
                    { id: 'products-discontinued', title: 'Discontinued', disabled: true },
                ],
            },
            {
                id: 'orders',
                title: 'Orders',
                description: 'Track and process',
                icon: icon(IconDefinitions.shoppingcart),
                badge: '3',
                children: [
                    { id: 'orders-new', title: 'New', onClick: handleClick },
                    { id: 'orders-in-progress', title: 'In progress', onClick: handleClick },
                    { id: 'orders-shipped', title: 'Shipped', onClick: handleClick },
                    { id: 'orders-delivered', title: 'Delivered', onClick: handleClick },
                    { id: 'orders-returns', title: 'Returns', onClick: handleClick },
                ],
            },
            {
                id: 'demo-links',
                title: 'Demo links',
                icon: icon(IconDefinitions.folder),
                children: [
                    { id: 'link-tags', title: 'Tags demo', url: '/demo/tags' },
                    { id: 'link-modal', title: 'Modal demo', url: '/demo/modal' },
                ],
            },
            { id: 'settings', title: 'Settings', icon: icon(IconDefinitions.cog), onClick: handleClick },
        ];
    };

    const menuItems = createMenuItems(false);
    const menuItemsWithIcons = createMenuItems(true);

    const [openIds, setOpenIds] = useState<string[]>(['products']);

    const boxStyle: React.CSSProperties = { maxWidth: '32rem' };

    return (
        <>
            <h3>Default</h3>
            <div style={boxStyle}>
                <CollapsibleMenu items={menuItems} defaultOpenIds={['products', 'products-categories']} />
            </div>

            <h3 className="mt-4">Default with icons</h3>
            <div style={boxStyle}>
                <CollapsibleMenu items={menuItemsWithIcons} defaultOpenIds={['orders']} />
            </div>

            <h3 className="mt-4">Accordion (één item open per level)</h3>
            <div style={boxStyle}>
                <CollapsibleMenu items={menuItems} accordion />
            </div>

            <h3 className="mt-4">Controlled</h3>
            <div className="gap-2 mb-2" style={{ display: 'flex' }}>
                <Button onClick={() => setOpenIds(collectParentIds(menuItems))}>Alles openklappen</Button>
                <Button variant="outline" onClick={() => setOpenIds([])}>Alles dichtklappen</Button>
            </div>
            <div style={boxStyle}>
                <CollapsibleMenu items={menuItems} openIds={openIds} onOpenChange={setOpenIds} />
            </div>
            <p>Open: <code>{openIds.join(', ') || '(geen)'}</code></p>

            <h3 className="mt-4">Acties via onClick</h3>
            <p>Laatst aangeklikt: <strong>{clicked}</strong></p>
        </>
    );
};

export default CollapsibleMenuDemo;
