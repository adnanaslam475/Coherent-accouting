package com.example.crawler;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class JwtDemoApplicationTests {

   @Test
   public void contextLoads() {
	   String date = "January 22, 2018 at 4:09 pm";
	   String parsed = date.substring(0, date.indexOf("at") - 1 );
	   //January 22, 2018
	   System.out.println(parsed);
	   DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy", Locale.US);
	   LocalDate ld = LocalDate.parse(parsed, formatter);
	   LocalDateTime localDate = ld.atStartOfDay();
	   System.out.println(localDate);
   }
}
