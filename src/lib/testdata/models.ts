import { NotFoundError } from "../errors";

export type ProductCategorie = "Wonen" | "Huishouden" | "Tuin";
export type ProductSubcategorie = "Meubels"  | "Verlichting"  | "Decoratie"  | "Keuken"  | "Schoonmaken"  | "Wassen"  | "Tuinmeubelen"  | "Gereedschap"  | "Planten"  | "Bewatering"  | "Buiten koken";
export type ProductMerk = "HomeStyle"  | "Nordic Living"  | "Pure Living"  | "Woon&Co"  | "Comfort Home"  | "CleanHouse"  | "Daily Home"  | "KeukenPlus"  | "Praktisch Thuis"  | "GardenPro"  | "GreenLife"  | "SunGarden"  | "BuitenBest"  | "Tuinmaat";
export type ProductKleur = "Wit"  | "Zwart"  | "Grijs"  | "Antraciet"  | "Beige"  | "Taupe"  | "Bruin"  | "Groen"  | "Blauw"  | "Naturel";
export type ProductMateriaal =  | "Hout"  | "Metaal"  | "Kunststof"  | "Bamboe"  | "Glas"  | "Keramiek"  | "Rotan"  | "Aluminium"  | "Textiel"  | "RVS";
export type ProductLeverancier =  | "Van Dijk Groothandel"  | "Jansen Home Supply"  | "Buitenleven Distributie"  | "Holland Living BV";
export type Land =  | "Nederland"  | "België"  | "Duitsland"  | "Denemarken"  | "Zweden"  | "Polen"  | "Italië";
export type ProductStatus =  | "Actief"  | "Nieuw"  | "Uitlopend"  | "Tijdelijk niet leverbaar";
export type Magazijn = "Eindhoven" | "Tilburg" | "Utrecht" | "Zwolle" | "Venlo";
export type OrderStatus =  | "Nieuw"  | "In behandeling"  | "Verzonden"  | "Afgeleverd"  | "Retour aangemeld"  | "Geannuleerd";
export type BetaalStatus = "Betaald" | "Open" | "Terugbetaald";
export type BetaalMethode =  | "iDEAL"  | "Creditcard"  | "PayPal"  | "Apple Pay"  | "Google Pay";
export type Vervoerder = "PostNL" | "DHL" | "DPD" | "GLS" | "Trunkrs";

export interface AfmetingenModel {
  gewicht: number;
  lengte: number;
  breedte: number;
  hoogte: number;
}

export interface BetaalgegevensModel {
  betaalStatus: BetaalStatus;
  betaalMethode: BetaalMethode;
}

export interface ProductGetModel {
  id: number;
  sku: string;
  ean: string;
  naam: string;
  omschrijving: string;
  categorie: ProductCategorie;
  subcategorie: ProductSubcategorie;
  merk: ProductMerk;
  kleur: ProductKleur;
  materiaal: ProductMateriaal;
  prijs: number;
  kostprijs: number;
  btw: number;
  voorraad: number;
  minimaleVoorraad: number;
  maximaleVoorraad: number;
  afmetingen: AfmetingenModel;
  leverancier: ProductLeverancier;
  landVanHerkomst: Land;
  beschikbaarVanaf: Date;
  laatstePrijsWijziging: Date;
  status: ProductStatus;
  garantieMaanden: number;
  beoordeling: number;
  populair: boolean;
  duurzaam: boolean;
  magazijn: Magazijn;
}

export interface OrderGetModel {
  id: number;
  productId: number;
  orderNummer: string;
  klantNaam: string;
  klantNummer: string;
  orderDatum: Date;
  leverDatum: Date;
  verzendDatum: Date;
  status: OrderStatus;
  betaalgegevens: BetaalgegevensModel;
  aantal: number;
  prijsPerStuk: number;
  korting: number;
  totaalBedrag: number;
  btwBedrag: number;
  verzendKosten: number;
  vervoerder: Vervoerder;
  trackTrace: string;
  afleverAdres: string;
  postcode: string;
  plaats: string;
  provincie: string;
  land: Land;
  kanaal: string;
  opmerking: string;
}

export interface ProductMetOrdersModel extends ProductGetModel {
  orders: OrderGetModel[];
}

