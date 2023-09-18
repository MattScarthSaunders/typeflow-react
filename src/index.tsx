import React, { useState, useEffect, useRef } from 'react';
import { ReactElement } from 'react';

export type CharacterMultipliers = {
  '?': number;
  '!': number;
  '.': number;
  ',': number;
  [key: string]: number;
};

export interface TypeFlowProps {
  children: ReactElement;
  charDelay?: number;
  characterMultipliers?: CharacterMultipliers;
}

/**
 * `TypeFlow` is a React component that progressively reveals its child text content,
 * simulating a typewriter effect. By default, characters are rendered sequentially
 * with a slightly variable delay between each character, but with longer charDelays for end-of-sentence char and commas.
 *
 * @param {number} props.charDelay The initial delay that the typing occurs. Default delay is 50ms.
 * @param {characterMultipliers} props.characterMultipliers Delay multiplier for a given character.
 *
 * @example
 * ```jsx
 * <TypeFlow
 *    charDelay={50}
 *    characterMultipliers={{
 *      '?': number;
 *      '!': number;
 *      '.': number;
 *      ',': number;
 * }}>
 *   <p>hello, world.</p>
 * </TypeFlow>
 * ```
 */

export const TypeFlow: React.FC<TypeFlowProps> = ({
  children,
  charDelay,
  characterMultipliers,
}) => {
  console.log('something changed');
  const [content, setContent] = useState<string>('');
  const isTyping = useRef<boolean>(false);
  const shouldCancel = useRef<boolean>(false);

  const text: string = React.Children.only(children).props.children;

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const typeCharacter = async () => {
      isTyping.current = true;
      for (let i = 0; i < text.length; i++) {
        if (shouldCancel.current) {
          shouldCancel.current = false;
          break;
        }
        setContent(currContent => (currContent += text[i])); // Set the state with the local content
        await delay(
          getcharDelayForCharacter(text[i], charDelay, characterMultipliers)
        );
      }
      if (!shouldCancel.current) {
        isTyping.current = false; // Only set to false if it wasn't canceled midway
      }
    };

    if (isTyping.current) shouldCancel.current = true; // Start by attempting to cancel any ongoing typing

    // Introduce a small delay to ensure any ongoing promises finish, then restart the typing
    delay(500).then(() => {
      setContent(''); // Clear content before starting new typing
      typeCharacter();
    });

    // return () => {
    //   shouldCancel.current = true;
    // };
  }, [text, charDelay]);

  return React.cloneElement(React.Children.only(children), {}, content);
};

const getcharDelayForCharacter = (
  char: string,
  charDelay: number = 50,
  charsTocharDelay: CharacterMultipliers = {
    '?': 8,
    '!': 8,
    '.': 6,
    ',': 4,
  }
): number => {
  const betweenOneAndTwo = Math.random() + 1;
  let randomisedCharDelay = (charsTocharDelay[char] || 1) * betweenOneAndTwo;

  if (char === ' ') {
    const zeroToThreeIsh = (Math.random() * 10) / 3;
    randomisedCharDelay =
      (charsTocharDelay[' '] || zeroToThreeIsh) * betweenOneAndTwo;
  }

  return charDelay * randomisedCharDelay;
};
