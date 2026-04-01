---
layout: post
title: "Automated Chaos Engineering"
date: 2025-04-10
tags: [git, internals, version-control]
excerpt: "Most developers use Git daily without knowing how it actually works under the hood. Let's fix that."
---

Automating Chaos Engineering is where it becomes truly powerful, we move from one-off experiments to a continuous reliability practice embedded into our delivery system.

Let’s break it down architecturally and practically

## Automated Chaos Engineering....

We’re not randomly breaking systems, We are continuously validating that our systems behave correctly under failure ( i.e automatically, not manually).

In doing so, Chaos becomes an integral part of how we build and run software: <br>
• CI/CD pipelines<br>
• Runtime operations <br>
• Observability feedback loops <br>

![fine-tune Diagram]({{ 'images/Chaos.png' | relative_url }})

## Where Chaos Becomes Automated

**1. In CI/CD Pipelines (Shift-Left Chaos)** <br>
We embed chaos into deployment pipelines. <br>
What we do: <br>
After deployment → trigger chaos experiment <br>
Validate system health automatically<br>

```bash
Example: 
Deploy → Run Chaos Test → Check SLOs → Promote / Rollback
```
Tools we use: Chaos Mesh (Kubernetes-native), Gremlin, LitmusChaos

**2. Scheduled Chaos (GameDays → Automation)** <br>
Instead of manual “GameDays”, we schedule experiments. <br>
*What we do: * <br>
Run chaos every week / day<br>
Target specific services<br>
Rotate failure scenarios<br>
```bash
Example:
Monday → kill pods
Wednesday → inject latency
Friday → simulate DB lag
```


-------------
------------
Most developers use Git daily without really knowing what's happening under the hood. Understanding Git's object model will make you a significantly better developer — you'll stop fearing rebases and actually understand what's happening when things go wrong.

## The Object Model

Git stores everything as objects in the `.git/objects` directory. There are four types:

- **Blob** — file contents
- **Tree** — directory listing (points to blobs and other trees)
- **Commit** — snapshot with metadata
- **Tag** — annotated reference to a commit

Every object is addressed by the SHA-1 hash of its content. This is why Git is content-addressable.

```bash
# Look at what a commit actually is
git cat-file -p HEAD

# Output:
# tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
# parent a1b2c3d4...
# author Jane Dev <jane@dev.com> 1710500000 +0000
# committer Jane Dev <jane@dev.com> 1710500000 +0000
#
# feat: add dark mode support
```

## A Commit Is Just a Pointer

This is the key insight that unlocks Git: **a commit is just a snapshot of a tree with some metadata and a pointer to its parent**.

When you `git commit`, Git:

1. Creates blob objects for changed files
2. Creates a tree object representing the working directory
3. Creates a commit object pointing to that tree

```bash
# See the tree a commit points to
git cat-file -p HEAD^{tree}
```

## Why This Matters

Once you understand this, scary Git operations become obvious:

- `git reset --hard HEAD~1` just moves the branch pointer back one commit
- `git rebase` creates new commit objects with the same trees but different parents
- `git cherry-pick` creates a new commit object by applying a diff

The data is almost never actually deleted — it lives in the object store until garbage collected.

## Practical Takeaway

Next time something goes wrong with Git, remember: commits are immutable, branches are just pointers, and the object store is your safety net. `git reflog` shows you every pointer movement — you can always get back to where you were.

```bash
# See all recent HEAD positions
git reflog

# Recover from a bad reset
git reset --hard HEAD@{2}
```

Understanding Git as a content-addressable object store changes how you think about version control entirely. It's one of the most elegant data structures in software engineering.