interface ProductConfiguratie {
  categorie: ProductCategorie;
  subcategorie: ProductSubcategorie;
  namen: string[];
  merken: ProductMerk[];
  materialen: ProductMateriaal[];
  minimalePrijs: number;
  maximalePrijs: number;
}

interface PlaatsConfiguratie {
  plaats: string;
  provincie: string;
  postcodeStart: number;
}

const productConfiguraties: ProductConfiguratie[] = [
  {
    categorie: "Wonen",
    subcategorie: "Meubels",
    namen: [
      "Eettafel",
      "Salontafel",
      "Dressoir",
      "Boekenkast",
      "Bijzettafel",
      "Nachtkastje",
      "Tv-meubel",
    ],
    merken: [
      "HomeStyle",
      "Nordic Living",
      "Pure Living",
      "Woon&Co",
      "Comfort Home",
    ],
    materialen: ["Hout", "Metaal", "Glas", "Bamboe", "Rotan"],
    minimalePrijs: 49.95,
    maximalePrijs: 899.95,
  },
  {
    categorie: "Wonen",
    subcategorie: "Verlichting",
    namen: [
      "Hanglamp",
      "Tafellamp",
      "Vloerlamp",
      "Wandlamp",
      "Bureaulamp",
      "Plafondlamp",
    ],
    merken: ["HomeStyle", "Nordic Living", "Pure Living", "Woon&Co"],
    materialen: ["Metaal", "Glas", "Hout", "Textiel", "Bamboe"],
    minimalePrijs: 19.95,
    maximalePrijs: 249.95,
  },
  {
    categorie: "Wonen",
    subcategorie: "Decoratie",
    namen: [
      "Wandspiegel",
      "Vaas",
      "Fotolijst",
      "Wandklok",
      "Kandelaar",
      "Sierkussen",
      "Plaid",
    ],
    merken: [
      "HomeStyle",
      "Nordic Living",
      "Pure Living",
      "Woon&Co",
      "Comfort Home",
    ],
    materialen: ["Glas", "Keramiek", "Hout", "Metaal", "Textiel"],
    minimalePrijs: 9.95,
    maximalePrijs: 179.95,
  },
  {
    categorie: "Huishouden",
    subcategorie: "Keuken",
    namen: [
      "Pannenset",
      "Snijplank",
      "Bestekset",
      "Serviesset",
      "Keukenrek",
      "Voorraadpot",
      "Waterkoker",
    ],
    merken: ["KeukenPlus", "Daily Home", "Praktisch Thuis", "CleanHouse"],
    materialen: ["RVS", "Kunststof", "Bamboe", "Glas", "Keramiek"],
    minimalePrijs: 7.95,
    maximalePrijs: 299.95,
  },
  {
    categorie: "Huishouden",
    subcategorie: "Schoonmaken",
    namen: [
      "Dweilsysteem",
      "Emmerset",
      "Schoonmaakwagen",
      "Raamwisser",
      "Afvalbak",
      "Stoffer en blik",
    ],
    merken: ["CleanHouse", "Daily Home", "Praktisch Thuis"],
    materialen: ["Kunststof", "Metaal", "RVS", "Textiel"],
    minimalePrijs: 4.95,
    maximalePrijs: 149.95,
  },
  {
    categorie: "Huishouden",
    subcategorie: "Wassen",
    namen: [
      "Wasmand",
      "Droogrek",
      "Strijkplank",
      "Wassorteerder",
      "Wasknijperset",
      "Waszak",
    ],
    merken: ["CleanHouse", "Daily Home", "Comfort Home", "Praktisch Thuis"],
    materialen: ["Kunststof", "Metaal", "Bamboe", "Textiel", "Aluminium"],
    minimalePrijs: 5.95,
    maximalePrijs: 159.95,
  },
  {
    categorie: "Tuin",
    subcategorie: "Tuinmeubelen",
    namen: [
      "Tuinstoel",
      "Tuintafel",
      "Loungeset",
      "Tuinbank",
      "Ligbed",
      "Balkonset",
    ],
    merken: ["GardenPro", "SunGarden", "BuitenBest", "Tuinmaat", "GreenLife"],
    materialen: ["Hout", "Aluminium", "Kunststof", "Rotan", "Metaal"],
    minimalePrijs: 29.95,
    maximalePrijs: 1499.95,
  },
  {
    categorie: "Tuin",
    subcategorie: "Gereedschap",
    namen: [
      "Snoeischaar",
      "Heggenschaar",
      "Spade",
      "Hark",
      "Bladblazer",
      "Grasmaaier",
      "Kruiwagen",
    ],
    merken: ["GardenPro", "Tuinmaat", "BuitenBest", "GreenLife"],
    materialen: ["Metaal", "Kunststof", "Hout", "Aluminium", "RVS"],
    minimalePrijs: 9.95,
    maximalePrijs: 699.95,
  },
  {
    categorie: "Tuin",
    subcategorie: "Planten",
    namen: [
      "Olijfboom",
      "Lavendel",
      "Hortensia",
      "Palmboom",
      "Buxus",
      "Rozenstruik",
      "Bamboeplant",
    ],
    merken: ["GreenLife", "SunGarden", "Tuinmaat"],
    materialen: ["Kunststof", "Keramiek", "Hout", "Bamboe"],
    minimalePrijs: 6.95,
    maximalePrijs: 249.95,
  },
  {
    categorie: "Tuin",
    subcategorie: "Bewatering",
    namen: [
      "Tuinslang",
      "Sproeier",
      "Gieter",
      "Slangwagen",
      "Druppelsysteem",
      "Beregeningscomputer",
    ],
    merken: ["GardenPro", "GreenLife", "Tuinmaat", "BuitenBest"],
    materialen: ["Kunststof", "Metaal", "Aluminium", "RVS"],
    minimalePrijs: 7.95,
    maximalePrijs: 299.95,
  },
  {
    categorie: "Tuin",
    subcategorie: "Buiten koken",
    namen: [
      "Gasbarbecue",
      "Houtskoolbarbecue",
      "Buitenkeuken",
      "Pizzasteen",
      "Barbecueset",
      "Vuurkorf",
    ],
    merken: ["GardenPro", "SunGarden", "BuitenBest", "Tuinmaat"],
    materialen: ["RVS", "Metaal", "Aluminium", "Keramiek"],
    minimalePrijs: 19.95,
    maximalePrijs: 1299.95,
  },
];

