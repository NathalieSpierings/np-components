import moment from 'moment';
import { formatCurrency } from '../helpers/helpers';


export const defaultProductColumns = () => {
    return [
        { prop: "id", title: "Id", sortable: true, showTooltip: true, width: 80 },
        { prop: "sku", title: "SKU", sortable: true, visible: true },
        { prop: "ean", title: "EAN", sortable: true, showTooltip: true, visible: true },
        { prop: "naam", title: "Product", sortable: true, showTooltip: true, visible: true, width: 200 },
        { prop: "omschrijving", title: "Omschrijving", visible: true, width: 300 },
        { prop: "categorie", title: "Categorie", sortable: true, showTooltip: true, visible: true },
        { prop: "subcategorie", title: "Subcategorie", sortable: true, showTooltip: true, visible: true },
        { prop: "merk", title: "Merk", sortable: true, showTooltip: true, visible: true },
        { prop: "kleur", title: "Kleur", sortable: true, showTooltip: true },
        { prop: "materiaal", title: "Materiaal", sortable: true, showTooltip: true },
        { prop: "prijs", title: "Prijs", sortable: true, showTooltip: true, visible: true, width: 150, summary: true, transformValue: formatCurrency },
        { prop: "kostprijs", title: "kostprijs", sortable: true, showTooltip: true, visible: true, width: 150, summary: true, transformValue: formatCurrency },
        { prop: "btw", title: "BTW", sortable: true, showTooltip: true, visible: true, width: 150 },
        { prop: "voorraad", title: "Voorraad", sortable: true, showTooltip: true, width: 150 },
        { prop: "minimaleVoorraad", title: "Min order", sortable: true, showTooltip: true, width: 150 },
        { prop: "maximaleVoorraad", title: "Max voorraad", sortable: true, showTooltip: true, width: 150 },
        { prop: "afmetingen.gewicht", title: "Gewicht", sortable: true, showTooltip: true, visible: true },
        { prop: "afmetingen.lengte", title: "Lengte", sortable: true, showTooltip: true, visible: true },
        { prop: "afmetingen.breedte", title: "Breedte", sortable: true, showTooltip: true, visible: true },
        { prop: "afmetingen.hoogte", title: "Hoogte", sortable: true, showTooltip: true },
        { prop: "leverancier", title: "Leverancier", sortable: true, showTooltip: true, visible: true },
        { prop: "landVanHerkomst", title: "Herkomst", sortable: true, showTooltip: true },
        { prop: "beschikbaarVanaf", title: "Beschikbaar vanaf", sortable: true, showTooltip: true, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "laatstePrijsWijziging", title: "Prijswijziging", sortable: true, showTooltip: true, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "status", title: "Status", sortable: true, showTooltip: true, visible: true },
        { prop: "garantieMaanden", title: "Garantie", sortable: true, showTooltip: true },
        { prop: "populair", title: "Populair", sortable: true, showTooltip: true },
        { prop: "duurzaam", title: "Duurzaam", sortable: true, showTooltip: true },
        { prop: "magazijn", title: "Magazijn", sortable: true, showTooltip: true },
    ]
}

