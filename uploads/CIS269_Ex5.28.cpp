/* Jose Santiago Campa Morales (A01436242)
* February 21st, 2024
* CIS 269 - Data Structures
* Assignment #2 - Module #3
* Chapter 5 - Exercise #28
* Apartment Problem: This program maximizes an apartment complex's profit.
* Version 1.13 */

#include <iostream>  // header for IO objects
#include <iomanip>  // setprecision, fixed and showpoint

using namespace std;  // cout and cin

int main() {  // main function
	// Input
	int units;
	double rentAll, rentIncrease, rentMaintain;

	// Calculation
	double profit1, profit2;

	// Output
	int unitsMax = 0;

	cout << "Total number of units: ";  // prompt
	cin >> units;  // input
	cout << endl;  // newline

	cout << "Rent to occupy all the units: ";
	cin >> rentAll;
	cout << endl;

	cout << "Increase in rent that results in a vacant unit: ";
	cin >> rentIncrease;
	cout << endl;

	cout << "Amount to maintain a rented unit: ";  // prompt
	cin >> rentMaintain;  // input
	cout << endl;  // newline

	// Calculate number of rented apartments for maximization
	for (int unit = 0; unit <= units; unit++) {  // for every unit
		profit1 = (((units - unit) * (rentAll + (unit * rentIncrease))) - (rentMaintain * (units - unit)));  // total profit for n units
		profit2 = (((units - unit - 1) * (rentAll + ((unit + 1) * rentIncrease))) - (rentMaintain * (units - (unit + 1))));  // total profit for n-1 units

		if (profit2 > profit1) {  // if n-1 units is more profitable
			unitsMax = units - (unit + 1);  // maximized units
		}
		else if (profit2 < profit1 && unit == 0) {  // if it never gets more profitable
			unitsMax = units;  // all units need to be rented
		}
	}

	cout << "You need " << unitsMax << " units to be rented to maximize profit." << endl;  // print results

	return 0;  // successful code
}