const kleuren: ProductKleur[] = [
  "Wit",
  "Zwart",
  "Grijs",
  "Antraciet",
  "Beige",
  "Taupe",
  "Bruin",
  "Groen",
  "Blauw",
  "Naturel",
];

const leveranciers: ProductLeverancier[] = [
  "Van Dijk Groothandel",
  "Jansen Home Supply",
  "Buitenleven Distributie",
  "Holland Living BV",
];

const landen: Land[] = [
  "Nederland",
  "België",
  "Duitsland",
  "Denemarken",
  "Zweden",
  "Polen",
  "Italië",
];

const productStatussen: ProductStatus[] = [
  "Actief",
  "Actief",
  "Actief",
  "Nieuw",
  "Uitlopend",
  "Tijdelijk niet leverbaar",
];

const magazijnen: Magazijn[] = [
  "Eindhoven",
  "Tilburg",
  "Utrecht",
  "Zwolle",
  "Venlo",
];

const productOmschrijvingen: string[] = [
  "Praktisch product voor dagelijks gebruik.",
  "Duurzaam uitgevoerd en eenvoudig te onderhouden.",
  "Modern ontwerp met een tijdloze uitstraling.",
  "Geschikt voor zowel kleine als grote ruimtes.",
  "Comfortabel en gebruiksvriendelijk product.",
  "Stevig uitgevoerd met hoogwaardige materialen.",
  "Een veelzijdige keuze voor huis en tuin.",
  "Onderhoudsvriendelijk en direct klaar voor gebruik.",
];

const voornamen: string[] = [
  "Jan",
  "Piet",
  "Henk",
  "Peter",
  "Tom",
  "Mark",
  "Jeroen",
  "Ahmed",
  "Maria",
  "Anja",
  "Sanne",
  "Lisa",
  "Monique",
  "Linda",
  "Fatima",
  "Sandra",
  "Marieke",
  "Anouk",
];