export const filterProductColumns = () => {
    return [
        { prop: "id", title: "Id", sortable: true, showTooltip: true, width: 80, filter: { type: 'number' } },
        { prop: "sku", title: "SKU", sortable: true, showTooltip: true, visible: true, filter: { type: 'text' } },
        { prop: "ean", title: "EAN", sortable: true, showTooltip: true, visible: true, filter: { type: 'text' } },
        { prop: "naam", title: "Product", sortable: true, showTooltip: true, visible: true, width: 200, filter: { type: 'text' } },
        { prop: "omschrijving", title: "Omschrijving", sortable: true, showTooltip: true, visible: true, width: 300, filter: { type: 'text' } },
        {
            prop: "categorie",
            title: "Categorie",
            sortable: true,
            showTooltip: true,
            visible: true,
            filter: {
                type: 'select',
                multiSelect: true,
                options: [
                    { label: "Wonen", value: "Wonen" },
                    { label: "Huishouden", value: "Huishouden" },
                    { label: "Tuin", value: "Tuin" },
                ]
            }
        },
        {
            prop: "subcategorie",
            title: "Subcategorie",
            sortable: true,
            showTooltip: true,
            visible: true,
            filter: {
                type: 'select',
                multiSelect: true,
                options: [
                    { label: "Meubels", value: "Meubels" },
                    { label: "Verlichting", value: "Verlichting" },
                    { label: "Decoratie", value: "Decoratie" },
                    { label: "Keuken", value: "Keuken" },
                    { label: "Schoonmaken", value: "Schoonmaken" },
                    { label: "Wassen", value: "Wassen" },
                    { label: "Tuinmeubelen", value: "Tuinmeubelen" },
                    { label: "Gereedschap", value: "Gereedschap" },
                    { label: "Planten", value: "Planten" },
                    { label: "Bewatering", value: "Bewatering" },
                    { label: "Buiten koken", value: "Buiten koken" },
                ]
            }
        },
        {
            prop: "merk",
            title: "Merk",
            sortable: true,
            showTooltip: true,
            visible: true,
            filter: {
                type: "select",
                options: [
                    { label: "HomeStyle", value: "HomeStyle" },
                    { label: "Nordic Living", value: "Nordic Living" },
                    { label: "Pure Living", value: "Pure Living" },
                    { label: "Woon&Co", value: "Woon&Co" },
                    { label: "Comfort Home", value: "Comfort Home" },
                    { label: "CleanHouse", value: "CleanHouse" },
                    { label: "Daily Home", value: "Daily Home" },
                    { label: "KeukenPlus", value: "KeukenPlus" },
                    { label: "Praktisch Thuis", value: "Praktisch Thuis" },
                    { label: "GardenPro", value: "GardenPro" },
                    { label: "GreenLife", value: "GreenLife" },
                    { label: "SunGarden", value: "SunGarden" },
                    { label: "BuitenBest", value: "BuitenBest" },
                    { label: "Tuinmaat", value: "Tuinmaat" },
                ]
            }
        },
        {
            prop: "kleur",
            title: "Kleur",
            sortable: true,
            showTooltip: true,
            filter: {
                type: "select",
                multiSelect: true,
                options: [
                    { label: "Wit", value: "Wit" },
                    { label: "Zwart", value: "Zwart" },
                    { label: "Grijs", value: "Grijs" },
                    { label: "Antraciet", value: "Antraciet" },
                    { label: "Beige", value: "Beige" },
                    { label: "Taupe", value: "Taupe" },
                    { label: "Bruin", value: "Bruin" },
                    { label: "Groen", value: "Groen" },
                    { label: "Blauw", value: "Blauw" },
                    { label: "Naturel", value: "Naturel" },
                ]
            }
        },
        {
            prop: "materiaal",
            title: "Materiaal",
            sortable: true,
            showTooltip: true,
            filter: {
                type: "select",
                multiSelect: true,
                options: [
                    { label: "Hout", value: "Hout" },
                    { label: "Metaal", value: "Metaal" },
                    { label: "Kunststof", value: "Kunststof" },
                    { label: "Bamboe", value: "Bamboe" },
                    { label: "Glas", value: "Glas" },
                    { label: "Keramiek", value: "Keramiek" },
                    { label: "Rotan", value: "Rotan" },
                    { label: "Aluminium", value: "Aluminium" },
                    { label: "Textiel", value: "Textiel" },
                    { label: "RVS", value: "RVS" },
                ]
            }
        },
        { prop: "prijs", title: "Prijs", sortable: true, showTooltip: true, visible: true, width: 150, summary: true, filter: { type: 'number' }, transformValue: formatCurrency },
        { prop: "kostprijs", title: "kostprijs", sortable: true, showTooltip: true, visible: true, width: 150, summary: true, filter: { type: 'number' }, transformValue: formatCurrency },
        { prop: "btw", title: "BTW", sortable: true, showTooltip: true, visible: true, width: 150, filter: { type: 'number' } },
        { prop: "voorraad", title: "Voorraad", sortable: true, showTooltip: true, width: 150, filter: { type: 'string' } },
        { prop: "minimaleVoorraad", title: "Min order", sortable: true, showTooltip: true, width: 150, filter: { type: 'number' } },
        { prop: "maximaleVoorraad", title: "Max voorraad", sortable: true, showTooltip: true, width: 150, filter: { type: 'number' } },
        { prop: "afmetingen.gewicht", title: "Gewicht", sortable: true, showTooltip: true, visible: true, filter: { type: 'number' } },
        { prop: "afmetingen.lengte", title: "Lengte", sortable: true, showTooltip: true, visible: true, filter: { type: 'number' } },
        { prop: "afmetingen.breedte", title: "Breedte", sortable: true, showTooltip: true, visible: true, filter: { type: 'number' } },
        { prop: "afmetingen.hoogte", title: "Hoogte", sortable: true, showTooltip: true, visible: true, filter: { type: 'number' } },
        {
            prop: "leverancier",
            title: "Leverancier",
            sortable: true,
            showTooltip: true,
            visible: true,
            filter: {
                type: "select",
                multiSelect: true,
                options: [
                    { label: "Van Dijk Groothandel", value: "Van Dijk Groothandel" },
                    { label: "Jansen Home Supply", value: "Jansen Home Supply" },
                    { label: "Buitenleven Distributie", value: "Buitenleven Distributie" },
                    { label: "Holland Living BV", value: "Holland Living BV" },
                ]
            }
        },
        {
            prop: "landVanHerkomst",
            title: "Herkomst",
            sortable: true,
            showTooltip: true,
            filter: {
                type: "select",
                multiSelect: true,
                options: [
                    { label: "Nederland", value: "Nederland" },
                    { label: "België", value: "België" },
                    { label: "Duitsland", value: "Duitsland" },
                    { label: "Denemarken", value: "Denemarken" },
                    { label: "Zweden", value: "Zweden" },
                    { label: "Polen", value: "Polen" },
                    { label: "Italië", value: "Italië" },
                ]
            }
        },
        { prop: "beschikbaarVanaf", title: "Beschikbaar vanaf", sortable: true, showTooltip: true, filter: { type: 'date' }, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "" },
        { prop: "laatstePrijsWijziging", title: "Prijswijziging", sortable: true, showTooltip: true, filter: { type: 'date' }, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "" },
        {
            prop: "status",
            title: "Status",
            sortable: true,
            showTooltip: true,
            visible: true,
            filter: {
                type: "select",
                options: [
                    { label: "Actief", value: "Actief" },
                    { label: "Nieuw", value: "Nieuw" },
                    { label: "Uitlopend", value: "Uitlopend" },
                    { label: "Tijdelijk niet leverbaar", value: "Tijdelijk niet leverbaar" },
                ]
            }
        },
        { prop: "garantieMaanden", title: "Garantie", sortable: true, showTooltip: true, filter: { type: 'number' } },
        { prop: "populair", title: "Populair", sortable: true, showTooltip: true, filter: { type: 'number' } },
        { prop: "duurzaam", title: "Duurzaam", sortable: true, showTooltip: true, filter: { type: 'string' } },
        {
            prop: "magazijn",
            title: "Magazijn",
            sortable: true,
            showTooltip: true,
            filter: {
                type: "select",
                options: [
                    { label: "Eindhoven", value: "Eindhoven" },
                    { label: "Tilburg", value: "Tilburg" },
                    { label: "Utrecht", value: "Utrecht" },
                    { label: "Zwolle", value: "Zwolle" },
                    { label: "Venlo", value: "Venlo" },
                ]
            }
        }
    ]
}


