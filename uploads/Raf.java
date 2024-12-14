/* Jose Santiago Campa Morales (A01436242)
 * November 12th, 2023
 * CIS 279 - Java Programming
 * Assignment - Module #7
 * Exercise #2 - "Random Access Files"
 * This program calculates the length of a file and uses seek with RandomAccessFile class.
 * Version 1.08 */

import java.io.RandomAccessFile;  // .length() and .seek()
import java.io.IOException;  // exception

public class Raf {
	public static void main(String[] args) throws IOException {
		// RandomAccessFile object referring to a .txt file
		RandomAccessFile empRaf = new RandomAccessFile("employees.txt", "r");
		
		System.out.println("Length: " + empRaf.length());  // length of file in bytes
		
		empRaf.seek(20);  // move pointer to position 20
		
		empRaf.close();  // close raf object
	}
}
