package com.example.crawler.aws;

/**
 * A listing that contains all item conditions available at Amazon.
 *
 * @author ISchwarz
 */
public enum ItemCondition {

    ALL("All"),
    NEW("New"),
    USED("Used"),
    REFURBISHED("Refurbished"),
    COLLECTIBLE("Collectible");

    private final String requestValue;

    ItemCondition(final String requestValue) {
        this.requestValue = requestValue;
    }

    /**
     * Gives the value used in the URL request that represents this item condition.
     *
     * @return The value used in the URL request that represents this item condition.
     */
    String getRequestValue() {
        return requestValue;
    }
}
