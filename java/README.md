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
