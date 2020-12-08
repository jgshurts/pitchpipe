const fs = require('fs')
const instrumentData = require("./instrumentData.json");
const sampleSetData = require("./sampleSets.json");

class AppConfig {

    getInstrumentData(jsonInstrumentsData) {
        let instrumentSetsMap = new Map();
        jsonInstrumentsData.instrumentSets.forEach(function(instrumentSet) {
            let instrumentsMap = new Map();
            instrumentSet.instruments.forEach(function(instrument) {
                instrumentsMap.set(instrument.name, instrument.instrument);
            })
            instrumentSetsMap.set(instrumentSet.name, {defaultInstrument: instrumentSet.defaultInstrument, instruments: instrumentsMap})
        })
        return instrumentSetsMap;
    }

    getProductionInstrumentData() {
        return this.getInstrumentData(instrumentData);
    }

    getSampleSetData(jsonSampleSetData) {
        let sampleSetsMap = new Map();
        jsonSampleSetData.sampleSets.forEach(function(sampleSet) {
            sampleSetsMap.set(sampleSet.name, {sampledNotes: sampleSet.sampledNotes});
        })
        return sampleSetsMap;
    }

    getProductionSampleSetData() {
        return this.getSampleSetData(sampleSetData);
    }
}

module.exports = AppConfig