const tussenvoegsels: string[] = [
  "",
  "",
  "",
  "de",
  "van",
  "van de",
  "van den",
  "van der",
];

const achternamen: string[] = [
  "Jansen",
  "Peters",
  "Bakker",
  "Smit",
  "Kuipers",
  "Visser",
  "Bos",
  "Vries",
  "Willems",
  "Meijer",
  "Hendriks",
  "Verhoeven",
  "Jacobs",
  "Loon",
  "Vos",
  "Smeets",
  "Mulder",
  "Dekker",
];

const straten: string[] = [
  "Kerkstraat",
  "Stationsstraat",
  "Dorpsstraat",
  "Molenweg",
  "Schoolstraat",
  "Beukenlaan",
  "Lindestraat",
  "Pastoorstraat",
  "Marktstraat",
  "Wilhelminastraat",
  "Julianastraat",
  "Oranjestraat",
  "Hoofdstraat",
  "Nieuwendijk",
  "Akkerweg",
];

const plaatsen: PlaatsConfiguratie[] = [
  {
    plaats: "Eindhoven",
    provincie: "Noord-Brabant",
    postcodeStart: 5611,
  },
  {
    plaats: "Helmond",
    provincie: "Noord-Brabant",
    postcodeStart: 5701,
  },
  {
    plaats: "Someren",
    provincie: "Noord-Brabant",
    postcodeStart: 5711,
  },
  {
    plaats: "Asten",
    provincie: "Noord-Brabant",
    postcodeStart: 5721,
  },
  {
    plaats: "Deurne",
    provincie: "Noord-Brabant",
    postcodeStart: 5751,
  },
  {
    plaats: "Tilburg",
    provincie: "Noord-Brabant",
    postcodeStart: 5038,
  },
  {
    plaats: "Utrecht",
    provincie: "Utrecht",
    postcodeStart: 3511,
  },
  {
    plaats: "Zwolle",
    provincie: "Overijssel",
    postcodeStart: 8011,
  },
  {
    plaats: "Venlo",
    provincie: "Limburg",
    postcodeStart: 5911,
  },
  {
    plaats: "Weert",
    provincie: "Limburg",
    postcodeStart: 6001,
  },
];

const postcodeLetters: string[] = [
  "AA",
  "AB",
  "AC",
  "BC",
  "CD",
  "DE",
  "EF",
  "GH",
  "JK",
  "KL",
  "MN",
  "PR",
];

const orderStatussen: OrderStatus[] = [
  "Nieuw",
  "In behandeling",
  "In behandeling",
  "Verzonden",
  "Verzonden",
  "Afgeleverd",
  "Afgeleverd",
  "Afgeleverd",
  "Retour aangemeld",
  "Geannuleerd",
];

const betaalMethoden: BetaalMethode[] = [
  "iDEAL",
  "iDEAL",
  "iDEAL",
  "Creditcard",
  "PayPal",
  "Apple Pay",
  "Google Pay",
];

const vervoerders: Vervoerder[] = [
  "PostNL",
  "PostNL",
  "DHL",
  "DHL",
  "DPD",
  "GLS",
  "Trunkrs",
];

const verkoopKanalen: string[] = [
  "Webshop",
  "Bol.com",
  "Amazon",
  "Winkel Eindhoven",
  "Winkel Tilburg",
  "Telefonische bestelling",
];

const orderOpmerkingen: string[] = [
  "",
  "",
  "",
  "Graag afleveren bij de buren indien niet thuis.",
  "Niet bij de buren afleveren.",
  "Voor de deur neerzetten na telefonisch overleg.",
  "Klant wenst levering in de ochtend.",
  "Cadeauverpakking gewenst.",
  "Contact opnemen vóór bezorging.",
  "Product zorgvuldig verpakken.",
];

const randomItem = <T>(items: readonly T[]): T => {
  if (items.length === 0) {
    throw new Error("randomItem kan niet worden gebruikt met een lege array.");
  }

  return items[Math.floor(Math.random() * items.length)];
};

