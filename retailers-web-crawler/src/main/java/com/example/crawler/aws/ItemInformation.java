package com.example.crawler.aws;

/**
 * A listing that contains all item information available at Amazon.
 *
 * @author ISchwarz
 */
public enum ItemInformation {

    ACCESSORIES("Accessories"),
    ALTERNATIVE_VERSIONS("AlternativeVersions"),
    ATTRIBUTES("ItemAttributes"),
    BROWSE_NODES("BrowseNodes"),
    EDITORIAL_REVIEW("EditorialReview"),
    IMAGES("Images"),
    OFFER_FULL("OfferFull"),
    OFFER_SUMMARY("OfferSummary"),
    OFFERS("Offers"),
    REVIEWS("Reviews"),
    SALES_RANK("SalesRank"),
    SIMILARITIES("Similarities"),
    TRACKS("Tracks"),
    VARIATION_IMAGES("VariationImages"),
    VARIATION_MATRIX("VariationMatrix"),
    VARIATION_SUMMARY("VariationSummary"),
    VARIATIONS("Variations");

    private final String requestValue;

    ItemInformation(final String requestValue) {
        this.requestValue = requestValue;
    }

    /**
     * Gives the value used in the URL request that represents this item information.
     *
     * @return The value used in the URL request that represents this item information.
     */
    String getRequestValue() {
        return requestValue;
    }
}
