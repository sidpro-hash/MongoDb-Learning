Operating Systems and You: Becoming a Power User
========================


With Google Coursera
---------------

  [![Build][github-ci-image]][github-ci-link]
  [![Package Control Downloads][pc-image]][pc-link]
  ![License][license-image]

# Week 1

## Supplemental Reading for Windows CLI & Unix Bash

For more detailed information on the modern Windows CLI, PowerShell, see the <a target="_blank" href="https://docs.microsoft.com/powershell/">official PowerShell documentation</a>, and the <a href="https://docs.microsoft.com/powershell/scripting/learn/ps101/00-introduction" target="_blank">PowerShell 101 guide</a>. For more on the older Windows "Command Prompt" CLI (cmd.exe) please see the link <a href="https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands" target="_blank">here</a>. 

If you want to check out more information on Bash, then click the link <a href="https://www.gnu.org/software/bash/manual/bash.html" target="_blank">here</a>.


## Supplemental Reading for 'Size' vs 'Size of Disk' in Windows

For more information on 'size on disk' vs 'folder size' in Windows, please check out the link <a href="https://technet.microsoft.com/en-us/library/hh148159.aspx" target="_blank">here</a>.

## Windows: Make Directories in the GUI & CLI

For Windows
```
PS F:\Windowcmd> mkdir OS` and` You` Becoming` Power` User
```

For Linux
```
$ mkdir OS\ and\ You\ Becoming\ Power\ User
```

## Windows: Moving and Renaming Files, Directories

```
PS F:\Windowcmd\OS and You Becoming Power User> type blue_document.txt
PS F:\Windowcmd\OS and You Becoming Power User> echo "cow horse house" > temp.txt
PS F:\Windowcmd\OS and You Becoming Power User> mv blue_document.txt yellow_document.txt
PS F:\Windowcmd\OS and You Becoming Power User> mkdir my` documents
PS F:\Windowcmd\OS and You Becoming Power User> mv .\yellow_document.txt '.\my documents\'
```


## Windows: Display File Contents

```
PS F:\Windowcmd\OS and You Becoming Power User> cat temp.txt
PS F:\Windowcmd\OS and You Becoming Power User> cat .\PEassignment4.txt -head 10
PS F:\Windowcmd\OS and You Becoming Power User> more .\PEassignment4.txt
```
<code>more</code> : use <code>q</code> to quite the page view,
                      <code>space</code> to view next page,
                      <code>Enter</code> to view next line.


## Supplemental Reading for GNU Documentation

For more information on Nano click <a href="https://www.nano-editor.org/" target="_blank">here</a>, for Vim click <a href="https://vim.sourceforge.io/docs.php" target="_blank">here</a> and Emacs you can view <a href="https://www.gnu.org/software/emacs/tour/" target="_blank">here</a>.


## Windows: Searching within Directories and Files

```
PS F:\Windowcmd\OS and You Becoming Power User> Alias ls
PS F:\Windowcmd\OS and You Becoming Power User> ls 'C:\Program Files\' -Recurse -Filter *.exe
PS F:\Windowcmd\OS and You Becoming Power User> select-string cow temp.txt
```

## Windows: Input, Output, and the Pipeline

```
PS F:\Windowcmd\OS and You Becoming Power User> cat .\echo.txt
street
stop
steam
loop
PS F:\Windowcmd\OS and You Becoming Power User> cat .\echo.txt | select-string st

street
stop
steam
```

## Supplemental Reading for Windows PowerShell

For more information on getting started with Microsoft PowerShell, check out the link <a href="https://mva.microsoft.com/en-us/training-courses/getting-started-with-microsoft-powershell-8276" target="_blank">here</a> and also <a href="https://github.com/PowerShell/PowerShell/blob/master/docs/learning-powershell/README.md" target="_blank">here</a>.

# Week 2

## Windows: View User and Group Information

```
PS C:\Windows\system32> get-localuser
PS C:\Windows\system32> get-localgroup
PS C:\Windows\system32> get-localgroupmember administrators
```

## Supplemental Reading for Windows Passwords

You can check out more information on <b>Windows</b> and <b>passwords</b> <a href="https://msdn.microsoft.com/en-us/library/cc875839.aspx" target="_blank">here</a>.


## Windows: Adding and Removing Users

