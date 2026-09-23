import React from "react";
import { ProductGetModel } from "../../../../lib/testdata/models";
import StaticInput from "../../../../components/Forms/Input/StaticInput";
import { toDutchDateString } from "../../../../lib/helpers/helpers"

export interface ProductDetailsProps {
    item: ProductGetModel;
}

const ProductDetails = ({ item }: ProductDetailsProps) => {

    return (
        item ? (
            <>
                <StaticInput label="SKU" value={item.sku} />
                <StaticInput label="EAN" value={item.ean} />

                <StaticInput label="Naam" value={item.naam} />
                <StaticInput label="Omschrijving" value={item.omschrijving} />
                <StaticInput label="Categorie" value={item.categorie} />
                <StaticInput label="Subcategorie" value={item.subcategorie} />
                <StaticInput label="Merk" value={item.merk} />
                <StaticInput label="Kleur" value={item.kleur} />
                <StaticInput label="Materiaal" value={item.materiaal} />
                <StaticInput label="Prijs" value={item.prijs} />
                <StaticInput label="Kostprijs" value={item.kostprijs} />
                <StaticInput label="Btw" value={item.btw} />
                <StaticInput label="Voorraad" value={item.voorraad} />
                <StaticInput label="Minimale voorraad" value={item.minimaleVoorraad} />
                <StaticInput label="Maximale voorraad" value={item.maximaleVoorraad} />
                <StaticInput label="Breedte" value={item.afmetingen.breedte} />
                <StaticInput label="Hoogte" value={item.afmetingen.hoogte} />
                <StaticInput label="Lengte" value={item.afmetingen.lengte} />
                <StaticInput label="Gewicht" value={item.afmetingen.gewicht} />
                <StaticInput label="Leverancier" value={item.leverancier} />
                <StaticInput label="Land van herkomst" value={item.landVanHerkomst} />
                <StaticInput label="Beschikbaar vanaf" value={item.beschikbaarVanaf ? toDutchDateString(item.beschikbaarVanaf) : ''}/>
                <StaticInput label="Laatste prijswijziging" value={item.laatstePrijsWijziging ? toDutchDateString(item.laatstePrijsWijziging) : ''} />
                <StaticInput label="Status" value={item.status} />
                <StaticInput label="Garantie maanden" value={item.garantieMaanden} />
                <StaticInput label="Beoordeling" value={item.beoordeling} />
                <StaticInput label="Populair" value={item.populair} />
                <StaticInput label="Duurzaam" value={item.duurzaam} />
                <StaticInput label="Magazijn" value={item.magazijn} />
            </>
        ) : <></>
    )
}

export default ProductDetails;