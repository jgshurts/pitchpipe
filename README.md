# Welcome to PitchPipe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

PitchPipe is a simple React application that helps owners of any musical instrument 
(primarily stringed instruments as configured) to keep their babies in tune. I created
this app as a way to learn a couple things - React, and ToneJS, an open source 
sound-generation JavaScript library.

If you have a house full of instruments, host this app somewhere and you'll never have
to go hunting for your electronic tuner again. Or, if my instrument configuration suits you,
it's currently running at [https://www.jeffshurts.me](https://www.jeffshurts.me).

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
   * `sampleSet`: the name of a sample set, which is a directory containing MP3
   files with individual sampled notes. The notes in the sample set may not
   correspond to the notes we'll play for an instrument; this allows us to "borrow"
   a sample set for an instrument that hasn't yet been sampled. As currently
   configured, for example, Ukulele borrows the 'guitar' sample set, while Mandola
   and Octave Mandolin borrow the 'mandolin' sample set. In this way, we can give
   instruments a voice that is _similar_ to the actual instrument, until we have
   time to record it (or the money to buy one). This borrowing of samples works because
   of the magic of Tone.Sampler, which will automatically pitch-shift an existing
   sample (MP3 file) so that it plays a different note. It chooses a sample that is
   closest to the note that is to be played, so the resulting tone doesn't sound
   weird. 
   * `notes`: an array of octave-specific notes that are to appear on the keyboard
   when this instrument is rendered. If `samplesUrl` is anything other than 'default',
   the app will look for MP3 files in the given directory name, and will assume
   that there is one file for each note in the `notes` array. If you don't have
   samples for an instrument, specify 'default' as the samplesUrl, and you'll get
   guitar sounds for that instrument. 

* A recent addition is the ability to define sample sets (MP3 files used to generate sound)
independently of instruments. There is now a `sampleSets` map in the `App` class. The key
is the sample set name, which must be identical (including case) to the directory in which the
sample files for the sample set are located. The values in this map are objects, currently
with just one property:
   * `sampledNotes`: An array of note names, which must correspond exactly to the MP3 file names
   found in the sample set directory. This information is needed to configure a Tone.Sampler
   properly.