const randomNumber = (min: number, max: number, decimals = 0): number => {
  if (min > max) {
    throw new Error(
      "De minimale waarde mag niet groter zijn dan de maximale waarde."
    );
  }

  const value = Math.random() * (max - min) + min;

  return Number(value.toFixed(decimals));
};

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomBoolean = (percentageTrue = 50): boolean => {
  return Math.random() * 100 < percentageTrue;
};

const randomDate = (start: Date, end: Date): Date => {
  if (start.getTime() > end.getTime()) {
    throw new Error("De startdatum mag niet na de einddatum liggen.");
  }

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};

const pad = (value: number, length = 5): string => {
  return value.toString().padStart(length, "0");
};

const createPostcode = (
    postcodeStart: number,
    id: number
): string => {
    const nummer = postcodeStart + Math.floor(id / postcodeLetters.length);
    const letters = postcodeLetters[id % postcodeLetters.length];

    return `${nummer} ${letters}`;
};

const createEan = (id: number): string => {
  const basis = `871${pad(id, 9)}`;

  return basis.slice(0, 13);
};

const createTrackTrace = (vervoerder: Vervoerder, orderId: number): string => {
  const prefixMap: Record<Vervoerder, string> = {
    PostNL: "3SNL",
    DHL: "JVGL",
    DPD: "DPD",
    GLS: "GLS",
    Trunkrs: "TRK",
  };

  return `${prefixMap[vervoerder]}${pad(orderId, 10)}`;
};

const createKlantNaam = (): string => {
  return [
    randomItem(voornamen),
    randomItem(tussenvoegsels),
    randomItem(achternamen),
  ]
    .filter(Boolean)
    .join(" ");
};

const calculateBtwBedrag = (
  bedragInclusiefBtw: number,
  btwPercentage: number
): number => {
  return Number(
    (
      bedragInclusiefBtw -
      bedragInclusiefBtw / (1 + btwPercentage / 100)
    ).toFixed(2)
  );
};

export const generateProducts = (
  amount: number
): ProductGetModel[] => {
  if (amount < 0) {
    throw new Error(
      "Het aantal producten mag niet negatief zijn."
    );
  }

  const vandaag = new Date();

  return Array.from({ length: amount }, (_, index) => {
    const id = index + 1;
    const configuratie = randomItem(productConfiguraties);
    const productNaam = randomItem(configuratie.namen);

    const prijs = randomNumber(
      configuratie.minimalePrijs,
      configuratie.maximalePrijs,
      2
    );

    const kostprijs = randomNumber(
      prijs * 0.4,
      prijs * 0.75,
      2
    );

    const minimaleVoorraad = randomInteger(5, 30);

    const maximaleVoorraad = randomInteger(
      minimaleVoorraad + 20,
      minimaleVoorraad + 250
    );

    const voorraad = randomInteger(
      0,
      maximaleVoorraad
    );

    const beschikbaarVanaf = randomDate(
      new Date("2022-01-01"),
      vandaag
    );

    const laatstePrijsWijziging = randomDate(
      beschikbaarVanaf,
      vandaag
    );

    return {
      id,
      sku: `SKU-${pad(id, 6)}`,
      ean: createEan(id),

      naam: `${productNaam} ${randomItem([
        "Basic",
        "Comfort",
        "Premium",
        "Deluxe",
        "Modern",
        "Classic"
      ])}`,

      omschrijving: randomItem(productOmschrijvingen),

      categorie: configuratie.categorie,
      subcategorie: configuratie.subcategorie,
      merk: randomItem(configuratie.merken),
      kleur: randomItem(kleuren),
      materiaal: randomItem(configuratie.materialen),

      prijs,
      kostprijs,
      btw: 21,

      voorraad,
      minimaleVoorraad,
      maximaleVoorraad,

      afmetingen: {
        gewicht: randomNumber(0.1, 85, 2),
        lengte: randomNumber(5, 250, 1),
        breedte: randomNumber(5, 180, 1),
        hoogte: randomNumber(2, 220, 1)
      },

      leverancier: randomItem(leveranciers),
      landVanHerkomst: randomItem(landen),

      beschikbaarVanaf,
      laatstePrijsWijziging,

      status: randomItem(productStatussen),
      garantieMaanden: randomItem([
        0,
        6,
        12,
        24,
        36,
        60
      ]),

      beoordeling: randomNumber(1, 5, 1),
      populair: randomBoolean(25),
      duurzaam: randomBoolean(40),
      magazijn: randomItem(magazijnen)
    };
  });
};

