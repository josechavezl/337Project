/* Jose Santiago Campa Morales (A01436242)
 * November 5th, 2023
 * CIS 279 - Java Programming
 * Assignment - Module #7
 * Homework #7 - "Exceptions and Text IO"
 * This program reads a .dat payroll file and calculates payments.
 * Version 1.23 */

import java.io.File;  // read text file
import java.io.FileNotFoundException;  // file exception
import java.util.InputMismatchException;  // input exception
import java.util.Scanner;  // scanner


public class Payroll {
	// PROPERTIES
	private int EmpID;
	private String LastName;
	private String firstName;
	private double hoursWorked;
	private double hourlyRate;
	
	private double regularPay;
	private double overtimePay;
	private double totalPay;
	
	
	// CONSTRUCTOR
	public Payroll(int empID, String lastName, String firstName, double hoursWorked, double hourlyRate,
			double regularPay, double overtimePay, double totalPay) {
		EmpID = empID;
		LastName = lastName;
		this.firstName = firstName;
		this.hoursWorked = hoursWorked;
		this.hourlyRate = hourlyRate;
		this.regularPay = regularPay;
		this.overtimePay = overtimePay;
		this.totalPay = totalPay;
	}

	public Payroll() {
		super();
	}

	
	// SETTERS AND GETTERS
	public int getEmpID() {
		return EmpID;
	}

	public void setEmpID(int empID) {
		EmpID = empID;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public double getHoursWorked() {
		return hoursWorked;
	}

	public void setHoursWorked(double hoursWorked) {
		this.hoursWorked = hoursWorked;
	}

	public double getHourlyRate() {
		return hourlyRate;
	}

	public void setHourlyRate(double hourlyRate) {
		this.hourlyRate = hourlyRate;
	}

	public double getRegularPay() {
		return regularPay;
	}

	public void setRegularPay(double regularPay) {
		this.regularPay = regularPay;
	}

	public double getOvertimePay() {
		return overtimePay;
	}

	public void setOvertimePay(double overtimePay) {
		this.overtimePay = overtimePay;
	}

	public double getTotalPay() {
		return totalPay;
	}

	public void setTotalPay(double totalPay) {
		this.totalPay = totalPay;
	}
	
	
	// PAY METHOD
	public static double[] pay(double hours, double rate) {
		double regPay;
		double otPay;
		
		if (hours > 40) {  // subtract hours over 40 and multiply
			regPay = rate * 40;
			otPay = (hours - 40) * rate * 1.5;
		}
		else {  // no ot pay
			regPay = rate * hours;
			otPay = 0.00;
		}
		return new double[] {regPay, otPay};  // return both values as an array
	}
	
	
	// PRINT METHOD
	public void printPayroll() {  // left-aligned
		System.out.printf("%d\t\t%8s,\t%10s\t%12.2f\t%11.2f\t%11.2f\t%12.2f\t%9.2f\t\n",
				getEmpID(), getLastName(), getFirstName(), getHoursWorked(),
				getHourlyRate(), getRegularPay(), getOvertimePay(), getTotalPay());
	}
	
	
	// MAIN FUNCTION
	public static void main(String[] args) {
		try {
			Payroll pr = new Payroll();  // object
			File txt = new File("payroll.dat");  // file
			Scanner scan = new Scanner(txt);  // scanner
		
			// header
			System.out.println("Emp ID\t\tLast Name\tFirst Name\tHours Worked\tHourly Rate\tRegular Pay\tOvertime Pay\tTotal Pay");
		
			while(scan.hasNext()) {  // print every line
				try {
					pr.setEmpID(Integer.parseInt(scan.nextLine()));
				}
				catch (InputMismatchException e) {  // input exception
					System.out.println("Input not an Integer or Double. Exiting program.");
					scan.close();
					System.exit(-1);
				}
				pr.setLastName(scan.nextLine());
				pr.setFirstName(scan.nextLine());
				try {
					pr.setHoursWorked(Double.parseDouble(scan.nextLine()));
					pr.setHourlyRate((Double.parseDouble(scan.nextLine())));				}
				catch (InputMismatchException e) {  // input exception
					System.out.println("Input not an Integer or Double. Exiting program.");
					scan.close();
					System.exit(-1);
				}
				
				double pay[] = pay(pr.getHoursWorked(), pr.getHourlyRate());  // get both array elements from method
				
				pr.setRegularPay(pay[0]);  // element 1
				pr.setOvertimePay(pay[1]);  // element 2
				pr.setTotalPay(pr.getRegularPay() + pr.getOvertimePay());  // total pay
				
				pr.printPayroll();  // print table
			}	
		
			scan.close();
		}
		
		catch(FileNotFoundException e) {  // file exception
			System.out.println("File not found. Exiting program.");
			System.exit(-1);
		}
	}
}