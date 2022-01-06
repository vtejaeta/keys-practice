// options: includeCaptials, include spaces, include numbers, include special characters

type TextOptions = {
  includeCapitals: boolean;
  includeSpaces: boolean;
  includeNumbers: boolean;
};

type mainStringArrayType = [string[], string[], number[]];

// Final correct version
function finalCorrectVersion(
  keyPreferences: string[],
  options: TextOptions
): mainStringArrayType {
  let smallKeys: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  let capitalKeys: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let numberKeys: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  // Array with all default small, capital and number keys
  let mainArrayToGenerateString: mainStringArrayType = [
    smallKeys,
    capitalKeys,
    numberKeys,
  ];

  // Generate array with all 26 characters & 10 numbers
  if (keyPreferences.length == 0) {
    return mainArrayToGenerateString;
  }

  // Extract only alphabets from keyPreferences
  let onlystringCharacters: string[] = keyPreferences.filter((key) => {
    // it will be NaN, if key is alphabet
    let coercedNumber = Number(key);

    // If key is an alphabet, below condition will return true
    return Number.isNaN(coercedNumber);
  });

  // Extract only numbers from keyPreferences
  let onlyNumbers: string[] = keyPreferences.filter(
    (key) => !onlystringCharacters.includes(key)
  );

  // Seperate out lowercase and uppercase characters and numbers
  smallKeys = onlystringCharacters.filter((key) => key == key.toLowerCase());
  capitalKeys = onlystringCharacters.filter((key) => key == key.toUpperCase());
  numberKeys =
    onlyNumbers.length > 0 ? onlyNumbers.map((key) => Number(key)) : numberKeys;

  if (options.includeCapitals == false) {
    capitalKeys = [];
  }

  if (options.includeNumbers == false) {
    numberKeys = [];
  }

  mainArrayToGenerateString = [smallKeys, capitalKeys, numberKeys];

  return mainArrayToGenerateString;
}

console.log(
  finalCorrectVersion([], {
    includeCapitals: true,
    includeNumbers: true,
    includeSpaces: true,
  })
);

export function getTextForTyping(
  keyPreferences: string[],
  length = 250,
  options: TextOptions
): string {
  let arrayOfStringsNumbers = finalCorrectVersion(keyPreferences, options);

  let [smallKeys, capitalKeys, numberKeys] = arrayOfStringsNumbers;

  let capitalKeysCount = capitalKeys.length,
    numberKeysCount = numberKeys.length;

  let mergedArray: (string | number)[] = [];

  if (options.includeCapitals && capitalKeysCount > 0) {
    mergedArray = mergedArray.concat(capitalKeys);
  }

  if (options.includeNumbers && numberKeysCount > 0) {
    mergedArray = mergedArray.concat(numberKeys);
  }

  mergedArray = mergedArray.concat(smallKeys);

  return generateTextFromInputArray(mergedArray, length, options.includeSpaces);
}

function generateTextFromInputArray(
  keyPreferences: (string | number)[] = [],
  length: number = 250,
  includeSpaces: boolean = true
) {
  let newString = "";
  for (let i = 0; i < length; i++) {
    newString +=
      keyPreferences.length > 0
        ? keyPreferences[Math.floor(Math.random() * keyPreferences.length)]
        : "";
    if (
      includeSpaces &&
      i % Math.floor(Math.random() * 4) === 0 &&
      i - newString.lastIndexOf(" ") > 2
    ) {
      newString += " ";
    }
  }
  return newString;
}
