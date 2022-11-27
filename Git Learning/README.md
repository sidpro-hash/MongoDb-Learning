# Git Learning

Git has three main states that your files can reside in: modified,staged, and committed:
- Modified means that you have changed the file but have not committed it to your database yet.
- Staged means that you have marked a modified file in its current version to go into your next
commit snapshot.
- Committed means that the data is safely stored in your local database.

![Worling Tree](./Working%20Tree.PNG)

## Git config

Check Git Version:
```
$ git --version
```
The first thing you should do when you install Git is to set your user name and email address:
```
$ git config --global user.name "Siddharth Gabu"
$ git config --global user.email "siddharthgabu@example.com"
```
If you want to check your configuration settings:
```
$ git config --list
```
You can view all of your settings and where they are coming from using:
```
$ git config --list --show-origin
```
The main tool you use to determine which files are in which state is the *git status* command.
```
$ git status
# git status -s
```
If the <code>git status</code> command is too vague for you. you want to know exactly what you changed, not
just which files were changed. you can use the git diff command:
<code>git diff</code> shows you the
exact lines added and removed — the patch, as it were.
<code>git diff --cached</code> to see what you’ve staged so far (<code>--staged</code> and <code>--cached</code> are synonyms).


## Basic Commands

If you have a project directory that is currently not under version control and you want to start
controlling it with Git, you first need to go to that project’s directory.
```
$ git init
```
To begin tracking a new file or staging files, you use the command:
```
$ git add FILENAME
# some alternatives
# git add --all
# git add -A
# git add .
$ git commit -m "First commit"
```
After files are staged and will go into your next commit. At this point, suppose you remember one
little change that you want to make in README.md before you commit it. You open it again and
make that change, and you’re ready to commit.

Git stages a file exactly as it is when you run the <code>git add</code> command. If you commit
now, the version of **README.md** as it was when you last ran the <code>git add</code> command is how it will
go into the commit, not the version of the file as it looks in your working directory when you run
<code>git commit</code>. If you modify a file after you run <code>git add</code>, you have to run <code>git add</code> again to stage the
latest version of the file.

Now that your staging area is set up the way you want it, you can commit your changes.
```
$ git commit
```


Another useful thing you may want to do is to keep the file in your working tree but remove it from
your staging area. 

In other words, you may want to keep the file on your hard drive but not have
Git track it anymore. This is particularly useful if you forgot to add something to your **.gitignore**
file and accidentally staged it, like a large log file or a bunch of .a compiled files. To do this, use the
<code>--cached</code> option.
```
$ git rm --cached FILENAME
# git rm log/\*.log
```
Note the backslash (\\) in front of the *. This is necessary because Git does its own filename expansion in addition to your shell’s filename expansion. This command removes all files that have the <code>.log</code> extension in the <code>log/</code> directory. Or, you can do something like this:
```
$ git rm \*~
```
Viewing the Commit History
```
$ git log
```

## Undoing Things

One of the common undos takes place when you commit too early and possibly forget to add some
files, or you mess up your commit message. If you want to redo that commit, make the additional
changes you forgot, stage them, and commit again using the <code>--amend</code> option

As an example, if you commit and then realize you forgot to stage the changes in a file you wanted to add to this commit, you can do something like this:
```
$ git commit -m 'Initial commit'
$ git add forgotten_file
$ git commit --amend
# git commit -am 'New commit message'
# git commit --amend --no-edit
```

*It’s important to understand that when you’re amending your last commit, you’re
not so much fixing it as **replacing** it entirely with a new, improved commit that
pushes the old commit out of the way and puts the new commit in its place.
Effectively, it’s as if the previous commit never happened, and it won’t show up in
your repository history*.


### Unstaging a Staged File

let’s say you’ve changed two files and
want to commit them as two separate changes, but you accidentally type <code>git add *</code> and stage them
both. How can you unstage one of the two? The <code>git status</code> command reminds you:
```
$ git add *
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md

$ git restore --staged README.md
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```
## Retore deleted files
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    Working Tree.PNG

no changes added to commit (use "git add" and/or "git commit -a")
$ git restore "Working Tree.PNG"
$ git status
On branch master
nothing to commit, working tree clean
```

### use git reset to rewind the commit

it won't delete your changes but move changes to modified stage.

```
$ git log --oneline
fa19655 (HEAD -> master) new changes
3d932a0 second commit
fd2e333 initial commit
$ git reset 3d932a0
Unstaged changes after reset:
M       README.md
```

where git hard reset will delete the changes.
```
$ git reset --hard 3d932a0
```

## Branches

### Git Flow
- Feature/Fix branch
- Make changes
- merge to master
- Delete old branch

### List all branch
```
$ git branch
```

### Copying branch from current branch
```
$ git switch -c NAME
# git checkout -b NAME
```

### Merging branch into current branch
```
$ git merge NAME
```
### Merge Conflict

 Conflicts happen when you're merging two branches but you or somebody else has made changes to the same items in a file. So for example, we can have a main branch and then do a commit on that main branch. And then two different people can create different features. For example, we can have another user create a different fix for our project, and then merge that back into the main branch. Now, in addition to that, we could be working on our own feature branch and create a fix on our project, and then merge that back into the project, but if another fix has been made before then, that tends to cause merge conflicts. 

![Merge conflict](./Merge%20conflict.PNG)


### Deleting branch
```
$ git branch --delete NAME
# git branch -d NAME
# git branch -D NAME
```

## Stashing code

Stashing is a way of putting away code temporarily so that you can work on something else. This is the perfect thing to use when maybe your boss comes in and tells you that he needs a super important change, but you were already working on some new changes on the current branch that you were into. You essentially want to restore everything, but you want to not lose any of the changes that you've made. And this is what it looks like. You do a git stash and it will take whatever the changes were and temporarily put them in a storage facility say, and then you can take a look at what's been stored by using git stash list.

```
$ git stash 
# git stash list
# git stash apply
# git stash pop
```

```
$ git stash
Saved working directory and index state WIP on master: 8b33aed added merge conflict
$ git stash list
stash@{0}: WIP on master: 8b33aed added merge conflict
$ git stash apply 0
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

## Git clean

git clean command is pretty simple, it lets you remove all un track files and directories from your branch super quickly. It's a nice way of removing like old files that you don't need anymore, and this is how you use it.

```
git clean -n # dry run
git clean -d # directories
git clean -f # force
```

# Github

## Remotes

you need to post your repo, and a very common name for the remote that you're using is origin. So you may see that you're pushing to origin and you're assigning that URL to the origin name so that you don't have to remember the URL, which can be pretty long. You can add as many remote locations, which means that you can push your work to multiple places if you want to. So you can add more than one remote, and that's sometimes useful if you need to push to a backup file somewhere else, as well as the remote where your items are hosted. 

git remote add NAME URL
```
$ git remote add origin https://github.com/sidpro-hash/MongoDb-Learning.git
```

```
# git remote remove NAME
# git rename OLDNAME NEWNAME
# git remote -v
```