const createBetaalgegevens = (status: OrderStatus): BetaalgegevensModel => {
  let betaalStatus: BetaalStatus;

  switch (status) {
    case "Nieuw":
    case "In behandeling":
      betaalStatus = randomItem(["Betaald", "Open"]);
      break;

    case "Geannuleerd":
    case "Retour aangemeld":
      betaalStatus = randomItem(["Betaald", "Terugbetaald"]);
      break;

    default:
      betaalStatus = "Betaald";
      break;
  }

  return {
    betaalStatus,
    betaalMethode: randomItem(betaalMethoden),
  };
};

const createOrderDatums = (
  status: OrderStatus
): {
  orderDatum: Date;
  verzendDatum: Date;
  leverDatum: Date;
} => {
  const orderDatum = randomDate(new Date("2024-01-01"), new Date("2026-08-06"));

  const verzendDatum = addDays(orderDatum, randomInteger(1, 5));

  const leverDatum = addDays(verzendDatum, randomInteger(1, 4));

  if (
    status === "Nieuw" ||
    status === "In behandeling" ||
    status === "Geannuleerd"
  ) {
    return {
      orderDatum,
      verzendDatum: new Date(0),
      leverDatum: new Date(0),
    };
  }

  if (status === "Verzonden") {
    return {
      orderDatum,
      verzendDatum,
      leverDatum: new Date(0),
    };
  }

  return {
    orderDatum,
    verzendDatum,
    leverDatum,
  };
};

export const generateOrders = (
  products: ProductGetModel[],
  amount: number
): OrderGetModel[] => {
  if (amount < 0) {
    throw new Error("Het aantal orders mag niet negatief zijn.");
  }

  if (products.length === 0 && amount > 0) {
    throw new Error(
      "Er kunnen geen orders worden gegenereerd zonder producten."
    );
  }

  return Array.from({ length: amount }, (_, index) => {
    const id = index + 1;
    const product = randomItem(products);
    const plaatsConfiguratie = randomItem(plaatsen);
    const status = randomItem(orderStatussen);
    const vervoerder = randomItem(vervoerders);

    const aantal = randomInteger(1, 15);

    const prijsPerStuk = randomNumber(
      product.prijs * 0.95,
      product.prijs * 1.05,
      2
    );

    const korting = randomItem([0, 0, 0, 5, 10, 15, 20]);

    const bedragVoorKorting = aantal * prijsPerStuk;

    const bedragNaKorting = bedragVoorKorting * (1 - korting / 100);

    const verzendKosten =
      bedragNaKorting >= 50 ? 0 : randomItem([4.95, 5.95, 6.95]);

    const totaalBedrag =
      status === "Geannuleerd"
        ? 0
        : Number((bedragNaKorting + verzendKosten).toFixed(2));

    const btwBedrag =
      status === "Geannuleerd"
        ? 0
        : calculateBtwBedrag(totaalBedrag, product.btw);

    const datums = createOrderDatums(status);

    const heeftTrackTrace =
      status === "Verzonden" ||
      status === "Afgeleverd" ||
      status === "Retour aangemeld";

    return {
      id,
      productId: product.id,
      orderNummer: `ORD-${pad(id, 7)}`,
      klantNaam: createKlantNaam(),
      klantNummer: `KLT-${pad(randomInteger(1, Math.max(amount, 1000)), 6)}`,
      orderDatum: datums.orderDatum,
      leverDatum: datums.leverDatum,
      verzendDatum: datums.verzendDatum,
      status,
      betaalgegevens: createBetaalgegevens(status),
      aantal,
      prijsPerStuk,
      korting,
      totaalBedrag,
      btwBedrag,
      verzendKosten,
      vervoerder,
      trackTrace: heeftTrackTrace ? createTrackTrace(vervoerder, id) : "",
      afleverAdres: `${randomItem(straten)} ${randomInteger(
        1,
        250
      )}${randomItem(["", "", "", "A", "B"])}`,

      postcode: createPostcode(plaatsConfiguratie.postcodeStart,    id),

      plaats: plaatsConfiguratie.plaats,
      provincie: plaatsConfiguratie.provincie,
      land: "Nederland",

      kanaal: randomItem(verkoopKanalen),
      opmerking: randomItem(orderOpmerkingen),
    };
  });
};

