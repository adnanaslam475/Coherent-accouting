export interface Retailer {
  id?: string;
  retailerUsername: string;
  url: string;
  feedbackScore: number;
  sellerListings: number;
  topRated?: boolean;
  sellThroughRate: number;
  searchedDaysAgo?: number;
  countryName?: string;
  countryISOCode?: string;
}

export interface SearchRetailersParams {
  searchWord: string;
  minFeedback: number;
  maxFeedback: number;
  maxActiveListings: number;
  minActiveListings: number;
  pageNumber: number;
  topRated: boolean;
}

export interface RetailersSavedList {
  totalElements: number;
  elements: Retailer[];
}