```
PS C:\Windows\system32> net user andrea * /add
Type a password for the user:
Retype the password to confirm:
The command completed successfully.
PS C:\Windows\system32> get-LocalUser
PS C:\Windows\system32> net user andrea /logonpasswordchg:yes
PS C:\Windows\system32> net user cesar pa5sw0rd /add /logonpasswordchg:yes
PS C:\Windows\system32> get-LocalUser
PS C:\Windows\system32> net user andrea /del
PS C:\Windows\system32> remove-localuser cesar
PS C:\Windows\system32> get-LocalUser
```

## Supplemental Reading for Windows ACL

For more information about access control lists (ACL) in Windows, check out the link <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa374872(v=vs.85).aspx" target="_blank">here</a>.

icacls = pronouce: i Ke kals

## Windows: Modifying Permissions

```
PS F:\Windowcmd\OS and You Becoming Power User> icacls 'my documents' /remove cesar
PS F:\Windowcmd\OS and You Becoming Power User> icacls 'my documents'
```

## Supplemental Reading for Special Permissions in Windows

For more information about file and folder permissions in Windows, check out the link <a href="https://technet.microsoft.com/en-us/library/cc732880(v=ws.11).aspx" target="_blank">here</a>.

## Linux: SetUID, SetGID, Sticky Bit

- The SetUID bit is used to allow a file to be run as the owner of the file.
- The SetGID bit is used to allow a file to be run as member of file group.
- The sticky bit allows the file to be modified by anyone, but only removed by the owner or root.


## Creating, Modifying, and Removing File and Folder Permissions in Windows

```
ICACLS C:\Users\Qwiklab\Documents\important_document /remove "Kara"
ICACLS C:\Users\Qwiklab\Documents\important_document
ICACLS C:\Users\Qwiklab\Documents\important_document /grant "Kara:(r)"
PS C:\Users\Qwiklab> icacls .\Secret /grant "Phoebe:(r)"
PS C:\Users\Qwiklab> icacls .\Secret /grant "Kara:(w)"
PS C:\Users\Qwiklab> icacls .\Music /remove "Everyone"
PS C:\Users\Qwiklab> icacls .\Music /grant "Everyone:(r)"
PS C:\Users\Qwiklab> icacls .\Documents\not_so_important_document /grant "Authenticated Users:(w)"
```

# Week 3

## Supplemental Reading for Windows Software Packages

For more information on the topics presented in this lecture please check out the following links: <a href="https://en.wikipedia.org/wiki/Portable_Executable" target="_blank">portable executable</a>, <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa369294(v=vs.85).aspx" target="_blank">Installation Package</a>, <a href="https://en.wikipedia.org/wiki/Windows_Store" target="_blank">Windows Store</a>,  and <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/hh446767(v=vs.85).aspx" target="_blank">App packager (MakeAppx.exe)</a>.

For a description of the command-line switches that are supported by a software installation package, an update package, or a hotfix package that was created by using Microsoft Self-Extractor click <a href="https://support.microsoft.com/en-us/help/912203/description-of-the-command-line-switches-that-are-supported-by-a-softw" target="_blank">here</a>.

## Linux: Software Packages

```
sudo dpkg -i atom-amd64.deb
sudo dpkg -r atom
dpkg -l | grep atom
```

## Supplemental Reading for Mobile App Packages

Check out the following links for more information:
- <a href="https://developer.apple.com/business/custom-apps/" target="_blank">Distributing custom apps for business</a>
- <a href="https://developers.google.com/android/work/play/custom-app-api/get-started" target="_blank">Get started with custom app publishing</a>
- <a href="https://support.apple.com/HT201656" target="_blank">How to check the storage on iOS</a>
- <a href="https://support.google.com/android/answer/7431795" target="_blank">Free up space in Android</a>
- <a href="https://support.apple.com/HT204266" target="_blank">App updates in iOS</a>
- <a href="https://support.google.com/googleplay/answer/113412" target="_blank">App updates in Android</a>

## Supplemental Reading for 7-Zip and PowerShell Zips

If you're interested in downloading 7-Zip, check out the link <a href="http://www.7-zip.org/download.html" target="_blank">here</a>.

For more information about creating an archive or zipped file using Windows PowerShell, check out the link <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/compress-archive?view=powershell-5.0" target="_blank">here</a>.


## Supplemental Reading for the Linux Tar Command

