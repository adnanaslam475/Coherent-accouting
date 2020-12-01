package com.example.display.repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

import org.hibernate.SessionFactory;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository("lockDao")
public class LockDao {
	
	@Autowired
	@Qualifier("sessionFactory")
    private SessionFactory sessionFactory;
	
	public void aquireLock(String lockId){
		
		sessionFactory.getCurrentSession().doWork(new Work() {
		    @Override
		    public void execute(Connection connection) throws SQLException {
		        CallableStatement stmt = connection.prepareCall(" { call aquire_lock(?) } ");
		        stmt.setString(1, lockId);
		        stmt.executeUpdate();
		    }
		});
		
	}
}
