/*
Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.
*/

function canConstruct(ransomNote: string, magazine: string): boolean {
    const index: { [k: string]: number } = {};
    let i: number, character: string;
    for (i = 0; i < magazine.length; i++) {
        character = magazine[i];
        if (index[character] === undefined) {
            index[character] = 1;
        }
        else {
            index[character]++;
        }
    }
    console.log("dict?", index);
    for (i = 0; i < ransomNote.length; i++) {
        character = ransomNote[i];
        if (index[character] >= 1) {
            index[character]--;
        }
        else {
            return false;
        }
    }
    return true;
};

import assert from '../../util/test';

assert(canConstruct("a", "aaaaa"), true);
assert(canConstruct("a", "bbbbb"), false);
assert(canConstruct("a", "bbbbba"), true);
assert(canConstruct("aa", "bbbbba"), false);