For more information about the Linux *tar* command, please check out the following link <a href="http://www.linfo.org/tar.html" target="_blank">here</a>.


## Windows: Package Dependencies

```
PS C:\Windows\system32> Register-PackageSource -Name chocolatey -ProviderName Chocolatey -Location http://chocolatey.org/api/v2
PS C:\Windows\system32> Get-PackageSource
PS C:\Windows\system32> Find-Package sysinternals -IncludeDependencies
```

## Supplemental reading for Windows Package Dependencies

For more information on the following topics, please see the following links:  <a href="https://en.wikipedia.org/wiki/Dynamic-link_library" target="_blank">Dynamic- link library</a>, <a href="https://en.wikipedia.org/wiki/DLL_Hell" target="_blank">DLL Hell</a>,  <a href="https://msdn.microsoft.com/en-us/library/aa376307.aspx" target="_blank">Side- by- side Assemblies</a> and you can check out the PowerShell Gallery <a href="http://www.powershellgallery.com/" target="_blank">here</a>.


## Supplemental Reading for Linux Package Dependencies

*dpkg* is a package manager for Debian-based Linux systems like Ubuntu. For more information about *dpkg* commands, check out the link <a href="https://help.ubuntu.com/lts/serverguide/dpkg.html" target="_blank">here</a>.

## Supplemental Reading for Windows Package Managers

For more information about the NuGet package manager, check out the link <a href="https://en.wikipedia.org/wiki/NuGet" target="_blank">here</a>.

For more information about the Chocolatey package manager, check out the link <a href="https://chocolatey.org/packages" target="_blank">here</a>.


## Supplemental Reading for Linux PPAs

If you work in a Linux environment, there are also special repositories known as PPAs or Personal Package Archives. PPAs are hosted on Launchpad servers. For more information about PPAs, check out the link <a href="https://help.launchpad.net/Packaging/PPA" target="_blank">here</a>.


## Supplemental Reading on GIMP

For more information on how to install the open-source graphical editor GIMP click <a href="https://www.gimp.org/downloads/" target="_blank">here</a>.


## Supplemental Reading for Windows Installers and Process Monitors

For more information about various ways you can create and edit Windows installer packages, check out the following links: <a href="https://docs.microsoft.com/en-us/sysinternals/downloads/procmon" target="_blank">Process Monitor</a>, <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa372837(v=vs.85).aspx" target="_blank">Windows Installer Examples</a>, and <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa370557(v=vs.85).aspx" target="_blank">Orca.exe</a>.


## Supplemental Reading Windows Devices and Drivers

For an Introduction to Plug and Play click <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-plug-and-play" target="_blank">here</a>.

As discussed in the previous lecture video, when Windows notices that a new device has been connected, the first thing it will do is ask the device that's been plugged in for it's Hardware ID. For more information on hardware identification click <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/install/step-1--the-new-device-is-identified" target="_blank">here</a>.

Once Windows has the Hardware ID of the new device, the OS uses that ID to search for the right driver for the device, For more information on this click <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/install/hardware-ids" target="_blank">here</a>.

It looks in a few places for the driver, starting with a local list of well-known drivers, then going onto Windows Update or the Driver Store. For more information click <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/install/step-2--a-driver-for-the-device-is-selected" target="_blank">here</a>.


## Supplemental reading for Linux Devices and Drivers

For more information on Device Files click <a href="https://en.wikipedia.org/wiki/Device_file" target="_blank">here</a> and for Udev click <a href="https://en.wikipedia.org/wiki/Udev" target="_blank">here</a>.


## Supplemental Reading for Windows Update

For more information about the Windows Updates, check out the Wikipedia article <a href="https://en.wikipedia.org/wiki/Windows_Update" target="_blank">here</a>. You can also read <a href="https://configmgr2012.blogspot.com/2010/06/windows-update-explained.html#_Toc210097879" target="_blank">this article</a>. about how Windows Updates work. You can also check out the <a href="https://techcommunity.microsoft.com/t5/windows-it-pro-blog/bg-p/Windows10Blog" target="_blank">Windows IT Pro Blog</a>.


## Supplemental Reading for Linux Update

For more information about the Linux kernel, check out the Wikipedia article <a href="https://en.wikipedia.org/wiki/Linux_kernel" target="_blank">here</a>. You can also read <a href="https://www.linux.com/learn/linux-101-updating-your-system" target="_blank">this article</a> about how Linux updates work. You can also check out this article on updating Ubuntu Linux using the command line <a href="https://www.cyberciti.biz/faq/how-do-i-update-ubuntu-linux-softwares/" target="_blank">here</a>.

