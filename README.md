# A Front End (React & SASS) TS Library, and testing platform, trying Vite (for now...)


## Copyright Paul Kirkaas (pkirkaas@gmail.com): 17-Oct-2023 21:42

## Basics

This is supposed to be a library to contribute components and useful browser utilities - trick is to both act as library, and test/render in a browser..

A very experimental fe library using React & Vite to build the front end, and the Pk-Ts-Common library

Not sure Vite is the way to go, and things change fast, so all has to be double-checked & updated.

## Build & Test

As of 17 Oct 2023 -

Run:

```bash
 npm run clean
 npm run build
 npm run preview
 ```

 Not as it should be, for now with EACH change of .tsx, whatever, have to re-run BOTH:

```bash
 npm run build
 npm run preview
 ```

 ## Libraries/Components

 ### Styling CSSinJS

 I have both styled-components & @emotion/react - I think I like @emotion/react better, because don't have to create new components, can just create styles with the imported css function, and use them in components. DO have to do extra set up with vite, babel, etc.

