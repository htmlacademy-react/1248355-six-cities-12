const makeFirstLetterUpperCase = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const getRandomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

const createRandomElementsArray = <T>(elements: T[], length: number = elements.length) => {
  const newElements = [...elements];

  for (let i = 0; i < Math.min(newElements.length, length); i++) {
    const randomIndex = getRandomNumber(i, newElements.length - 1);

    [newElements[i], newElements[randomIndex]] = [newElements[randomIndex], newElements[i]];
  }

  return length === newElements.length ? newElements : newElements.slice(0, Math.min(length, newElements.length));
};

export { makeFirstLetterUpperCase, createRandomElementsArray };
