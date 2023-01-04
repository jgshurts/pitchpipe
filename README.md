# Welcome to PitchPipe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

PitchPipe is a simple React application that helps owners of any musical instrument 
(primarily stringed instruments as configured) to keep their babies in tune. I created
this app as a way to learn a couple things - React.JS, and ToneJS, an open source 
JavaScript library used to generate synthetic tones or play back sampled music at specified
pitches. This app uses the latter feature, playing tones I recorded from a guitar and
a mandolin.

If you have a house full of instruments, host this app somewhere and you'll never have
to go hunting for your electronic tuner again. Or, if my instrument configuration suits you,
it's currently running at [https://www.jeffshurts.me](https://www.jeffshurts.me).

## Simple Customization Tips

This app is very extensible, should you wish to set it up for different instruments.

### Adding and Removing Instruments

I have set up this app to produce open-string tones for Guitar, Mandolin and 
Octave Mandolin, but it's easy to add new instruments, or change the tones
they play, and to remove instruments if you don't need them.

* Instrument configuration data is in instrumentData.json. This JSON construct
  is a collection of instrumentSets. Each instrumentSet is a collection of 
  instruments. This two-level hierarchy lets you organize the user interface into
  groups (sets) of logically related instruments. The config included has sets
  for Guitars, Mandolin Family and Other. If you're more of a symphonic person,
  you might use Brass, Woodwinds and Strings (and a different set of sampled tones,
  but that's a topic for later).

* Each entry in `instruments` within an `instrumentSet` defines an instrument you'll
  be tuning using this application. `name` is directly rendered in the user interface
  in the instrument selection area of the UI. `instrument` is a small data structure
  that lets you specify two important values which control the behavior of the
  instrument:
   * `sampleSet`: the name of a sample set, which is a pointer to an entry in
   the `sampleSets` JSON object in sampleSets.JSON. The `sampleSets` data structure
   tells this application about any sets of tones (samples from an instrument) you
   have either purchased, recorded yourself (as I did), or borrowed from a friend. 
   The tone notation in this data structure is metadata that lets the app know
   which specific tones you have sampled (you should have an MP3 file for each item
   in `sampledNotes`), with the note as the file name (C2.mp3, A4.mp3, etc.)

   * `notes`, which tells the app what notes to render in the UI when a given
   instrument has been selected, and to play when you click on a key representing
   that note.
    
*  To explain a bit further, the `notes` collection in an instrument defines
   the set of tones that will render in the UI for the currently-selected instrument,
   and play when you click on a note. The `sampledNotes` collection in a sampleSet 
   has nothing to do with the UI - it tells the app which tones are available to read 
   from the file system (or AWS S3, as currently set up). 
   Why aren't sampled notes and playback notes the same, 
   you ask? How can an instrument play back tones that aren't exactly what's been sampled? This is the magic of ToneJS.
   Remember that scene in Ferris Bueller's Day Off when he fakes sick by playing
   sampled coughs and sneezes on a keyboard? ToneJS is doing the same thing. If you
   don't mind slightly artificial-sounding sounds, you can get by with a single 
   `sampledNote` - ToneJS knows how to speed up or slow down the frequency at playback
   time to generate the note requested, using the note you sampled (recorded). In this 
   default configuration, I sampled a standard mandolin (my lovely Weber Bitterroot), 
   but use those same sampled notes to play back in much lower tunings 
   (mandola, octave mandolin). The really cool thing with ToneJS is that it 
   automatically selects a sample that is closest in pitch to the requested
   playback note - so the more notes you sample, the better it will sound - no code
   changes required. 

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

