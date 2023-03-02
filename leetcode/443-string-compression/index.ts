
/*
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
*/

function compress(chars: string[]): number {
    let lastCharPos = chars.length - 1;
    let o = 0; // override position
    let count = 1;

    const outputCompression = () => {
        // output the character
        o++;

        // output any count
        if (count > 1) {
            const outputString = count.toString();

            let len = outputString.length;
            for (let j = 0; j < len; j++) {
                chars[o] = outputString[j];
                o++;
            }
        }
    }

    for (let i = 1; i <= lastCharPos; i++) {
        // match
        if (chars[i] == chars[o]) {
            count++;
            continue;
        }

        // record the character we've been tracking
        outputCompression();

        // we're seeing this character for the first time
        chars[o] = chars[i];
        count = 1;
    }

    // close out any outstanding counts
    outputCompression();

    return o;
}

/*
Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
*/
import assert from '../../util/test';

let input: string[];

input = ["a", "a", "b", "b", "c", "c", "c"];
assert(compress(input), 6);
assert(input, ["a", "2", "b", "2", "c", "3", "c"]);

input = ["a"];
assert(compress(input), 1);
assert(input, ["a"]);

input = ["a", "a", "a", "b"];
assert(compress(input), 3);
assert(input, ["a", "3", "b", 'b']);

input = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"];
assert(compress(input), 4);
assert(input, ["a", "b", "1", "2", "b", "b", "b", "b", "b", "b", "b", "b", "b"]);
