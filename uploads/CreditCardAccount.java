/* Jose Santiago Campa Morales (A01436242)
 * October 15th, 2023
 * CIS 279 - Java Programming
 * Assignment - Module #5
 * Homework #5 - "Advanced Arrays and Class Composition"
 * This program reads a text file and sorts customer and account information.
 * Version 1.32 */

public class CreditCardAccount {
	// PROPERTIES
	private int accountNumber;
	private double initialBalance;
	private double finalBalance;
	private double creditLimit;
	private double interestRate;
	
	private Customer customer = new Customer();  // object of class
	
	
	// CONSTRUCTOR
	public CreditCardAccount(int accountNumber, double initialBalance, double finalBalance, double creditLimit,
			double interestRate, Customer customer) {
		this.accountNumber = accountNumber;
		this.initialBalance = initialBalance;
		this.finalBalance = finalBalance;
		this.creditLimit = creditLimit;
		this.interestRate = interestRate;
		this.customer = customer;
	}
	
	public CreditCardAccount() {
		super();
	}

	
	// SETTERS AND GETTERS
	public int getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(int accountNumber) {
		this.accountNumber = accountNumber;
	}

	public double getInitialBalance() {
		return initialBalance;
	}

	public void setInitialBalance(double initialBalance) {
		this.initialBalance = initialBalance;
	}

	public double getFinalBalance() {
		return finalBalance;
	}

	public void setFinalBalance(double finalBalance) {
		this.finalBalance = finalBalance;
	}

	public double getCreditLimit() {
		return creditLimit;
	}

	public void setCreditLimit(double creditLimit) {
		this.creditLimit = creditLimit;
	}

	public double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	
	// CUSTOMER SETTERS AND GETTERS
	public int getCustomerNumber() {
		return customer.getCustomerNumber();
	}

	public void setCustomerNumber(int customerNumber) {
		this.customer.setCustomerNumber(customerNumber);
	}

	public String getCustomerLastName() {
		return customer.getCustomerLastName();
	}

	public void setCustomerLastName(String customerLastName) {
		this.customer.setCustomerLastName(customerLastName);
	}
	
	public String getCustomerFirstName() {
		return customer.getCustomerFirstName();
	}

	public void setCustomerFirstName(String customerFirstName) {
		this.customer.setCustomerFirstName(customerFirstName);
	}
	
	public int getCreditScore() {
		return customer.getCreditScore();
	}

	public void setCreditScore(int creditScore) {
		this.customer.setCreditScore(creditScore);
	}
	
	
	public String getAccountStatus() {
		return customer.getAccountStatus();
	}

	public void setAccountStatus(String accountStatus) {
		this.customer.setAccountStatus(accountStatus);
	}
	
	public double getPenaltyFee() {
		return customer.getPenaltyFee();
	}

	public void setPenaltyFee(double penaltyFee) {
		this.customer.setPenaltyFee(penaltyFee);
	}

	public double getAverageBalance() {
		return customer.getAverageBalance();
	}

	public void setAverageBalance(double averageBalance) {
		this.customer.setAverageBalance(averageBalance);
	}
	
	
	// PRINT METHOD
	public void printTable() {  // - left-aligns at n characters
		System.out.printf("%d\t\t%d\t\t\t%s\t\t\t%s\t\t\t%d\t\t\t%-9.2f\t\t%.2f\t\t\t%s\t\t\t%.2f\t\t\t%.2f\t\t\t%.0f%%\t\t\t\n",
				getAccountNumber(), getCustomerNumber(), getCustomerLastName(),
				getCustomerFirstName(), getCreditScore(), getCreditLimit(), getFinalBalance(),
				getAccountStatus(), getPenaltyFee(), getAverageBalance(), getInterestRate());
	}
}
