# typeflow-react

This package contains a single component 'TypeFlow' which aims to provide a wrapper for any given HTML element that has text within it. It takes the text and applies a typing effect to it. It has some configuration for the speed of the effect, as well as the ability to control pauses for individual characters (i.e punctuation).

There is some variable delay on the effect for every character, with more randomisation on spaces and longer delays on puctuation.

## To see it running

- Clone the repo
- run the following in terminal:

```
cd example
npm i
npm start
```

- open your browser with the designated localhost port, usually `localhost:1234` in this instance.

## To build the package locally

Make sure you are in the root of the repo, then run:

```
npm i
npm run build
```

Or you can run it in watch mode if you want to build on the fly with `npm start`. This will rebuild the package every time you save the relevant file in `src`.

### More info

This package was built using tsdx, it's designed for use with react and typescript.
