import React, { ReactElement } from "react";
import ContentItem from "../../../components/UI/ContentItem/ContentItem";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { IconDefinitions } from "../../../lib/utils/definitions";


const ContentItemPage = ({
}): ReactElement => {

    return (
        <section className="centered centered--slim">
            <fieldset className="fieldset mt-4">
                <legend className="legend title-md border-surface">Defaults & Columns</legend>

                


            <h3>Default</h3>
            <ContentItem  item={{
                prefix: <Icon icon={IconDefinitions.bell} />,
                content: <p>Content goes here</p>,
                postfix: <Icon icon={IconDefinitions.bin} />,
            }} />


                <h3 className="mt-4">Separator</h3>
                <ContentItem
                    item={{
                       prefix: <Icon icon={IconDefinitions.bell} />,
                        separatorAfterPrefix: true,
                        separatorAfterMeta: true,
                        content: <p>Content goes here</p>,
                        postfix: <Icon icon={IconDefinitions.bin} />,

                    }} />

                <h3 className="mt-4">Prefix only</h3>
                <ContentItem item={{
                   prefix: <Icon icon={IconDefinitions.bell} />,
                }} />

                <h3 className="mt-4">Meta only</h3>
                <ContentItem item={{
                   content: <p>Content goes here</p>,
                }} />

                <h3 className="mt-4">Postfix only</h3>
                <ContentItem item={{
                    postfix: (
                        <>
                            <Icon icon={IconDefinitions.bulb}/>
                            <Icon icon={IconDefinitions.bulb}/>
                        </>
                    ),

                }} />

                <h3 className="mt-4">Prefix & Meta</h3>
                <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                   content: <p>Content goes here</p>,
                }} />


                <h3 className="mt-4">Meta & Postfix</h3>
                <ContentItem item={{
                   content: <p>Content goes here</p>,
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />


                <h3 className="mt-4">Prefix & Postfix</h3>
                <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                    postfix: (
                        <>
                            <Icon icon={IconDefinitions.bulb}/>
                            <Icon icon={IconDefinitions.bulb}/>
                        </>
                    ),

                }} />


            </fieldset>

            <fieldset className="fieldset mt-4">
                <legend className="legend title-md border-surface">Prefix</legend>

                <h3>item-start</h3>
                <ContentItem item={{
                    prefixItemPosition: "item-start",
                   prefix: <Icon icon={IconDefinitions.bell} />,
                   content: <p>Content goes here</p>,
                   postfix: <Icon icon={IconDefinitions.bin} />,
                }} />



                <h3 className="mt-4">item-center</h3>
                <ContentItem item={{
                    prefixItemPosition: "item-center",
                   prefix: <Icon icon={IconDefinitions.bell} />,
                  content: <p>Content goes here</p>,
                   postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

              
                <h3 className="mt-4">item-end</h3>
                <ContentItem item={{
                    prefixItemPosition: "item-end",
                    prefix: <Icon icon={IconDefinitions.bell} />,
                   content: <p>Content goes here</p>,
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />              

            </fieldset>

            <fieldset className="fieldset mt-4">
                <legend className="legend title-md border-surface">Meta</legend>

                <h3>flex-justify-start</h3>
                <ContentItem item={{
                   prefix: <Icon icon={IconDefinitions.bell} />,
                    contentJustifyPosition:"justify-start",
                   content: <p>Content goes here</p>,
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />
                

                <h3 className="mt-4">flex-justify-center</h3>
                 <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                    contentJustifyPosition:"justify-center",
                   content: <p>Content goes here</p>,
                   postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

               
                <h3 className="mt-4">flex-justify-end</h3>
                 <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                    contentJustifyPosition:"justify-end",
                   content: <p>Content goes here</p>,
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

                <h3 className="mt-4">flex-start</h3>
                 <ContentItem item={{
                   prefix: <Icon icon={IconDefinitions.bell} />,
                    contentItemPosition:"item-start",
                    content: <p>Content goes here</p>,
                   postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

                

                <h3 className="mt-4">flex-center</h3>
                <ContentItem item={{
                   prefix: <Icon icon={IconDefinitions.bell} />,
                    contentItemPosition:"item-center",
                    content: <p>Content goes here</p>,
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

                

                <h3 className="mt-4">flex-end </h3>
                <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                    contentItemPosition:"item-end",
                   content: <p>Content goes here</p>,
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

               
            </fieldset>

            <fieldset className="fieldset mt-4 pb-4">
                <legend className="legend title-md border-surface">Postfix</legend>

                <h3>item-start</h3>
                <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                    content: <p>Content goes here</p>,
                    contentItemPosition: 'item-start',
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

               
                <h3 className="mt-4">item-center</h3>
                <ContentItem item={{
                    prefix: <Icon icon={IconDefinitions.bell} />,
                    content: <p>Content goes here</p>,
                    contentItemPosition: 'item-center',
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

               

                <h3 className="mt-4">item-end</h3>
                <ContentItem item={{
                   prefix: <Icon icon={IconDefinitions.bell} />,
                    content: <p>Content goes here</p>,
                    contentItemPosition: 'item-end',
                    postfix: <Icon icon={IconDefinitions.bin} />,
                }} />

           </fieldset>

        </section>

    )
}

export default ContentItemPage;