## Software Packaging and File Archiving on Windows

```
PS C:\Users\Qwiklab\Documents> Compress-Archive -Path Earth,Mercury,Venus Planets.zip
```
### Installing VLC

There are alternatives to manually downloading and running installers when you need to install or manage programs on Windows. To install or remove programs, you need administrative privileges. So, open Windows Powershell by searching for it in the Windows start menu, then right-click it and select "Run as Administrator".

```
PS C:\Users\Qwiklab\Documents> $VLC_URL = "https://download.videolan.org/vlc/last/win64/"
PS C:\Users\Qwiklab\Documents> $GET_HTML = Invoke-WebRequest $VLC_URL
PS C:\Users\Qwiklab\Documents> $FILE = $GET_HTML.Links | Select-Object @{Label='href';Expression={@{$true=$_.href}[$_.href.EndsWith('win64.exe')]}} | Select-Object -ExpandProperty href
PS C:\Users\Qwiklab\Documents> $URL = ($VLC_URL+$FILE)
PS C:\Users\Qwiklab\Documents> $DOWNLOAD_DIR = "C:\users\qwiklabs\Downloads\"
PS C:\Users\Qwiklab\Documents>
PS C:\Users\Qwiklab\Documents> $OUTPUT_FILE = ($DOWNLOAD_DIR+$FILE)
PS C:\Users\Qwiklab\Documents> (new-object System.Net.WebClient).DownloadFile($URL, $OUTPUT_FILE)
PS C:\Users\Qwiklab\Documents> cmd.exe /c $OUTPUT_FILE /S
PS C:\Users\Qwiklab\Documents> Get-Package -Name *vlc*

Name                           Version          Source                           ProviderName
----                           -------          ------                           ------------
VLC media player               3.0.17.4                                          Programs


```

You can uninstall GIMP, a photo editor, using this command:
```
PS C:\Users\Qwiklab\Documents> cmd.exe /c "C:\Program Files\GIMP 2\uninst\unins000.exe" /VERYSILENT /NORESTART
PS C:\Users\Qwiklab\Documents> Get-Package
```

## Software Packaging and File Archiving on Linux

Installing Atom
```
sudo dpkg -i /home/qwiklab/downloads/atom-amd64.deb
sudo apt install -f
dpkg -s atom
```

Extracting an archive
```
sudo tar -xvf extract_me.tar
tar -cvf Planets.tar --absolute-names /home/qwiklab/documents/Earth /home/qwiklab/documents/Mercury /home/qwiklab/documents/Venus
```

Installing 7-Zip and Removing Gimp
```
sudo apt install p7zip-full
dpkg -s p7zip-full
sudo apt remove gimp
```

## Supplemental Reading for FAT32 File System

For more information about the FAT32 File System, please check out the link <a href="https://support.microsoft.com/en-us/help/154997/description-of-the-fat32-file-system" target="_blank">here</a>.

# Week 3

## Supplemental Reading for Disk Partitioning and Formatting in Windows

### Disk Partitioning and Formatting in Windows

Disk partitioning enables more efficient management of hard disk space by breaking or “slicing” up the disk storage space into partitions. This breaking allows for each partition to be managed separately by reducing inefficient use of space. DiskPart is a disk partitioning utility on the Windows operating system which uses the command line to perform operations. This reading covers the component parts that make up a drive, common DiskPart commands, and how cluster size affects your usable drive space in the Windows OS.

### DiskPart

The DiskPart command terminal helps you manage storage on your computer's drives. DiskPart utility can be used to manage partitions of hard disks including creating, deleting, merging, or expanding partitions and volumes. It can also be used to assign a file formatting system to a partition or volume. 

There are three main divisions of storage that you will find on a drive: cluster, volume, and partition. 

To use DiskPart you will need to use specific commands to select and manage the parts of your drive you need to access. For a list of common DiskPart terminal commands visit <a href="https://drive.google.com/file/d/1qDFyYB5uYLranPk9pZBz0heq0B5hmroH/view" target="_blank">this helpful guide</a>.

