import React, { ReactElement } from "react";
import Art from "../../../components/Base/Art/Art";
import Widget from "../../../components/UI/Widget/Widget";
import useBreadcrumb from "../../../lib/hooks/useBreadcrumb";
import usePageTitle from "../../../lib/hooks/usePageTitle";
import { ArtDefinitions, ColorDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const ArtDemo = ({
}): ReactElement => {

    usePageTitle("Art", []);

    useBreadcrumb([
        { label: "Home", href: "/" },
        { label: "Demo", href: "/demo" },
        { label: "Art", href: "/demo/art" },
    ]);

    const arts = Object.values(ArtDefinitions);

    return (
        <>
            <p className="mb-4">
                Alle beschikbare illustraties uit <code>ArtDefinitions</code>, weergegeven als tegel.
                Gebruik: <code>{'<Art art={ArtDefinitions.Dossier} />'}</code>
            </p>

            <div
                className="mb-4"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}
            >
                {arts.map(art => (
                    <Widget
                        key={art}
                        image={<Art art={art} size={SizeDefinitions.Medium} />}
                        background={ColorDefinitions.SurfaceDark}
                        hoverShadowColor={ColorDefinitions.Beige}
                        contentItemPosition="item-center"
                        widgetContent={
                            <>
                                <h5>{art}</h5>
                                <code>ArtDefinitions.{art}</code>
                            </>
                        }
                    />
                ))}
            </div>
        </>
    );
};

export default ArtDemo;