export const defaultOrderColumns = () => {
    return [
        { prop: "id", title: "Id", sortable: true, width: 80, showTooltip: true, visible: false },
        { prop: "productId", title: "Product id", sortable: true, visible: false, showTooltip: true },
        { prop: "orderNummer", title: "Order nummer", sortable: true, visible: true, showTooltip: true },
        { prop: "klantNaam", title: "klant naam", sortable: true, visible: true, showTooltip: true, width: 200 },
        { prop: "klantNummer", title: "klant nummer", visible: false, width: 300, showTooltip: true },
        { prop: "status", title: "Status", sortable: true, visible: true, showTooltip: true },
        { prop: "orderDatum", title: "Order datum", sortable: true, visible: true, showTooltip: true, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "leverDatum", title: "Leverdatum", sortable: true, visible: false, showTooltip: true, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "verzendDatum", title: "VerzendDatum", sortable: true, visible: false, showTooltip: true, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "aantal", title: "Aantal", sortable: true, visible: true, showTooltip: true },
        { prop: "prijsPerStuk", title: "Prijs per stuk", sortable: true, showTooltip: true, visible: true, width: 150, transformValue: formatCurrency },
        { prop: "korting", title: "Korting", sortable: true, visible: false, showTooltip: true },
         { prop: "totaalBedrag", title: "Totaal bedrag", sortable: true, visible: true, showTooltip: true, width: 150, summary: true, transformValue: formatCurrency },
        { prop: "btwBedrag", title: "BTW bedrag", sortable: true, visible: false, showTooltip: true, width: 150, transformValue: formatCurrency },
        { prop: "betaalgegevens.betaalStatus", title: "Bestel status", sortable: true, visible: false, showTooltip: true },
        { prop: "betaalgegevens.betaalMethode", title: "Betaal methode", sortable: true, visible: false, showTooltip: true },
        { prop: "verzendKosten", title: "Verzendkosten", sortable: true, visible: false, showTooltip: true },
        { prop: "vervoerder", title: "Vervoerder", sortable: true, visible: false, showTooltip: true },
        { prop: "trackTrace", title: "TrackTrace", sortable: true, visible: false, showTooltip: true },
        { prop: "afleverAdres", title: "AfleverAdres", sortable: true, visible: true, showTooltip: true },
        { prop: "postcode", title: "Postcode", sortable: true, visible: true, showTooltip: true },
        { prop: "plaats", title: "plaats", sortable: true, visible: true, showTooltip: true },
        { prop: "provincie", title: "provincie", sortable: true, visible: true, showTooltip: true },
        { prop: "land", title: "land", sortable: true, visible: true, showTooltip: true },
        { prop: "kanaal", title: "kanaal", sortable: true, visible: false, showTooltip: true },
        { prop: "opmerking", title: "opmerking", sortable: true, visible: false, showTooltip: true },
    ]
}

