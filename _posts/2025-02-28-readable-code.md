---
layout: post
title: "Writing Readable Code Is a Moral Obligation"
date: 2025-02-28
tags: [craft, clean-code, teams]
excerpt: "Code is written once and read many times. Optimizing for the reader isn't idealism — it's professionalism."
---

Code is written once and read many times. By you at 3am debugging a production incident. By your colleague six months from now trying to add a feature. By the person who inherits this codebase after you leave.

Optimizing for the reader isn't idealism — it's professionalism.

## Clarity Over Cleverness

The most dangerous kind of code is the kind that makes the author feel smart. A one-liner using reduce and bitwise operators might impress in a code review, but it will cost your team hours when something breaks.

```python
# Clever — don't do this
result = reduce(lambda a, b: a | (b << i), values, 0)

# Readable — do this
def combine_flags(values):
    result = 0
    for i, value in enumerate(values):
        result |= (value << i)
    return result
```

The second version is longer. It's also immediately understandable.

## Name Things What They Are

Variable names are documentation. Single-letter variables, except in tiny scopes, are acts of aggression against your future self.

```javascript
// What is d? What is u? What is r?
const d = new Date();
const u = getUser(id);
const r = u.roles.includes('admin');

// Immediately clear
const today = new Date();
const currentUser = getUser(id);
const isAdmin = currentUser.roles.includes('admin');
```

## Extract Until It Reads Like English

If you need a comment to explain what a block of code does, that block should be a function with a descriptive name instead.

```python
# Before: comment required
# Check if user can access premium content
if user.subscription_tier >= 2 and not user.payment_overdue and user.email_verified:
    show_premium_content()

# After: self-documenting
if user_has_premium_access(user):
    show_premium_content()
```

## The Test: Can a Tired Person Read This?

When you review your code before committing, ask yourself: could someone read this at midnight during an outage and understand it in under 30 seconds?

If yes, ship it. If no, clean it up.

This isn't about being pedantic. It's about respecting the next person — who might be you.
