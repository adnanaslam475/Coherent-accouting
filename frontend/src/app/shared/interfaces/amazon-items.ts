export interface AmazonItem {
  id?: string | number;
  asin: string;
  sellerName: string;
  bestMatch?: BestMatch;
  similarItemsFromSource?: BestMatch[];
  amazonUrl?: string;
  amazonImage?: string;
  amazonPrice?: string;
  amazonTitle?: string;
  amazonReviews: number;
  amazonRating: number;
  amazonCategory: string;
  amazonRanks: AmazonRank;
  sourceTitle: string;
  sourceUrl: string;
  sourceImage: string;
  sourcePrice: string;
  profit: number;
  numberOfAmazonSellers: number;
  addOn?: boolean;
  prime?: boolean;
  estimatedSalesPerDay: string;
  estimatedSalesCatrgory: string;
  veroItem?: boolean;
}

export interface BestMatch {
  sourceUrl: string;
  sourceImage: string;
  sourcePrice: string;
  sourceTitle: string;
  title: string;
  prime: boolean;
  addOn: boolean;
}

export class AmazonRank {
  rank: number;
  category: string;
}

export interface AmazonEstimate {
  estimatedSalesPerDay: string;
  potential: string;
  estimatedSalesCatrgory: string;
}

export interface AmazonItemsSavedList {
  totalElements: number;
  elements: AmazonItem[];
}

export interface AmazonCategory {
  value: string;
  label: string;
  selected?: boolean;
}

export interface AmazonDatabaseItems {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minReviews: number;
  maxReviews: number;
  minRating: number;
  maxRating: number;
  minSalesPerMonth: number;
  maxSalesPerMonth: number;
  minRevenuePerMonth: number;
  maxRevenuePerMonth: number;
  minAmazonSellerRank: number;
  maxAmazonSellerRank: number;
  minNumberOfSellers: number;
  maxNumberOfSellers: number;
  minProfit: number;
  maxProfit: number;
  minQualityScore: number;
  maxQualityScore: number;
  sellerType: string[];
  titleKeyword: string;
  sortField: string;
  direction: 'asc' | 'desc';
  excludeTitleKeywords: string;
  brand: string;
  page: number;
}

export interface AmazonDatabaseResult {
  amazonTitle: string;
  amazonUrl: string;
  amazonPrice: number;
  amazonImage: string;
  amazonReviews: number;
  amazonRating: number;
  amazonRanks: any;
  numberOfAmazonSellers: number;
  asin: string;
  sellerName: string;
  amazonCategory: string;
  date: number;
  brandItem: string;
  sellerType: string;
  mainBestSellerRank: number;
  profit: number;
  estimatedSalesPerMonth: number;
  estimatedRevenue: number;
  fee: number;
  lqs: number;
  addon: boolean;
  prime: boolean;
}
