package com.example.crawler.aws.tests;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.junit.Assert.assertThat;

import org.junit.Before;
import org.junit.Test;

import static com.example.crawler.aws.ItemCondition.NEW;
import static com.example.crawler.aws.ItemInformation.ATTRIBUTES;
import static com.example.crawler.aws.ItemInformation.OFFERS;

import com.example.crawler.aws.AmazonProductAdvertisingApiRequestBuilder;
import com.example.crawler.aws.AmazonWebServiceAuthentication;
import com.example.crawler.aws.AmazonWebServiceLocation;
import com.example.crawler.aws.ItemId;
import com.example.crawler.aws.ItemInformation;

/**
 * Test and usage example of the ItemLookup request url builder using the {@link AmazonProductAdvertisingApiRequestBuilder}.
 *
 * @author ISchwarz
 */
public class ItemLookupTest {

    private static final String ASSOCIATE_TAG = "petarmirchevv-20";
    private static final String AWS_ACCESS_KEY = "AKIAJDV5K27VLYFO63IA";
    private static final String AWS_SECRET_KEY = "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";

    private static final ItemId ITEM_ID = ItemId.createAsin("B01KKOF8IE");
    private AmazonWebServiceAuthentication authentication;

    @Before
    public void setUp() throws Exception {
        authentication = AmazonWebServiceAuthentication.create(ASSOCIATE_TAG, AWS_ACCESS_KEY, AWS_SECRET_KEY);
    }

    @Test
    public void shouldCreateRequestUrl() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
        		.includeInformationAbout(ItemInformation.IMAGES)
        		.includeInformationAbout(ItemInformation.ATTRIBUTES)
                .createRequestUrlFor(AmazonWebServiceLocation.USA, authentication);

        checkRequestUrl(requestUrl, "http", "amazon.de", "All", "ItemAttributes");
    }

    @Test
    public void shouldCreateRequestUrlWithConditionFilter() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .filterByCondition(NEW)
                .createRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "http", "amazon.de", "New", "ItemAttributes");
    }

    @Test
    public void shouldCreateRequestUrlWithSpecificInformation() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .includeInformationAbout(ATTRIBUTES)
                .includeInformationAbout(OFFERS)
                .createRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "http", "amazon.de", "All", "ItemAttributes%2COffers");
    }

    @Test
    public void shouldCreateRequestUrlWithConditionFilterAndSpecificInformation() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .filterByCondition(NEW)
                .includeInformationAbout(ATTRIBUTES)
                .includeInformationAbout(OFFERS)
                .createRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "http", "amazon.de", "New", "ItemAttributes%2COffers");
    }

    @Test
    public void shouldCreateSecureRequestUrl() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .createSecureRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "https", "amazon.de", "All", "ItemAttributes");
    }

    @Test
    public void shouldCreateSecureRequestUrlWithConditionFilter() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .filterByCondition(NEW)
                .createSecureRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "https", "amazon.de", "New", "ItemAttributes");
    }

    @Test
    public void shouldCreateSecureRequestUrlWithSpecificInformation() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .includeInformationAbout(ATTRIBUTES)
                .includeInformationAbout(OFFERS)
                .createSecureRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "https", "amazon.de", "All", "ItemAttributes%2COffers");
    }

    @Test
    public void shouldCreateSecureRequestUrlWithConditionFilterAndSpecificInformation() throws Exception {
        final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
                .filterByCondition(NEW)
                .includeInformationAbout(ATTRIBUTES)
                .includeInformationAbout(OFFERS)
                .createSecureRequestUrlFor(AmazonWebServiceLocation.DE, authentication);

        checkRequestUrl(requestUrl, "https", "amazon.de", "New", "ItemAttributes%2COffers");
    }

    private static void checkRequestUrl(final String requestUrl, final String protocol, final String domain,
                                        final String condition, final String responseGroup) {

        assertThat(requestUrl, startsWith(protocol + "://"));
        assertThat(requestUrl, containsString(domain));
        assertThat(requestUrl, containsString("AWSAccessKeyId=" + AWS_ACCESS_KEY));
        assertThat(requestUrl, containsString("AssociateTag=" + ASSOCIATE_TAG));
        assertThat(requestUrl, containsString("Condition=" + condition));
        assertThat(requestUrl, containsString("ItemId=" + ITEM_ID.getValue()));
        assertThat(requestUrl, containsString("IdType=" + ITEM_ID.getType()));
        assertThat(requestUrl, containsString("Operation=ItemLookup"));
        assertThat(requestUrl, containsString("ResponseGroup=" + responseGroup));
        assertThat(requestUrl, containsString("Service=AWSECommerceService"));
        assertThat(requestUrl, containsString("Timestamp="));
        assertThat(requestUrl, containsString("Version=2011-08-01"));
        assertThat(requestUrl, containsString("Signature="));
    }
}
