declare namespace ICountry {
  interface Country {
    name: IName;
    tld?: string[];
    cca2: string;
    ccn3?: string;
    cca3: string;
    independent?: boolean;
    status: string;
    unMember: boolean;
    currencies?: Currencies;
    idd: Idd;
    capital?: string[];
    altSpellings: string[];
    region: string;
    languages?: Languages;
    translations: Translations;
    latlng: number[];
    landlocked: boolean;
    area: number;
    demonyms?: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    car: Car;
    timezones: string[];
    continents: string[];
    flags: Flags;
    coatOfArms: CoatOfArms;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
    cioc?: string;
    subregion?: string;
    fifa?: string;
    borders?: string[];
    gini?: Gini;
    postalCode?: PostalCode;
  }

  interface PostalCode {
    format: string;
    regex?: string;
  }

  interface Gini {
    [year: string]: number;
  }

  interface CapitalInfo {
    latlng?: number[];
  }

  interface CoatOfArms {
    png?: string;
    svg?: string;
  }

  interface Flags {
    png: string;
    svg: string;
    alt?: string;
  }

  interface Car {
    signs?: string[];
    side: string;
  }

  interface Maps {
    googleMaps: string;
    openStreetMaps: string;
  }

  interface Demonyms {
    eng: Eng2;
    fra?: Eng2;
  }

  interface Eng2 {
    f: string;
    m: string;
  }

  interface Translations {
    [key: string]: NameKey;
  }

  interface Languages {
    [key: string]: string;
  }

  interface Idd {
    root?: string;
    suffixes?: string[];
  }

  interface Currencies {
    [key: string]: CurrencyKey;
  }

  interface CurrencyKey {
    name: string;
    symbol: string;
  }

  interface IName {
    common: string;
    official: string;
    nativeName?: NativeName;
  }

  interface NativeName {
    [key: string]: NameKey;
  }

  interface NameKey {
    official: string;
    common: string;
  }
}
