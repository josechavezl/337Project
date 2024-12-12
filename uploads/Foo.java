public class Foo {
    private int x;
    private int y;

    public Foo(int x, int y) {
	this.x = x;
	this.y = y;
    }

    public int add() {
	return x + y;
    }

    public static void main(String[] args) {
	Foo one = new Foo(1, 1);
	Foo two = new Foo(2, 2);
	System.out.println(one.equals(two));
	System.out.println(one.hashCode());
	System.out.println(one.toString());
	/* Note that this class can use "equals", 
	 * "hashCode", and "toString" because
	 * all classes in Java inherits these 
	 * methods from the Object class.
	 */
    }
}