export const generateOrdersPerProduct = (
  products: ProductGetModel[],
  minimaalPerProduct = 1,
  maximaalPerProduct = 10
): OrderGetModel[] => {
  if (minimaalPerProduct < 0 || maximaalPerProduct < 0) {
    throw new Error("Het aantal orders per product mag niet negatief zijn.");
  }

  if (minimaalPerProduct > maximaalPerProduct) {
    throw new Error(
      "Het minimale aantal orders mag niet groter zijn dan het maximale aantal."
    );
  }

  const orders: OrderGetModel[] = [];
  let orderId = 1;

  products.forEach((product) => {
    const aantalOrders = randomInteger(minimaalPerProduct, maximaalPerProduct);

    const gegenereerdeOrders = generateOrders([product], aantalOrders).map(
      (order) => {
        const id = orderId++;

        return {
          ...order,
          id,
          orderNummer: `ORD-${pad(id, 7)}`,
          trackTrace: order.trackTrace
            ? createTrackTrace(order.vervoerder, id)
            : "",
        };
      }
    );

    orders.push(...gegenereerdeOrders);
  });

  return orders;
};

export const combineerProductenMetOrders = (
  products: ProductGetModel[],
  orders: OrderGetModel[]
): ProductMetOrdersModel[] => {
  const ordersPerProduct = new Map<number, OrderGetModel[]>();

  orders.forEach((order) => {
    const huidigeOrders = ordersPerProduct.get(order.productId) ?? [];

    huidigeOrders.push(order);

    ordersPerProduct.set(order.productId, huidigeOrders);
  });

  return products.map((product) => ({
    ...product,
    orders: ordersPerProduct.get(product.id) ?? [],
  }));
};

export const AANTAL_PRODUCTEN = 100;
export const AANTAL_ORDERS = 300;

export const productsMock: ProductGetModel[] =  generateProducts(AANTAL_PRODUCTEN);
export const ordersMock: OrderGetModel[] = generateOrders(  productsMock,  AANTAL_ORDERS);
export const productsMetOrdersMock: ProductMetOrdersModel[] =  combineerProductenMetOrders(productsMock, ordersMock);


export const getProductsForTest1Query = () => {

  const mockData =  generateProducts(85000);

  return {
    queryKey: ["ProductsForTest1"],
    queryFn: async () => {
      const resp = {
        mockData,
        status: 200,
        statusText: 'Ok'
      };

      if (resp.status === 404) {
        throw new NotFoundError();
      }

      if (resp.status >= 400) {
        throw new Response("", {
          status: resp.status,
          statusText: resp.statusText,
        });
      }

       return resp.mockData.map(prod => ({
        ...prod,
        beschikbaarVanaf: new Date(prod.beschikbaarVanaf),
        laatstePrijsWijziging: new Date(prod.laatstePrijsWijziging),
      })) as ProductGetModel[];
    }
  };
};
export const getProductsForTest2Query = () => {

  const mockData =  generateProducts(3300);

  return {
    queryKey: ["ProductsForTest2"],
    queryFn: async () => {
      const resp = {
        mockData,
        status: 200,
        statusText: 'Ok'
      };

      if (resp.status === 404) {
        throw new NotFoundError();
      }

      if (resp.status >= 400) {
        throw new Response("", {
          status: resp.status,
          statusText: resp.statusText,
        });
      }

       return resp.mockData.map(prod => ({
        ...prod,
        beschikbaarVanaf: new Date(prod.beschikbaarVanaf),
        laatstePrijsWijziging: new Date(prod.laatstePrijsWijziging),
      })) as ProductGetModel[];
    }
  };
};


