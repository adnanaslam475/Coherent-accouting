export interface SearchItemsParams {
  pageNumber: number;
  saleDateRange: string;
  retailerUserName: string;
  minItemsSold: string;
  maxItemsSold: string;
  username: string;
  supplier: string;
  checkSupplier: boolean;
}
export interface Item {
  id?: string | number;
  price: string;
  itemTitle: string;
  saleDate: string;
  timesSold: number;
  searchTimesSold: number;
  url: string;
  picture: string;
  upc: string;
  retailer: string;
  profit: number;
  mpn: string | number;
  orders: string;
  bestMatch?: BestMatch;
  amazonEntities?: BestMatch[];
  amazonUrl?: string;
  amazonPicture?: string;
  amazonPrice?: string;
  amazonTitle?: string;
  addOn?: boolean;
  prime?: boolean;
  asin?: string;
  username?: string;
  isSavedNewItem?: boolean;
}

export interface SavedItem {
  id: number;
  itemTitle: string;
  price: string;
  saleDate: string;
  timesSold: number;
  url: string;
  picture: string;
  upc: string;
  amazonUrl: string;
  amazonPicture: string;
  amazonPrice: string;
  retailer: string;
  searchTimesSold: number;
  profit: string;
  orders: string[] | string;
  prime: boolean;
  addOn: boolean;
}

export interface ItemsSavedList {
  totalElements: number;
  elements: SavedItem[];
}

export interface OrderChartData {
  date: string;
  salesPerDay: number;
  duplicate?: boolean;
}

export interface Orders {
  saleDate: string;
  quantityPurchased: number | string;
  seller: string;
  salesItemId: number | string;
  transactionPrice: string | number;
  transactionCurrency: string;
  duplicate?: boolean;
}

export interface BestMatch {
  amazonUrl: string;
  amazonPicture: string;
  amazonPrice: string;
  amazonTitle: string;
  prime: boolean;
  addOn: boolean;
  asin: string;
}
