# `Eslint` Eslint extention configuration 
## Install Eslint via VSCode Extentions
Press ctrl + shift + P and search settings.json to modify
```
if we have any eslint file conflict
please run this command npm install --legacy-peer-deps
following this format
```

{
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "[php]": {
    "editor.defaultFormatter": "bmewburn.vscode-intelephense-client"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "git.autofetch": true,
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "editor.minimap.enabled": false,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "react", "typescript"],
  "window.zoomLevel": -1,
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.alwaysShowStatus": true,
  "eslint.debug": true,
  "eslint.lintTask.enable": true,
  "eslint.format.enable": true
}
```

After complete this stage => we should disble "Editor: Format On Save" existing in VSCode setting, because ESLint will do this part instead of VSCode internal format

# `src` Subordinate module configuration 

```
src/
├── api        API handlers
├── assets     Images, Svg files
├── components React UI components
├── hooks      React custom hooks
├── modules    React useReducer
├── types      Type defination
└── utilities  Function handlers
```


# About #api
 * Api handlers such as HTTP methods working with Axios created and exported here
# Assets SVG + Images handler

* If there is a change in Icon, Logo, etc., add a file under `/ src / assets` and convert it to React component with the following command.
   --In the case of Icon
     `yarn svgr: icon`
   --For Logo
     `yarn svgr: logo`

# Component classification

* atoms
  * Minimum unit component
  * Reusable components
  * Do not use other components
  * In principle, do not have a margin that affects other components
* molecules
  * Components that combines atoms
  * Reusable components
  * atoms can be used
* organismos
  * A component with one meaning created by combining lower layers (atoms, molecules)
* templates
  * Components to be placed in combination with organism os
* pages
  * Units routed by react-router

# About #types
 * Typescript defination created here
 * Create typescript files with .ts instead of .tsx

# About #utilities
 * Containing defined functions returning value when they called


# Rules
NAMING CONVENTIONS
1. file extension
 * We are using typescript, so the file extension will be ts and tsx
 * Use .tsx for file return React Element (HTML Elements) and .ts for file return value 

2. Use Pascal Case for Component’s names
 ```
 Header.tsx
 Login.tsx
 PrivateRoute.tsx
 ListItem.tsx
 ```
3. Use Camel Case for Non-components
```
  fetchData.ts
  useUser.ts => for hook file
```

4. Attribute name, inline-styles and variable names should be in camel case:
```
onClick
className
<div style={{fontSize: 25}}></div>
const userDataList = []
const handleOnchange = (e) => {}
```

BUG AVOIDANCE
1. Check validity and set default value for every data fetching from server
2. Always use typescript for safety, in some cases we can use :any type to bypass the check if it pretty hard and wasting time to define
3. Avoid mutating state when working with Object or Array


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
