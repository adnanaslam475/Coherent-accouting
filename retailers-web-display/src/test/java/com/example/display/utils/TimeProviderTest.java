package com.example.display.utils;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.junit.Test;

import com.example.display.util.JwtTokenUtil;

/**
 * Created by stephan on 04.07.17.
 */
public class TimeProviderTest {
    @Test
    public void now() throws Exception {
        assertThat(new JwtTokenUtil().now()).isCloseTo(new Date(), 1000);
    }

}