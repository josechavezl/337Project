/* Jose Santiago Campa Morales (A01436242)
 * October 29th, 2023
 * CIS 279 - Java Programming
 * Assignment - Module #6
 * Homework #6 - "Inheritance, Polymorphism and Abstract Classes"
 * This program includes a base class that holds common properties and methods.
 * Version 1.55 */

import java.util.LinkedList;

abstract public class Account {
	// PROPERTIES
	private int accountNumber;
	private int customerID;
	private char accountType;
	private double balance;
	private double interestRate;
	private int term;
	private double periodicPayment;
	
	private LinkedList<Transaction> transactionList = new LinkedList<>();
	
	
	// CONSTRUCTOR
	public Account(int accountNumber, int customerID, char accountType, double balance, double interestRate, int term, double periodicPayment) {
		super();
		this.accountNumber = accountNumber;
		this.customerID = customerID;
		this.accountType = accountType;
		this.balance = balance;
		this.interestRate = interestRate;
		this.term = term;
		this.periodicPayment = periodicPayment;
	}

	public Account() {
		super();		
	}

	
	// SETTERS AND GETTERS
	public int getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(int accountNumber) {
		this.accountNumber = accountNumber;
	}

	public int getCustomerID() {
		return customerID;
	}

	public void setCustomerID(int customerID) {
		this.customerID = customerID;
	}

	public char getAccountType() {
		return accountType;
	}

	public void setAccountType(char accountType) {
		this.accountType = accountType;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}

	public int getTerm() {
		return term;
	}

	public void setTerm(int term) {
		this.term = term;
	}

	public double getPeriodicPayment() {
		return periodicPayment;
	}

	public void setPeriodicPayment(double periodicPayment) {
		this.periodicPayment = periodicPayment;
	}

	public LinkedList<Transaction> getTransactionList() {
		return transactionList;
	}

	public void setTransactionList(LinkedList<Transaction> transactionList) {
		this.transactionList = transactionList;
	}
	
	
	@Override  // ABSTRACT METHODS
	public abstract String toString();
	
	public abstract void processTransaction(Transaction transactionObj);
	
	public abstract void calcPeriodicPayment();
	
}
