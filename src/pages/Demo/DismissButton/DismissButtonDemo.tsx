import moment from "moment";
import React, { ReactElement } from "react";
import DescriptionList from "../../../components/Typography/DescriptionList/DescriptionList";
import DismissButton from "../../../components/UI/DismissButton/DismissButton";
import { ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const DismissButtonDemo = ({
}): ReactElement => {
    return (
        <section className="centered centered--slim shown">


            <h2>Default</h2>
            <div className="grid3">

                <DismissButton label="sluiten" labelPosition="right" />
                <DismissButton circle={true} />
                <DismissButton label="sluiten" labelPosition="left" />

            </div>

            <h2>Circle</h2>
            <div className="grid3">
                <DismissButton circle={true} label="sluiten" labelPosition="right" />
                <DismissButton circle={true} />
                <DismissButton circle={true} label="sluiten" labelPosition="left" />
            </div>

            <h2>Background</h2>
            <div className="grid3">
                <DismissButton background={ColorDefinitions.Blue} circle={true} label="sluiten" labelPosition="right" />
                <DismissButton background={ColorDefinitions.Blue} circle={true} />
                <DismissButton background={ColorDefinitions.Blue} circle={true} label="sluiten" labelPosition="left" />


            </div>

            <h2>Absolute top right</h2>
            <DismissButton right={true} label="sluiten" labelPosition="left" />
            <DismissButton right={true} circle={true}/>


            <h2>Sizes</h2>
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.Tiny} />
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraSmall} />
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.Small} />
            <DismissButton label="sluiten" labelPosition="right" labelColor={ColorDefinitions.Blue} size={SizeDefinitions.Medium} />
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.Large} />
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraLarge} />
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraLarge2} />
            <DismissButton label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraLarge3} />



            <h2>Sizes</h2>
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.Tiny} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraSmall} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.Small} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.Medium} background={ColorDefinitions.Blue} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.Large} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraLarge} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraLarge2} />
            <DismissButton circle={true} label="sluiten" labelPosition="right" size={SizeDefinitions.ExtraLarge3} />


        </section>
    )
}

export default DismissButtonDemo;