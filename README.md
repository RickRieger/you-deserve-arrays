# You Deserve Arrays — Reading Data From Arrays

[![Tests](https://github.com/RickRieger/you-deserve-arrays/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/you-deserve-arrays/actions/workflows/tests.yml)

My first **arrays** exercise at the **Code Immersives** web development bootcamp in New York City (March 2021). Six functions each take an array and pull something out of it: the first item, the last item, the item at index 3, whether the list is long, whether the first item is a number, and one character from the third string. [Jest](https://jestjs.io/) tests check each one. This repo is my fork of the assignment. My solution is in [`main.js`](main.js).

**Skills practiced:** zero-based indexes, `.length`, the "last index = length − 1" rule, `typeof`, and indexing into a string inside an array.

**Built with:** JavaScript (Node.js) and Jest 24. There's no web page; the badge above shows whether the tests currently pass on GitHub.

---

## Contents

- [My solution](#my-solution)
- [How indexes work](#how-indexes-work)
- [Run the tests](#run-the-tests)
- [How it's verified](#how-its-verified)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)
- [Original assignment (from the instructor)](#original-assignment-from-the-instructor)

---

## My solution

Written on **2021-03-01** (commits *"almost finished"* and *"updated solution"*). All 14 of the assignment's tests passed. *(Shown as it is after the 2026 cleanup; see the log below for a bug that was fixed.)*

```js
function getFirstItemFrom(array) {
  return array[0];
}

// The last index is always one less than the length
function getLastItemFrom(array) {
  return array[array.length - 1];
}

// Index 3 exists only if there are at least 4 items; otherwise fall back to the last item
function getIndex3(array) {
  if (array.length >= 4) {
    return array[3];
  } else {
    return array[array.length - 1];
  }
}

function isLongList(array) {
  return array.length >= 10;
}

function firstItemIsNumber(array) {
  return typeof array[0] === 'number';
}

// Third item is index 2; its second character is index 1
function secondCharOfThirdString(array) {
  const third = array[2];
  return third[1];
}
```

## How indexes work

Arrays count from **0**, so the first item is `array[0]`, the third is `array[2]`, and the last is `array[array.length - 1]`:

```
array:  ['hello', 'darkness', 'my', 'old', 'friend']
index:     0         1         2      3       4        length = 5, last index = 4
```

| Function | Example | Result |
|---|---|---|
| `getFirstItemFrom` | `[1, 1, 2, 3, 5, 8]` | `1` |
| `getLastItemFrom` | `[1, 1, 2, 3, 5, 8]` | `8` (index 5 = length 6 − 1) |
| `getIndex3` | `['hello', 'darkness', 'my', 'old', 'friend']` | `'old'` |
| `getIndex3` | `[1, 1, 2]` (no index 3) | `2`, the last item |
| `isLongList` | 10 or more items | `true` |
| `firstItemIsNumber` | `['1']` | `false`: `'1'` is a string, not a number |
| `secondCharOfThirdString` | `['hello', 'there', 'good', 'sir']` | `'o'`: `'good'` is index 2, and its index 1 is `'o'` |

**Strings can be indexed too.** `'good'[1]` is `'o'`, so `array[2][1]` reaches into the third item and picks its second character.

**`typeof` fun fact:** `typeof NaN` is `'number'` ("Not a Number" is technically a number in JavaScript), so `firstItemIsNumber([NaN])` returns `true`. The assignment only asks about the type, so that's expected.

## Run the tests

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/you-deserve-arrays.git
cd you-deserve-arrays
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode, as in the original assignment: re-runs on every save
```

Expected result: `Tests: 15 passed, 15 total` (the 14 original tests plus 1 added in the cleanup below).

## How it's verified

[`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs `npm run test:ci` on GitHub Actions after every push, and the badge at the top shows the result. This repo has no web page, so instead of a live site, a passing test run is how it shows it works.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-24** on the branch `cleanup-and-ci`, checked by running the tests, and merged into `master`. Each is its own commit. The original tests are unchanged.

### 1. Fixed `getIndex3` for arrays of exactly 4 items, and added a test

**Why:** the function had two separate checks: *more than* 4 items returns index 3, and *fewer than* 4 returns the last item. An array of **exactly 4** items, the smallest array that *has* an index 3, matched neither, so the function returned `undefined`. The original tests use 5-item arrays and arrays with fewer than 4, so they never tried exactly 4.

```js
// Before
function getIndex3(array){
  if (array.length > 4){        // 4 is not > 4...
    return array[3];
  }
  if (array.length < 4){        // ...and 4 is not < 4
    return array[array.length - 1]
  }
}                               // so ['a','b','c','d'] → undefined

// After
function getIndex3(array) {
  if (array.length >= 4) {
    return array[3];
  } else {
    return array[array.length - 1];
  }
}                               // ['a','b','c','d'] → 'd'
```

This is a classic **off-by-one** boundary mistake: `>` vs `>=`. Using a plain `else` for the second case also guarantees the function always returns something. I added [`index3.test.js`](index3.test.js) with 4-item arrays, and confirmed it **fails on the old code** and passes on the fix.

### 2. Removed a stray `3` and a pasted test-failure note

**Why:**
- In the instructor's *"please don't touch"* section, one closing brace had an extra character after it: `}3`. It was an accidental keystroke from my "almost finished" commit, not something the instructor wrote. JavaScript read it as a pointless statement `3;`, so it did no harm, but that section is now exactly the instructor's original again.
- A comment block copied from a failing test run (`// ✕ returns the second character of the third string in the given array`) was left above that section. That test passes, so the note was stale.

```js
// Before
if (typeof getLastItemFrom === 'undefined') {
  getLastItemFrom = undefined;
}3

// After
if (typeof getLastItemFrom === 'undefined') {
  getLastItemFrom = undefined;
}
```

### 3. Tidied `main.js`

**Why:**
- **Return the comparison directly.** `isLongList` and `firstItemIsNumber` used `if (...) { return true; } else { return false; }`. That's the same as returning the comparison itself.
- **Spacing.** `array [2]` and `third [1]` (with a space) work, but look like something different from indexing. Also `return  array[0]` had a double space, and `secondCharOfThirdString` used 4-space indentation while everything else used 2.
- **Comments.** I added short comments explaining the index arithmetic.

```js
// Before
function isLongList(array){
  if(array.length >= 10){
    return true;
  }
  else{
    return false;
  }
}

function secondCharOfThirdString(array){
    const third = array [2];
    return third [1];
}

// After
function isLongList(array) {
  return array.length >= 10;
}

// Third item is index 2; its second character is index 1
function secondCharOfThirdString(array) {
  const third = array[2];
  return third[1];
}
```

**Checked:** identical results before and after the tidy-up on 84 calls (14 different arrays × 6 functions).

### 4. Automatic test runs on GitHub

**Why:** `npm test` runs Jest in *watch mode*, which never exits, so an automated check couldn't use it. I added a run-once command and a GitHub Actions workflow.

```jsonc
// Before (package.json)
"scripts": { "test": "jest --watch-all" }

// After
"scripts": {
  "test": "jest --watch-all",   // unchanged: watch mode while working
  "test:ci": "jest --ci"        // new: run once and exit
}
```

### 5. Rewrote this README section

Added everything above. The instructor's original instructions are below, unchanged. Their challenge 6 is spelled `secondCharOThirdString` (missing an "f"), but the tests and my code use `secondCharOfThirdString`.

---

## Original assignment (from the instructor)

*The text below is the assignment README as written by the Code Immersives instructor, unchanged.*

### You Deserve Arrays

### Introduction

This is an exercise for retrieving data from an array. Arrays are awesome and you will soon love them. It's our honor to play matchmaker in this regard!


### Setup

This is a test-based challenge, similar to many we've done before, but here's the workflow again in case you've forgotten:

1. Clone and fork this repo.
2. Navigate into the directory.
3. Run `npm install`.
4. Run `jest --watch-all`.
5. Create the functions according to the specifications in `main.test.js` and this README.


### Challenges

**See `main.test.js` (or your `jest --watch-all` terminal) for full examples of expected output given certain inputs.**


1. `getFirstItemFrom`: takes in an array as a parameter and returns the first item from that array.

2. `getLastItemFrom`: takes in an array as a parameter and returns the last item from that array.

3. `getIndex3`: takes in an array as a parameter and returns the item at the 3rd index. If there are not four items (i.e., if there is no index 3), it returns the value at the last index.

4. `isLongList`: takes in an array as a parameter and returns a boolean indicating whether the array's length is at least 10.

5. `firstItemIsNumber`: takes in an array as a parameter and returns a boolean indicating whether or not the first item in the array is a number.

6. `secondCharOThirdString`: takes in an array as a parameter and returns the second character in the third item in the array. We'll assume that that third item is a string for now, but a good function would check that's true! (In the same way the previous question checked if it's a number, if you did it the easy way.)
