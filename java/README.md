Java Performance The Definitive Guide
========================


## Java Monitoring Tools

To gain insight into the JVM itself, Java monitoring tools are required. A number of
tools come with the JDK:

### jcmd

Prints basic class, thread, and VM information for a Java process. This is suitable
for use in scripts; it is executed like this:
```
% jcmd process_id command optional_arguments
```

Supplying the command help will list all possible commands, and supplying help
command will give the syntax for a particular command.


### jconsole
Provides a graphical view of JVM activities, including thread usage, class usage, and GC activities.


### jhat
Reads and helps analyze memory heap dumps. This is a postprocessing utility.

### jmap
Provides heap dumps and other information about JVM memory usage. Suitable for scripting, though the heap dumps must be used in a postprocessing tool.

### jinfo
Provides visibility into the system properties of the JVM, and allows some system properties to be set dynamically. Suitable for scripting.

### jstack
Dumps the stacks of a Java process. Suitable for scripting.

### jstat
Provides information about GC and class-loading activities. Suitable for scripting.

### jvisualvm
A GUI tool to monitor a JVM, profile a running application, and analyze JVM heap dumps (which is a postprocessing activity, though jvisualvm can also take the heap dump from a live program).

These tools fits into these broad areas:
 - Basic VM information
 - Thread information
 - Class information
 - Live GC analysis
 - Heap dump postprocessing
 - Profiling a JVM


## Java: Advanced Concepts for High Performance Applications

### Generic

Generic methods allow Java methods to work with different data types without needing separate versions for each.
They provide a way to write more reusable and adaptable code. The letter T, this can be any letter that you choose
but the convention here is to put a capital T for type.

```
public class GenericMethods {

    public static void main(String[] args) {
        String[] words = {"apple", "banana", "pear"};
        Integer[] numbers = {1, 5, 7};
        List<String> wordsList = convertArrayToList(words);
        List<Integer> numbersList = convertArrayToList(numbers);
        System.out.println(wordsList);
        System.out.println(numbersList);
    }

    private static <T> List<T> convertArrayToList(T[] array) {
        return Arrays.asList(array);
    }

}
```

### Bounded generics

Bounded generics allow you to restrict the types that can be passed into a method, promoting stricter type safety. The extends keyword is used within the angle brackets (e.g., <code>\<T extends Number></code>) to specify the base class that a type must inherit from. 

The code demonstrates restricting the method to accept only types extending the Number class (like Integer and Double). This restriction prevents accidental parsing of arrays containing incompatible data types, leading to compile-time errors.

```
public class BoundedGenerics {

    public static void main(String[] args) {
        Double[] doubles = {2.0, 3.5, 14.7};
        Integer[] numbers = {1, 5, 7};
        List<Double> doublesList = convertArrayToList(doubles);
        List<Integer> numbersList = convertArrayToList(numbers);
        System.out.println(doublesList);
        System.out.println(numbersList);
    }

    private static <T extends Number> List<T> convertArrayToList(T[] array) {
        return Arrays.asList(array);
    }


}
```

### Liskov Substitution Principle (LSP)

The Liskov Substitution Principle (LSP) helps you write more flexible and maintainable code. It means that a subtype should behave in the same way as its supertype. Essentially, objects of a derived class should be able to replace objects of the base class without affecting the functionality of the program.


an example of an online clothing store where different items of clothing (like shirts and jackets) are subtypes of a general clothing item. The checkout process works the same regardless of the specific type of clothing item, ensuring consistent behavior.

#### wildcard in generic

The wildcard is used to allow a method to accept lists of a specific type or any of its subtypes.
For example, using <code>List<? extends ClothingItem></code> in the <code>checkoutAllItems</code> method allows it to handle lists of <code>ClothingItem</code> or any subclass, eliminating compiler errors and making the code more flexible.

```
public abstract class ClothingItem {

    abstract int getPrice();

    abstract String getName();

}

public class JacketItem extends ClothingItem {

    @Override
    int getPrice() {
        return 25;
    }

    @Override
    String getName() {
        return "Jacket";
    }
}

public class ShirtItem extends ClothingItem {

    @Override
    int getPrice() {
        return 10;
    }

    @Override
    String getName() {
        return "Shirt";
    }
}

public class ClothingSite {

    public static void main(String[] args) {

        ShirtItem shirtItemOne = new ShirtItem();
        ShirtItem shirtItemTwo = new ShirtItem();

        List<ShirtItem> shirtItems = new ArrayList<>();
        shirtItems.add(shirtItemOne);
        shirtItems.add(shirtItemTwo);
        
        ShirtItem shirtItem = new ShirtItem();
        JacketItem jacketItem = new JacketItem();

        List<ClothingItem> clothingItems = new ArrayList<>();
        clothingItems.add(shirtItem);
        clothingItems.add(jacketItem);

        checkoutAllItems(clothingItems);
        checkoutAllItems(shirtItems);

    }

    static void checkoutItem(ClothingItem item) {
        System.out.println("Item purchased: " + item.getName() + ", price: " + item.getPrice());
    }

    static void checkoutAllItems(List<? extends ClothingItem> clothingItems) {

        for (ClothingItem clothingItem : clothingItems) {
            checkoutItem(clothingItem);
        }

    }

}
```