- **Cluster** (allocation unit size) is the minimum amount of space a file can take up in a volume or drive.
- **Volume** is a single accessible storage area with a single file system; this can be across a single disk or multiple.
- **Partition** is a logical division of a hard disk that can create unique spaces on a single drive. Generally used for allowing multiple operating systems.

The commands let you work with partitions and volumes but the base storage unit called cluster size is set when initiating the volume or partition. 

### Cluster Size

Cluster size is the smallest division of storage possible in a drive. Cluster size is important because a file will take up the entire size of the cluster regardless of how much space it actually requires in the cluster. 

For example, if the cluster size is 4kb (the default size for many formats and sizes) and the file you're trying to store is 4.1kb, that file will take up 2 clusters. This means that the drive has effectively lost 3.9 kb of space for use on a single file. 

When partitioning a disk, you should specify the cluster size based on your file sizes. If no cluster size is specified when you format a partition, a default is selected based on the size of the partition. Using defaults can result in loss of usable storage space.

It is important to remember when using DiskPart that the actions you take are permanent so be careful not to erase data accidentally.

### Key Takeaways

DiskPart is a tool that lets you manage your storage from a command line interface and is useful for a multitude of actions including creating, deleting, merging, and repairing drives.

- The three main divisions of storage that you will find on a drive are cluster, volume, and partition. 

- To use DiskPart you will need to use specific commands to select and manage the parts of your drive you need to access. 

- Cluster size is the smallest division of storage possible in a drive. Cluster size is important because a file will take up the entire size of the cluster regardless of how much space it actually requires in the cluster.


## Supplemental reading Mounting and Unmounting a Filesystem in Linux

For more information about mounting and unmounting a filesystem in Linux, you can read more about fstab <a href="https://en.wikipedia.org/wiki/Fstab" target="_blank">here</a>.

## Supplemental Reading for Windows Paging

For more information on Windows Paging, check out the link <a href="https://en.wikipedia.org/wiki/Paging#Windows_NT" target="_blank">here</a>. You can also learn how to determine the appropriate page file size for 64-bit versions of Windows <a href="https://support.microsoft.com/en-us/help/2860880/how-to-determine-the-appropriate-page-file-size-for-64-bit-versions-of" target="_blank">here</a>.


## Supplemental Reading for Linux Swap

For more information about swap, please check out the link <a href="" target="_blank">here</a>.


## Supplemental Reading on NTFS File System

For more information about the NTFS file system, please check out the following links: <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa365230(v=vs.85).aspx" target="_blank">Master File Table</a>, <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa363878(v=vs.85).aspx" target="_blank">Creating Symbolic Links</a>, and <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/aa365006(v=vs.85).aspx" target="_blank">Hard Links and Junctions</a>.

## Supplemental Reading for Windows Disk Usage

For more information about disk usage in Windows, check out the following links: <a href="https://docs.microsoft.com/en-us/sysinternals/downloads/du" target="_blank">Disk Usage</a>, <a href="https://support.microsoft.com/en-us/help/181701/how-to-start-disk-cleanup-by-using-the-command-line">How to start Disk Cleanup by using the command line</a>.






  [bps10]: https://github.com/bps10
  [gfm-api]: https://developer.github.com/v3/markdown/
  [glfm-api]: https://docs.gitlab.com/ee/api/markdown.html
  [hexatrope]: https://github.com/hexatrope
  [home]: https://github.com/revolunet/sublimetext-markdown-preview
  [hozaka]: https://github.com/hozaka
  [hadisfr]: https://github.com/hadisfr
  [issue]: https://github.com/facelessuser/MarkdownPreview/issues
  [license]: http://revolunet.mit-license.org
  [live-reload]: https://packagecontrol.io/packages/LiveReload
  [pymd]: https://github.com/Python-Markdown/markdown
  [pymdownx-docs]: http://facelessuser.github.io/pymdown-extensions/usage_notes/
  [tommi]: https://github.com/tommi
  [github-ci-image]: https://github.com/facelessuser/MarkdownPreview/workflows/build/badge.svg
  [github-ci-link]: https://github.com/facelessuser/MarkdownPreview/actions?workflow=build
  [pc-image]: https://img.shields.io/packagecontrol/dt/MarkdownPreview.svg?logo=sublime%20text&logoColor=cccccc
  [pc-link]: https://packagecontrol.io/packages/MarkdownPreview
  [license-image]: https://img.shields.io/badge/license-MIT-blue.svg


