// pg 90

// Sets dont allow duplicates
// function containsDuplicate(nums: number[]): boolean {
//     const set = new Set<number>(nums);
//     return (set.size < nums.length);
// };
export const stringHasUnique = (str: string) => {
  let unique = true;

  for (let i = 0; i < str.length; i++) {
    const lastIndex = str.lastIndexOf(str[i]);

    if (i !== lastIndex) {
      unique = false;
    }
  }

  return unique;
};

export const isPermutation = (s1: string, s2: string) => {
  if (s2.includes(s1)) {
    return true;
  }

  const truthArray = [];
  const s1Sorted = s1.split("").sort().join("");

  for (let i = 0; i < s2.length; i++) {
    const upperBound = i + s1.length;

    if (upperBound > s2.length) {
      i = s2.length - 1;
    }
    const ss = s2.substring(i, upperBound).split("").sort().join("");

    truthArray.push(ss === s1Sorted);
  }
  return truthArray.includes(true);
};

export const urlify = (str: string) => {
  return str.split(" ").join("$");
};

export const palindromeCheck = (str: string) => {
  const reversed: string[] = [];

  str
    .replace(/\s/g, "")
    .split("")
    .forEach((letter) => reversed.unshift(letter));

  return reversed.join("") === str.split(" ").join("");
};

export const oneAway = (s1: string, s2: string) => {
  if (s2.length >= s1.length + 2) {
    return false;
  }

  let miss = 0;

  // pale
  // ple

  //bale
  //pale

  //ple
  //pale
  const s1Split = s1.split("");
  const s2Split = s2.split("");

  let j = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1Split[i] !== s2Split[j]) {
      miss++;

      if (s1Split[i + 1] && s1Split[i + 1] === s2Split[j]) {
        i++;
      } else if (s2Split[j + 1] && s2Split[j + 1] === s1Split[i]) {
        j++;
      }
    }

    j++;
  }

  return miss <= 1;
};

export const compress = (str: string) => {
  const counts: string[] = [];

  //aabcccccaaa

  let i = 0;
  let letterCount = 0;
  let letter = "";

  while (i <= str.length) {
    const current = str.split("")[i];

    if (letter === current) {
      letterCount++;
    } else {
      if (i !== 0) {
        counts.push(`${letter}${letterCount}`);
      }
      letter = current;
      letterCount = 1;
    }

    i++;
  }

  return counts.join("").length > str.length ? str : counts.join("");
};
<<<<<<< HEAD
=======

export const mergeSorted = (
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
) => {
  if (m === 0) {
    return nums2;
  } else if ((n = 0)) {
    return nums1;
  }

  //[1,2,3,0,0,0]
  //[2,5,6]
  let counter = 0;
  while (nums2.length) {
    const num1 = nums1[counter];
    const num2 = nums2[0];

    if (num2 < num1 || num1 === 0) {
      if (counter > 0) {
        nums1 = [...nums1.slice(0, counter), num2, ...nums1.slice(counter)];
        nums1.pop();
        nums2.shift();
      }
    }
    counter++;
  }

  return nums1;
};
>>>>>>> 3f10e8b60a0eb562eca2fe093620f14d01992431
