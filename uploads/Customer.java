/* Jose Santiago Campa Morales (A01436242)
 * October 15th, 2023
 * CIS 279 - Java Programming
 * Assignment - Module #5
 * Homework #5 - "Advanced Arrays and Class Composition"
 * This class reads the text file and calls method to print customer and account information.
 * Version 1.32 */

import java.io.File;  // read text file
import java.io.FileNotFoundException;  // exception
import java.util.Scanner;  // scanner


public class Customer {
	// PROPERTIES
	private int customerNumber;
	private String customerLastName;
	private String customerFirstName;
	private int creditScore;
	
	private String accountStatus;
	private double penaltyFee;
	private double averageBalance;
	
	
	// CONSTRUCTOR
	public Customer(int customerNumber, String customerLastName, String customerFirstName, int creditScore, String accountStatus, double penaltyFee, double averageBalance) {
		this.customerNumber = customerNumber;
		this.customerLastName = customerLastName;
		this.customerFirstName = customerFirstName;
		this.creditScore = creditScore;
		
		this.accountStatus = accountStatus;
		this.penaltyFee = penaltyFee;
		this.averageBalance = averageBalance;
	}
	
	public Customer() {
		super();
	}


	// SETTERS AND GETTERS
	public int getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}

	public String getCustomerLastName() {
		return customerLastName;
	}

	public void setCustomerLastName(String customerLastName) {
		this.customerLastName = customerLastName;
	}

	public String getCustomerFirstName() {
		return customerFirstName;
	}

	public void setCustomerFirstName(String customerFirstName) {
		this.customerFirstName = customerFirstName;
	}

	public int getCreditScore() {
		return creditScore;
	}

	public void setCreditScore(int creditScore) {
		this.creditScore = creditScore;
	}
	
	
	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}
	
	public double getPenaltyFee() {
		return penaltyFee;
	}

	public void setPenaltyFee(double penaltyFee) {
		this.penaltyFee = penaltyFee;
	}
	
	public double getAverageBalance() {
		return averageBalance;
	}

	public void setAverageBalance(double averageBalance) {
		this.averageBalance = averageBalance;
	}

	
	public static void main(String[] args) throws FileNotFoundException {
		CreditCardAccount cca = new CreditCardAccount();  // object
		
		File txt = new File("HW5_Accounts.txt");  // read file
		Scanner scan = new Scanner(txt);
		
		// TABLE LABELS
		System.out.println("Account Number\t\tCustomer ID\t\tLast Name\t\tFirst Name\t\tCredit Score\t\tCredit Limit\t\tEnding Balance\t\tAccount Status\t\tPenalty Fee\t\tAverage Balance\t\tInterest Rate");
		
		while (scan.hasNext()) {  // read each line and use setters
			cca.setAccountNumber(Integer.parseInt(scan.nextLine()));
			cca.setInitialBalance(Double.parseDouble(scan.nextLine()));
			cca.setFinalBalance(Double.parseDouble(scan.nextLine()));
			cca.setCreditLimit(Double.parseDouble(scan.nextLine()));
			cca.setInterestRate(Double.parseDouble(scan.nextLine()) * 100);  // interest rate in %
			cca.setCustomerNumber(Integer.parseInt(scan.nextLine()));
			cca.setCustomerLastName(scan.nextLine());
			cca.setCustomerFirstName(scan.nextLine());
			cca.setCreditScore(Integer.parseInt(scan.nextLine()));	
			
			cca.setAverageBalance((cca.getInitialBalance() + cca.getFinalBalance()) / 2.00);
			
			if (cca.getCreditLimit() >= cca.getFinalBalance()) {
				cca.setAccountStatus("OK");
				cca.setPenaltyFee(0.00);
			}
			
			else {
				cca.setAccountStatus("OVER");
				cca.setPenaltyFee(cca.getFinalBalance() * 0.05);
			}
			
			if (cca.getCreditScore() <= 300 || cca.getCreditScore() >= 850) {
				cca.setCreditScore(000);
			}
			
			cca.printTable();  // print table
			
		}
		
		scan.close();
	}
	
}
