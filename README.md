# Welcome to PitchPipe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

PitchPipe is a simple React application that helps owners of any musical instrument 
(primarily stringed instruments as configured) to keep their babies in tune. I created
this app as a way to learn a couple things - React, and ToneJS, an open source 
sound-generation JavaScript library.

If you have a house full of instruments, host this app somewhere and you'll never have
to guess at an A440 again.

## Simple Customization Tips

This app is very extensible, should you wish to set it up for different instruments.

### Adding and Removing Instruments

I have set up this app to produce open-string tones for Guitar, Mandolin and 
Octave Mandolin, but it's easy to add new instruments, and to remove those
already here.

* Instrument configuration is in the constructor of class App, located near 
the bottom of index.js. The `instrumentData` map correlates instrument names 
with instrument data objects. You may add new  entries to this map, or remove 
existing entries, as your heart desires.

* The instrument data object for each instrument contains two properties:
   * `samplesUrl`: the name of a directory within public/samples/ in this code base,
   where the sample files for this instrument exist. Note that currently only .mp3
   files are supported.
   * `notes`: an array of octave-specific notes that are to appear on the keyboard
   when this instrument is rendered. If `samplesUrl` is anything other than 'default',
   the app will look for MP3 files in the given directory name, and will assume
   that there is one file for each note in the `notes` array. If you don't have
   samples for an instrument, specify 'default' as the samplesUrl, and you'll get
   guitar sounds for that instrument. 

* Note that just below the building of the `instrumentData` map, you'll see the following:
`this.state = {instruments: instrumentData, selectedInstrument: "Guitar"};`
This line of code tucks away the instruments just built, but also sets a default
selected instrument (Guitar), which will render when a user first comes to the site.
If you remove Guitar from the instrument map, you'll have to select a different 
default instrument as the value for `selectedInstrument` in this line of code.


### A Note (ahem) on Rendering
The CSS in this app is currently quite basic. If you plan to expand the number of instruments 
significantly, or create an instrument that has more than 10 or so notes, you'll 
probably not like what you see in terms of visualization. Work is ongoing, and I'll
be expanding the app's ability to gracefully accommodate more instruments / notes.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

