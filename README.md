# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Deviations from design](#deviations-from-design)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Solution page on Frontend Mentor](https://www.frontendmentor.io/solutions/solution-using-typescript-react-and-tailwind-css-BXiVqSwHEW)
- Live Site URL: [GitHub Pages](https://danayatsuta.github.io/fm-weather-app/)

## My process

### Built with

Primary tools:

- [React](https://react.dev/)
- [ahooks](https://ahooks.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

Code quality:

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [The W3C Markup Validation Service](https://validator.w3.org/)

### What I learned

This is my first project on React, so needless to say, I learned a lot! Although, of course, a lot of concepts are similar to Vue, which definitely helped.

Throughout development, I used basic React stuff: useState, props, event handlers, etc. Most of it works similarly to Vue, but there was one area that React handles quite differently, and I needed some time to adjust: handling children components' events. Instead of emitting and listening to events, React calls for passing event handler functions from parent to children as props. Before I grasped the concept better, my code for event handling was quite verbose and ugly, but hopefully it's alright now.

I've also initially used useEffect for data fetching and closing dropdowns when clicking outside of them, but later on replaced both with hooks from the ahooks library. Even though the project doesn't use useEffect directly anymore, I want to hope I grasped the essence of useEffect and when I should use it and how to not break everything with them. At least partially. Hopefully.

While perusing documentation and materials on React, I've also learned about useMemo, which you were supposed to use to optimize heavy calculations and children rendering by only performing them when their dependencies changed, which you needed to specify. Apparently none of this is relevant anymore with the release of React Compiler, which just so happened to occur three weeks before I started learning React and does all the aforementioned stuff automatically, so that's quite fortunate.

That said, the React project template from Vite doesn't enable it initially for performance reasons. I configured Vite to use React Compiler, but only for building, so I could still utilize oxc's faster build times in development.

### Deviations from design

I made a couple small deviations from Frontend Mentor's design in places where I thought it would make more sense:

- Instead of the "no results" screen that replaces most of the content, if a search query provided no results, there will just be a "no results" item where search results would usually be;
- Search results show additional information on the right side - the country and the administrative area;
- Weekdays in the hourly forecast weekday dropdown do not start with Monday, but rather with the current weekday.
- Search button is removed, since search is performed on typing

### Continued development

I want to revisit this project some time later and refactor/clean up code. I would do it now, but I've been looking at this code for so long, I am probably numb to its many imperfections. Looking at it with a fresh pair of eyes will work out better, I think.

### Useful resources

- [React documentation](https://react.dev/) - Duh. It is great documentation, though; it explains React concepts very clearly and concisely.

## Author

- Frontend Mentor - [@danaYatsuta](https://www.frontendmentor.io/profile/danaYatsuta)

## Acknowledgments

I used the dot loader animation from the ["Single Element Loaders: The Dots" article on CSS-Tricks](https://css-tricks.com/single-element-loaders-the-dots/) by [Temani Afif](https://css-tricks.com/author/afiftemani/) with virtually no changes; geometry isn't my strong suit. Thanks!
