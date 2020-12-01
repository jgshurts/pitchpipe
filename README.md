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

* Instrument configuration is in the constructor of class App, located near the bottom of index.js.
The `instrumentData` map correlates instrument names with sets of notes. You may add new 
entries to this map, or remove existing entries, as your heart desires.

* Note that just below the building of the `instrumentData` map, you'll see the following:
`this.state = {instruments: instrumentData, selectedInstrument: "Guitar"};`
This line of code tucks away the instruments just built, but also sets a default
selected instrument (Guitar), which will render when a user first comes to the site.
If you remove Guitar from the instrument map, you'll have to select a different 
default instrument as the value for `selectedInstrument` in this line of code.

### Wait - everything sounds like a guitar!
Yes, currently it does. Specifically, my 1996 Santa Cruz OM-PW. There is a dearth
of quality, free-of-charge instrument samples on the web, so I recorded these
myself. I'll be adding new samples soon (yes, I have a mandolin and an octave 
mandolin). It's relatively easy to add new samples yourself, should you want
to do that.

In index.js, in the `handleClick()` method of `class Keyboard`, we configure an
instance of ToneJS's `Tone.Sampler` class. If you've ever played around with a 
synthesizer that supports sampling, you'll get what this thing does. You feed it
a set of samples (recordings of anything), and tell it which "notes" (think keys
on a keyboard) the samples correspond to. I recorded all the open strings on the
guitar and mapped those.

```
    handleClick(note) {
        const sampler = new Tone.Sampler({
            urls: {
                "E2": "E2.mp3",
                "A2": "A2.mp3",
                "D3": "D3.mp3",
                "G3": "G3.mp3",
                "B3": "B3.mp3",
                "E4": "E4.mp3",
            },
            release: 1,
            baseUrl: "http://localhost:3000/samples/guitar/",
        }).toDestination();

        this.setState( {synth: sampler});

        Tone.loaded().then(() => {
            this.state.synth.triggerAttackRelease(note, 4);
            this.state.synth.context.resume();
        })
    }
```

Here's the cool bit about Tone.Sampler: you can tell it to play other notes - notes
for which you haven't fed it a sample - and it'll pick what it figures is the closest
sample you've provided, and will raise or lower the pitch accordingly. Cool, ain't it?

Notice the `baseUrl` parameter in the code above. This is how we tell ToneJS where
we've stored the samples. The MP3 files are in this code base, in public/instruments/guitars.
If you add more samples, you'll probably want to have one instrument folder for
each instrument sampled, and you'll have to tweak the above code so it can find them all.
Addition of new instruments is on my dev backlog, so I'll have a better pattern
set up shortly. 


### A Note on Rendering
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