export const filterOrderColumns = () => {
    return [
 { prop: "id", title: "Id", sortable: true, width: 80, showTooltip: true, visible: false, filter: { type: 'text' } },
        { prop: "productId", title: "Product id", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },
        { prop: "orderNummer", title: "Order nummer", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "klantNaam", title: "klant naam", sortable: true, visible: true, showTooltip: true, width: 200, filter: { type: 'text' } },
        { prop: "klantNummer", title: "klant nummer", visible: false, width: 300, showTooltip: true },
        { prop: "status", title: "Status", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "orderDatum", title: "Order datum", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' }, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "leverDatum", title: "Leverdatum", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' }, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "verzendDatum", title: "VerzendDatum", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' }, transformValue: (value: unknown) => value ? moment(value).locale("nl").format("DD-MM-YYYY") : "", },
        { prop: "aantal", title: "Aantal", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "prijsPerStuk", title: "Prijs per stuk", sortable: true, showTooltip: true, visible: true, width: 150, filter: { type: 'text' }, transformValue: formatCurrency },
        { prop: "korting", title: "Korting", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },
         { prop: "totaalBedrag", title: "Totaal bedrag", sortable: true, visible: true, showTooltip: true, width: 150, filter: { type: 'number' }, summery: true, transformValue: formatCurrency },
        { prop: "btwBedrag", title: "BTW bedrag", sortable: true, visible: false, showTooltip: true, width: 150, filter: { type: 'text' }, transformValue: formatCurrency },
        { prop: "betaalgegevens.betaalStatus", title: "Bestel status", sortable: true, visible: false, showTooltip: true , filter: { type: 'text' }},
        { prop: "betaalgegevens.betaalMethode", title: "Betaal methode", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },
        { prop: "verzendKosten", title: "Verzendkosten", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },
        { prop: "vervoerder", title: "Vervoerder", sortable: true, visible: false, showTooltip: true , filter: { type: 'text' }},
        { prop: "trackTrace", title: "TrackTrace", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },
        { prop: "afleverAdres", title: "AfleverAdres", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "postcode", title: "Postcode", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "plaats", title: "plaats", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "provincie", title: "provincie", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "land", title: "land", sortable: true, visible: true, showTooltip: true, filter: { type: 'text' } },
        { prop: "kanaal", title: "kanaal", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },
        { prop: "opmerking", title: "opmerking", sortable: true, visible: false, showTooltip: true, filter: { type: 'text' } },        
    ]
}