export const getProductsQuery = (aantalRecords?: number) => {

  const mockData =  generateProducts(aantalRecords ?? AANTAL_PRODUCTEN);

  return {
    queryKey: ["Products"],
    queryFn: async () => {
      const resp = {
        mockData,
        status: 200,
        statusText: 'Ok'
      };

      if (resp.status === 404) {
        throw new NotFoundError();
      }

      if (resp.status >= 400) {
        throw new Response("", {
          status: resp.status,
          statusText: resp.statusText,
        });
      }

       return resp.mockData.map(prod => ({
        ...prod,
        beschikbaarVanaf: new Date(prod.beschikbaarVanaf),
        laatstePrijsWijziging: new Date(prod.laatstePrijsWijziging),
      })) as ProductGetModel[];
    }
  };
};

export const getOrdersQuery = () => {
  return {
    queryKey: ["Orders"],
    queryFn: async () => {
      const resp = {
        orders: ordersMock,
        status: 200,
        statusText: 'Ok'
      };

      if (resp.status === 404) {
        throw new NotFoundError();
      }

      if (resp.status >= 400) {
        throw new Response("", {
          status: resp.status,
          statusText: resp.statusText,
        });
      }

      return resp.orders.map(order => ({
        ...order,
        orderDatum: new Date(order.orderDatum),
        leverDatum: new Date(order.leverDatum),
        verzendDatum: new Date(order.verzendDatum),
      })) as OrderGetModel[];
    }
  };
};

export const getOrdersForProduct = (productId: string) => {
  return {
    queryKey: ["Orders", productId],
    queryFn: async () => {
      const resp = {
        orders: ordersMock,
        status: 200,
        statusText: 'Ok'
      };

      if (resp.status === 404) {
        throw new NotFoundError();
      }

      if (resp.status >= 400) {
        throw new Response("", {
          status: resp.status,
          statusText: resp.statusText,
        });
      }

      // Filter orders voor het specifieke product
      const productOrders = resp.orders
        .filter(order => order.productId.toString() === productId)
        .map(order => ({
          ...order,
           orderDatum: new Date(order.orderDatum),
        leverDatum: new Date(order.leverDatum),
        verzendDatum: new Date(order.verzendDatum),
        })) as OrderGetModel[];

      return productOrders;
    }
  };
};

export interface ProductServerQueryArgs {
  page: number;
  pageSize: number;
  sortBy?: keyof ProductGetModel;
  sortDirection?: "asc" | "desc";
  filters?: {
    naam?: string;
    categorie?: ProductGetModel["categorie"];
    status?: ProductGetModel["status"];
    merk?: string;
  };
}



export const getProductsServerQuery = (args: ProductServerQueryArgs) => {
  return {
    queryKey: ["Products", "server", args],
    queryFn: async (): Promise<{
      data: ProductGetModel[];
      total: number;
    }> => {

      let data = productsMock.map(prod => ({
        ...prod,
        beschikbaarVanaf: new Date(prod.beschikbaarVanaf),
        laatstePrijsWijziging: new Date(prod.laatstePrijsWijziging),
      })) as ProductGetModel[];

      const { filters } = args;

      if (filters?.naam) {
        const value = filters.naam.toLowerCase();
        data = data.filter(p =>
          p.naam.toLowerCase().includes(value)
        );
      }

      if (filters?.categorie) {
        data = data.filter(p => p.categorie === filters.categorie);
      }

      if (filters?.status) {
        data = data.filter(p => p.status === filters.status);
      }

      if (filters?.merk) {
        data = data.filter(p =>
          p.merk.toLowerCase().includes(filters.merk!.toLowerCase())
        );
      }

      // sorting
      if (args.sortBy) {
        const dir = args.sortDirection === "desc" ? -1 : 1;

        data.sort((a, b) => {
          const aVal = a[args.sortBy!];
          const bVal = b[args.sortBy!];

          if (aVal instanceof Date && bVal instanceof Date) {
            return (aVal.getTime() - bVal.getTime()) * dir;
          }

          if (typeof aVal === "number" && typeof bVal === "number") {
            return (aVal - bVal) * dir;
          }

          if (typeof aVal === "string" && typeof bVal === "string") {
            return aVal.localeCompare(bVal) * dir;
          }

          return 0;
        });
      }

      // pagination
      const total = data.length;
      const start = (args.page - 1) * args.pageSize;
      const paged = data.slice(start, start + args.pageSize);

      // fake latency
      await new Promise(r => setTimeout(r, 300));

      return {
        data: paged,
        total,
      };
    }
  };
};
