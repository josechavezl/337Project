import z3

# Create solver instance
solver = z3.Solver()

# Create variables
x = z3.Int('x')
y = z3.Int('y')

# Add constraints
solver.add(x + y == 10)
solver.add(x - y == 2)

# Check if the constraints are satisfiable
if solver.check() == z3.sat:
    print("Satisfiable")
    model = solver.model()
    print(f"x = {model[x]}")
    print(f"y = {model[y]}")
else:
    print("Unsatisfiable")
