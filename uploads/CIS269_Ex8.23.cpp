/* Jose Santiago Campa Morales (A01436242)
* February 28th, 2024
* CIS 269 - Data Structures
* Assignment #1 - Module #4
* Chapter 8 - Exercise #23
* This program searches for magic squares.
* Version 1.28 */

#include <iostream>  // header for IO objects
#include <iomanip>  // setprecision, fixed and showpoint
#include <cctype>  // toupper
#include <cstdlib>  // rand
#include <ctime>  // time

using namespace std;  // cout and cin

// Array
int nums[9] = { 1,2,3,4,5,6,7,8,9 };  // array

// Functions
void fillArray();  // function used to fill array 1-9
void isArrayMagicSquare(int iterator);  // function to check if array has magic number

int main() {  // main function
	srand(time(0));  // random seed

	isArrayMagicSquare(1000);  // 10000 tries
	isArrayMagicSquare(10000);  // 10000 tries
	isArrayMagicSquare(1000000);  // 1000000 tries

	return 0;  // successful code
}

void fillArray() {
	for (int size = 9; size > 0; size--) {  // for every element of the array
		int num = rand() % (size);  // get a random number
		int temp = nums[size - 1];  // store farthest value
		nums[size - 1] = nums[num];  // swap value with random number
		nums[num] = temp;  // make stored value take its old position, kicking it out of the loop
	}
}

void isArrayMagicSquare(int iterator) {
	int total = 0;  // total for magic num
	int line = 1;  // print 3x3 array
	int counter = 0;  // counter for magic number

	for (int i = 0; i < 9; i++) {
		total += nums[i];
	}
	
	int magic = total / 3;  // calculate magic number

	for (int i = 0; i < iterator; i++) {  // for every try 
		fillArray();  // fill array randomly
		// Below are all cases where groups of three must be equal
		if ((nums[0] + nums[1] + nums[2]) == magic) {
			if ((nums[0] + nums[3] + nums[6]) == magic) {
				if ((nums[0] + nums[4] + nums[8]) == magic) {
					if ((nums[1] + nums[4] + nums[7]) == magic) {
						if ((nums[2] + nums[4] + nums[6]) == magic) {
							if ((nums[2] + nums[5] + nums[8]) == magic) {
								if ((nums[3] + nums[4] + nums[5]) == magic) {
									if ((nums[6] + nums[7] + nums[8]) == magic) {
										counter += 1;  // MAGIC SQUARE
										cout << "MAGIC SQUARE #" << counter << endl;
										for (int i = 0; i < 9; i++) {  // print magic array
											if (line % 3 != 0) {
												cout << nums[i] << " ";
											}
											else {
												cout << nums[i] << endl;
											}
											line += 1;
										}
										cout << endl;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	cout << "Number of magic squares: " << counter << endl;  // total magic arrays
}