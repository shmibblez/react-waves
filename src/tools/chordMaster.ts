/** variables generated with following js code:


// string copied from https://muted.io/note-frequencies/
const s = `16.35	32.7	65.41	130.81	261.63	523.25	1046.5	2093	4186
17.32	34.65	69.3	138.59	277.18	554.37	1108.73	2217.46	4434.92
18.35	36.71	73.42	146.83	293.66	587.33	1174.66	2349.32	4698.63
19.45	38.89	77.78	155.56	311.13	622.25	1244.51	2489	4978
20.6	41.2	82.41	164.81	329.63	659.25	1318.51	2637	5274
21.83	43.65	87.31	174.61	349.23	698.46	1396.91	2793.83	5587.65
23.12	46.25	92.5	185	369.99	739.99	1479.98	2959.96	5919.91
24.5	49	98	196	392	783.99	1567.98	3135.96	6271.93
25.96	51.91	103.83	207.65	415.3	830.61	1661.22	3322.44	6644.88
27.5	55	110	220	440	880	1760	3520	7040
29.14	58.27	116.54	233.08	466.16	932.33	1864.66	3729.31	7458.62
30.87	61.74	123.47	246.94	493.88	987.77	1975.53	3951
7902.13`
const n = ["C",["C#","Db"],"D",["D#","Eb"],"E","F",["F#","Gb"], "G", ["G#","Ab"],"A",["A#","Bb"],"B"]
const notes = []
const sharps = []
const flats = []
const a = s.replace(/[^0-9.]/g, " ").split(" ")
const freqToNote = {}
const t = []
const freqN = []
// transpose
for (let i = 0; i < a.length; i++) {
    const x = i % 9
    const y = Math.floor(i/9)
    let f = a[i]
    if (f.match(/^[0-9]*\.[0-9]$/g)) {
        f += "0"
    }
    if (f.match(/^[0-9]*$/g)) {
        f += ".00"
    }
    t[x*12+y] = f
}
// generate freqToNote
for (let i = 0; i < t.length; i++) {
    const x = i % 12
    const y = Math.floor(i/12)
    let v = structuredClone(n[x])
    let s;
    let f;
    if (typeof v == "object") {
        v[0] = v[0] + Math.trunc(y)
        v[1] = v[1] + Math.trunc(y)
        s = v[0]
        f = v[1]
    } else {
        v = v + Math.trunc(y)
        s = v
        f = v
    }
    notes.push(v)
    sharps.push(s)
    flats.push(f)
    freqToNote[t[i]] = v
    freqN.push(Number(t[i]))
}

// notes
console.log("const notes = " + JSON.stringify(notes))

// sharps
console.log("const sharps = " + JSON.stringify(sharps))

// flats
console.log("const flats = " + JSON.stringify(flats))

// frequencies numbers
console.log("const freqN = " + JSON.stringify(freqN))

// frequencies string
console.log("const freqS = " + JSON.stringify(t))
// freqToNote map
console.log("const freqToNote = " + JSON.stringify(freqToNote))
const keys = Object.keys(freqToNote)
const noteToFreq = {}
for (const k of keys) {
    const v = freqToNote[k]
    if (typeof v == "object") {
        noteToFreq[v[0]] = k
        noteToFreq[v[1]] = k
    } else {
        noteToFreq[v] = k
    }
}

// noteToFreq map
console.log("const noteToFreq = " + JSON.stringify(noteToFreq))


 */

class Maps {
  static notes = [
    "C0",
    ["C#0", "Db0"],
    "D0",
    ["D#0", "Eb0"],
    "E0",
    "F0",
    ["F#0", "Gb0"],
    "G0",
    ["G#0", "Ab0"],
    "A0",
    ["A#0", "Bb0"],
    "B0",
    "C1",
    ["C#1", "Db1"],
    "D1",
    ["D#1", "Eb1"],
    "E1",
    "F1",
    ["F#1", "Gb1"],
    "G1",
    ["G#1", "Ab1"],
    "A1",
    ["A#1", "Bb1"],
    "B1",
    "C2",
    ["C#2", "Db2"],
    "D2",
    ["D#2", "Eb2"],
    "E2",
    "F2",
    ["F#2", "Gb2"],
    "G2",
    ["G#2", "Ab2"],
    "A2",
    ["A#2", "Bb2"],
    "B2",
    "C3",
    ["C#3", "Db3"],
    "D3",
    ["D#3", "Eb3"],
    "E3",
    "F3",
    ["F#3", "Gb3"],
    "G3",
    ["G#3", "Ab3"],
    "A3",
    ["A#3", "Bb3"],
    "B3",
    "C4",
    ["C#4", "Db4"],
    "D4",
    ["D#4", "Eb4"],
    "E4",
    "F4",
    ["F#4", "Gb4"],
    "G4",
    ["G#4", "Ab4"],
    "A4",
    ["A#4", "Bb4"],
    "B4",
    "C5",
    ["C#5", "Db5"],
    "D5",
    ["D#5", "Eb5"],
    "E5",
    "F5",
    ["F#5", "Gb5"],
    "G5",
    ["G#5", "Ab5"],
    "A5",
    ["A#5", "Bb5"],
    "B5",
    "C6",
    ["C#6", "Db6"],
    "D6",
    ["D#6", "Eb6"],
    "E6",
    "F6",
    ["F#6", "Gb6"],
    "G6",
    ["G#6", "Ab6"],
    "A6",
    ["A#6", "Bb6"],
    "B6",
    "C7",
    ["C#7", "Db7"],
    "D7",
    ["D#7", "Eb7"],
    "E7",
    "F7",
    ["F#7", "Gb7"],
    "G7",
    ["G#7", "Ab7"],
    "A7",
    ["A#7", "Bb7"],
    "B7",
    "C8",
    ["C#8", "Db8"],
    "D8",
    ["D#8", "Eb8"],
    "E8",
    "F8",
    ["F#8", "Gb8"],
    "G8",
    ["G#8", "Ab8"],
    "A8",
    ["A#8", "Bb8"],
    "B8",
  ];
  static sharps = [
    "C0",
    "C#0",
    "D0",
    "D#0",
    "E0",
    "F0",
    "F#0",
    "G0",
    "G#0",
    "A0",
    "A#0",
    "B0",
    "C1",
    "C#1",
    "D1",
    "D#1",
    "E1",
    "F1",
    "F#1",
    "G1",
    "G#1",
    "A1",
    "A#1",
    "B1",
    "C2",
    "C#2",
    "D2",
    "D#2",
    "E2",
    "F2",
    "F#2",
    "G2",
    "G#2",
    "A2",
    "A#2",
    "B2",
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
    "C6",
    "C#6",
    "D6",
    "D#6",
    "E6",
    "F6",
    "F#6",
    "G6",
    "G#6",
    "A6",
    "A#6",
    "B6",
    "C7",
    "C#7",
    "D7",
    "D#7",
    "E7",
    "F7",
    "F#7",
    "G7",
    "G#7",
    "A7",
    "A#7",
    "B7",
    "C8",
    "C#8",
    "D8",
    "D#8",
    "E8",
    "F8",
    "F#8",
    "G8",
    "G#8",
    "A8",
    "A#8",
    "B8",
  ];
  static flats = [
    "C0",
    "Db0",
    "D0",
    "Eb0",
    "E0",
    "F0",
    "Gb0",
    "G0",
    "Ab0",
    "A0",
    "Bb0",
    "B0",
    "C1",
    "Db1",
    "D1",
    "Eb1",
    "E1",
    "F1",
    "Gb1",
    "G1",
    "Ab1",
    "A1",
    "Bb1",
    "B1",
    "C2",
    "Db2",
    "D2",
    "Eb2",
    "E2",
    "F2",
    "Gb2",
    "G2",
    "Ab2",
    "A2",
    "Bb2",
    "B2",
    "C3",
    "Db3",
    "D3",
    "Eb3",
    "E3",
    "F3",
    "Gb3",
    "G3",
    "Ab3",
    "A3",
    "Bb3",
    "B3",
    "C4",
    "Db4",
    "D4",
    "Eb4",
    "E4",
    "F4",
    "Gb4",
    "G4",
    "Ab4",
    "A4",
    "Bb4",
    "B4",
    "C5",
    "Db5",
    "D5",
    "Eb5",
    "E5",
    "F5",
    "Gb5",
    "G5",
    "Ab5",
    "A5",
    "Bb5",
    "B5",
    "C6",
    "Db6",
    "D6",
    "Eb6",
    "E6",
    "F6",
    "Gb6",
    "G6",
    "Ab6",
    "A6",
    "Bb6",
    "B6",
    "C7",
    "Db7",
    "D7",
    "Eb7",
    "E7",
    "F7",
    "Gb7",
    "G7",
    "Ab7",
    "A7",
    "Bb7",
    "B7",
    "C8",
    "Db8",
    "D8",
    "Eb8",
    "E8",
    "F8",
    "Gb8",
    "G8",
    "Ab8",
    "A8",
    "Bb8",
    "B8",
  ];
  static freqN = [
    16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14,
    30.87, 32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27,
    61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110,
    116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196,
    207.65, 220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23,
    369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25,
    659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.5,
    1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22,
    1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489, 2637, 2793.83,
    2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951, 4186, 4434.92, 4698.63,
    4978, 5274, 5587.65, 5919.91, 6271.93, 6644.88, 7040, 7458.62, 7902.13,
  ];
  static freqS = [
    "16.35",
    "17.32",
    "18.35",
    "19.45",
    "20.60",
    "21.83",
    "23.12",
    "24.50",
    "25.96",
    "27.50",
    "29.14",
    "30.87",
    "32.70",
    "34.65",
    "36.71",
    "38.89",
    "41.20",
    "43.65",
    "46.25",
    "49.00",
    "51.91",
    "55.00",
    "58.27",
    "61.74",
    "65.41",
    "69.30",
    "73.42",
    "77.78",
    "82.41",
    "87.31",
    "92.50",
    "98.00",
    "103.83",
    "110.00",
    "116.54",
    "123.47",
    "130.81",
    "138.59",
    "146.83",
    "155.56",
    "164.81",
    "174.61",
    "185.00",
    "196.00",
    "207.65",
    "220.00",
    "233.08",
    "246.94",
    "261.63",
    "277.18",
    "293.66",
    "311.13",
    "329.63",
    "349.23",
    "369.99",
    "392.00",
    "415.30",
    "440.00",
    "466.16",
    "493.88",
    "523.25",
    "554.37",
    "587.33",
    "622.25",
    "659.25",
    "698.46",
    "739.99",
    "783.99",
    "830.61",
    "880.00",
    "932.33",
    "987.77",
    "1046.50",
    "1108.73",
    "1174.66",
    "1244.51",
    "1318.51",
    "1396.91",
    "1479.98",
    "1567.98",
    "1661.22",
    "1760.00",
    "1864.66",
    "1975.53",
    "2093.00",
    "2217.46",
    "2349.32",
    "2489.00",
    "2637.00",
    "2793.83",
    "2959.96",
    "3135.96",
    "3322.44",
    "3520.00",
    "3729.31",
    "3951.00",
    "4186.00",
    "4434.92",
    "4698.63",
    "4978.00",
    "5274.00",
    "5587.65",
    "5919.91",
    "6271.93",
    "6644.88",
    "7040.00",
    "7458.62",
    "7902.13",
  ];
  static freqToNote = {
    "16.35": "C0",
    "17.32": ["C#0", "Db0"],
    "18.35": "D0",
    "19.45": ["D#0", "Eb0"],
    "20.60": "E0",
    "21.83": "F0",
    "23.12": ["F#0", "Gb0"],
    "24.50": "G0",
    "25.96": ["G#0", "Ab0"],
    "27.50": "A0",
    "29.14": ["A#0", "Bb0"],
    "30.87": "B0",
    "32.70": "C1",
    "34.65": ["C#1", "Db1"],
    "36.71": "D1",
    "38.89": ["D#1", "Eb1"],
    "41.20": "E1",
    "43.65": "F1",
    "46.25": ["F#1", "Gb1"],
    "49.00": "G1",
    "51.91": ["G#1", "Ab1"],
    "55.00": "A1",
    "58.27": ["A#1", "Bb1"],
    "61.74": "B1",
    "65.41": "C2",
    "69.30": ["C#2", "Db2"],
    "73.42": "D2",
    "77.78": ["D#2", "Eb2"],
    "82.41": "E2",
    "87.31": "F2",
    "92.50": ["F#2", "Gb2"],
    "98.00": "G2",
    "103.83": ["G#2", "Ab2"],
    "110.00": "A2",
    "116.54": ["A#2", "Bb2"],
    "123.47": "B2",
    "130.81": "C3",
    "138.59": ["C#3", "Db3"],
    "146.83": "D3",
    "155.56": ["D#3", "Eb3"],
    "164.81": "E3",
    "174.61": "F3",
    "185.00": ["F#3", "Gb3"],
    "196.00": "G3",
    "207.65": ["G#3", "Ab3"],
    "220.00": "A3",
    "233.08": ["A#3", "Bb3"],
    "246.94": "B3",
    "261.63": "C4",
    "277.18": ["C#4", "Db4"],
    "293.66": "D4",
    "311.13": ["D#4", "Eb4"],
    "329.63": "E4",
    "349.23": "F4",
    "369.99": ["F#4", "Gb4"],
    "392.00": "G4",
    "415.30": ["G#4", "Ab4"],
    "440.00": "A4",
    "466.16": ["A#4", "Bb4"],
    "493.88": "B4",
    "523.25": "C5",
    "554.37": ["C#5", "Db5"],
    "587.33": "D5",
    "622.25": ["D#5", "Eb5"],
    "659.25": "E5",
    "698.46": "F5",
    "739.99": ["F#5", "Gb5"],
    "783.99": "G5",
    "830.61": ["G#5", "Ab5"],
    "880.00": "A5",
    "932.33": ["A#5", "Bb5"],
    "987.77": "B5",
    "1046.50": "C6",
    "1108.73": ["C#6", "Db6"],
    "1174.66": "D6",
    "1244.51": ["D#6", "Eb6"],
    "1318.51": "E6",
    "1396.91": "F6",
    "1479.98": ["F#6", "Gb6"],
    "1567.98": "G6",
    "1661.22": ["G#6", "Ab6"],
    "1760.00": "A6",
    "1864.66": ["A#6", "Bb6"],
    "1975.53": "B6",
    "2093.00": "C7",
    "2217.46": ["C#7", "Db7"],
    "2349.32": "D7",
    "2489.00": ["D#7", "Eb7"],
    "2637.00": "E7",
    "2793.83": "F7",
    "2959.96": ["F#7", "Gb7"],
    "3135.96": "G7",
    "3322.44": ["G#7", "Ab7"],
    "3520.00": "A7",
    "3729.31": ["A#7", "Bb7"],
    "3951.00": "B7",
    "4186.00": "C8",
    "4434.92": ["C#8", "Db8"],
    "4698.63": "D8",
    "4978.00": ["D#8", "Eb8"],
    "5274.00": "E8",
    "5587.65": "F8",
    "5919.91": ["F#8", "Gb8"],
    "6271.93": "G8",
    "6644.88": ["G#8", "Ab8"],
    "7040.00": "A8",
    "7458.62": ["A#8", "Bb8"],
    "7902.13": "B8",
  };
  static noteToFreq = {
    C0: "16.35",
    "C#0": "17.32",
    Db0: "17.32",
    D0: "18.35",
    "D#0": "19.45",
    Eb0: "19.45",
    E0: "20.60",
    F0: "21.83",
    "F#0": "23.12",
    Gb0: "23.12",
    G0: "24.50",
    "G#0": "25.96",
    Ab0: "25.96",
    A0: "27.50",
    "A#0": "29.14",
    Bb0: "29.14",
    B0: "30.87",
    C1: "32.70",
    "C#1": "34.65",
    Db1: "34.65",
    D1: "36.71",
    "D#1": "38.89",
    Eb1: "38.89",
    E1: "41.20",
    F1: "43.65",
    "F#1": "46.25",
    Gb1: "46.25",
    G1: "49.00",
    "G#1": "51.91",
    Ab1: "51.91",
    A1: "55.00",
    "A#1": "58.27",
    Bb1: "58.27",
    B1: "61.74",
    C2: "65.41",
    "C#2": "69.30",
    Db2: "69.30",
    D2: "73.42",
    "D#2": "77.78",
    Eb2: "77.78",
    E2: "82.41",
    F2: "87.31",
    "F#2": "92.50",
    Gb2: "92.50",
    G2: "98.00",
    "G#2": "103.83",
    Ab2: "103.83",
    A2: "110.00",
    "A#2": "116.54",
    Bb2: "116.54",
    B2: "123.47",
    C3: "130.81",
    "C#3": "138.59",
    Db3: "138.59",
    D3: "146.83",
    "D#3": "155.56",
    Eb3: "155.56",
    E3: "164.81",
    F3: "174.61",
    "F#3": "185.00",
    Gb3: "185.00",
    G3: "196.00",
    "G#3": "207.65",
    Ab3: "207.65",
    A3: "220.00",
    "A#3": "233.08",
    Bb3: "233.08",
    B3: "246.94",
    C4: "261.63",
    "C#4": "277.18",
    Db4: "277.18",
    D4: "293.66",
    "D#4": "311.13",
    Eb4: "311.13",
    E4: "329.63",
    F4: "349.23",
    "F#4": "369.99",
    Gb4: "369.99",
    G4: "392.00",
    "G#4": "415.30",
    Ab4: "415.30",
    A4: "440.00",
    "A#4": "466.16",
    Bb4: "466.16",
    B4: "493.88",
    C5: "523.25",
    "C#5": "554.37",
    Db5: "554.37",
    D5: "587.33",
    "D#5": "622.25",
    Eb5: "622.25",
    E5: "659.25",
    F5: "698.46",
    "F#5": "739.99",
    Gb5: "739.99",
    G5: "783.99",
    "G#5": "830.61",
    Ab5: "830.61",
    A5: "880.00",
    "A#5": "932.33",
    Bb5: "932.33",
    B5: "987.77",
    C6: "1046.50",
    "C#6": "1108.73",
    Db6: "1108.73",
    D6: "1174.66",
    "D#6": "1244.51",
    Eb6: "1244.51",
    E6: "1318.51",
    F6: "1396.91",
    "F#6": "1479.98",
    Gb6: "1479.98",
    G6: "1567.98",
    "G#6": "1661.22",
    Ab6: "1661.22",
    A6: "1760.00",
    "A#6": "1864.66",
    Bb6: "1864.66",
    B6: "1975.53",
    C7: "2093.00",
    "C#7": "2217.46",
    Db7: "2217.46",
    D7: "2349.32",
    "D#7": "2489.00",
    Eb7: "2489.00",
    E7: "2637.00",
    F7: "2793.83",
    "F#7": "2959.96",
    Gb7: "2959.96",
    G7: "3135.96",
    "G#7": "3322.44",
    Ab7: "3322.44",
    A7: "3520.00",
    "A#7": "3729.31",
    Bb7: "3729.31",
    B7: "3951.00",
    C8: "4186.00",
    "C#8": "4434.92",
    Db8: "4434.92",
    D8: "4698.63",
    "D#8": "4978.00",
    Eb8: "4978.00",
    E8: "5274.00",
    F8: "5587.65",
    "F#8": "5919.91",
    Gb8: "5919.91",
    G8: "6271.93",
    "G#8": "6644.88",
    Ab8: "6644.88",
    A8: "7040.00",
    "A#8": "7458.62",
    Bb8: "7458.62",
    B8: "7902.13",
  };

  // taken from: https://en.wikipedia.org/wiki/Interval_(music)#Main_intervals
  // Interval | Semitones | Full Name
  // P1       | 0         | Perfect Unison
  // m2       | 1         | Minor Second
  // M2       | 2         | Major Second
  // m3       | 3         | Minor Third
  // M3       | 4         | Major Third
  // P4       | 5         | Perfect Fourth
  // Tritone  | 6         | Tritone
  // P5       | 7         | Perfect Fifth
  // m6       | 8         | Minor Sixth
  // M6       | 9         | Major Sixth
  // m7       | 10        | Minor Seventh
  // M7       | 11        | Major Seventh
  // P8       | 12        | Perfect Octave

  // map keys are chord formulas, which list intervals
  static chordPatterns = {
    // Triads
    "0 4 7": { short: "M", long: "maj", fullName: "Major Triad" },
    "0 3 7": { short: "m", long: "min", fullName: "Minor Triad" },
    "0 4 8": { short: "+", long: "aug", fullName: "Augmented Triad" },
    "0 3 6": { short: "°", long: "dim", fullName: "Diminished Triad" },

    // Seventh Chords
    "0 4 7 10": { short: "⁷", long: "⁷", fullName: "Dominant Seventh" },
    "0 4 7 11": { short: "M⁷", long: "maj⁷", fullName: "Major Seventh" },
    "0 3 7 11": {
      short: "mᴹ⁷",
      long: "minᵐᵃʲ⁷",
      fullName: "Minor-Major Seventh",
    },
    "0 3 7 10": { short: "m⁷", long: "min⁷", fullName: "Minor Seventh" },
    "0 4 8 11": {
      short: "+ᴹ⁷",
      long: "augᵐᵃʲ⁷",
      fullName: "Augmented-Major Seventh",
    },
    "0 4 8 10": { short: "+⁷", long: "aug⁷", fullName: "Augmented Seventh" },
    "0 3 6 10": {
      short: "ø⁷",
      long: "min⁷ᵈⁱᵐ⁵",
      fullName: "Half-Diminished Seventh",
    },
    "0 3 6 9": { short: "°⁷", long: "dim⁷", fullName: "Diminished Seventh" },
    "0 4 6 10": {
      short: "⁷ᵈⁱᵐ⁵",
      long: "⁷ᵈⁱᵐ⁵",
      fullName: "Dominant Seventh Flat Five",
    },

    // Extended Chords, similar to Seventh Chords but add in future

    // Ninth Chords
    // I am not music theory expert, I may be messing up a little
    // "0 4 7 11 2"
    "0 2 4 7 11": { short: "M⁹", long: "maj⁹", fullName: "Major Ninth" },
    "0 4 7 11 14": { short: "M⁹", long: "maj⁹", fullName: "Major Ninth" },
    // "0 4 7 10 2"
    "0 2 4 7 10": { short: "⁹", long: "⁹", fullName: "Dominant Ninth" },
    "0 4 7 10 14": { short: "⁹", long: "⁹", fullName: "Dominant Ninth" },
    // "0 4 7 10 1"
    "0 1 4 7 10": {
      short: "⁷ᶠˡᵃᵗ⁹",
      long: "⁷ᶠˡᵃᵗ⁹",
      fullName: "Dominant Minor Ninth",
    },
    "0 4 7 10 13": {
      short: "⁷ᶠˡᵃᵗ⁹",
      long: "⁷ᶠˡᵃᵗ⁹",
      fullName: "Dominant Minor Ninth",
    },
    // "0 3 7 11 2"
    "0 2 3 7 11": {
      short: "mᴹ⁹",
      long: "minᵐᵃʲ⁹",
      fullName: "Minor-Major Ninth",
    },
    "0 3 7 11 14": {
      short: "mᴹ⁹",
      long: "minᵐᵃʲ⁹",
      fullName: "Minor-Major Ninth",
    },
    // "0 3 7 10 2"
    "0 2 3 7 10": { short: "m⁹", long: "min⁹", fullName: "Minor Ninth" },
    "0 3 7 10 14": { short: "m⁹", long: "min⁹", fullName: "Minor Ninth" },
    // "0 4 8 11 2"
    "0 2 4 8 11": {
      short: "+ᴹ⁹",
      long: "augᵐᵃʲ⁹",
      fullName: "Augmented Major Ninth",
    },
    "0 4 8 11 14": {
      short: "+ᴹ⁹",
      long: "augᵐᵃʲ⁹",
      fullName: "Augmented Major Ninth",
    },
    // "0 4 8 10 2"
    "0 2 4 8 10": {
      short: "+⁹",
      long: "aug⁹",
      fullName: "Augmented Dominant Ninth",
    },
    "0 4 8 10 14": {
      short: "+⁹",
      long: "aug⁹",
      fullName: "Augmented Dominant Ninth",
    },
    // "0 3 6 10 2"
    "0 2 3 6 10": {
      short: "ø⁹",
      long: "ø⁹",
      fullName: "Half-Diminished Ninth",
    },
    "0 3 6 10 14": {
      short: "ø⁹",
      long: "ø⁹",
      fullName: "Half-Diminished Ninth",
    },
    // "0 3 6 10 1"
    "0 1 3 6 10": {
      short: "øᶠˡᵃᵗ⁹",
      long: "øᶠˡᵃᵗ⁹",
      fullName: "Half-Diminished Minor Ninth",
    },
    "0 3 6 10 13": {
      short: "øᶠˡᵃᵗ⁹",
      long: "øᶠˡᵃᵗ⁹",
      fullName: "Half-Diminished Minor Ninth",
    },
    // "0 3 6 9 2"
    "0 2 3 6 9": { short: "°⁹", long: "dim⁹", fullName: "Diminished Ninth" },
    "0 3 6 9 14": { short: "°⁹", long: "dim⁹", fullName: "Diminished Ninth" },
    // "0 3 6 9 1"
    "0 1 3 6 9": {
      short: "°ᶠˡᵃᵗ⁹",
      long: "dimᶠˡᵃᵗ⁹",
      fullName: "Diminished Minor Ninth",
    },
    "0 3 6 9 13": {
      short: "°ᶠˡᵃᵗ⁹",
      long: "dimᶠˡᵃᵗ⁹",
      fullName: "Diminished Minor Ninth",
    },

    // Eleventh Chords
    // "0 4 7 10 2 5"
    "0 2 4 5 7 10": { short: "¹¹", long: "¹¹", fullName: "Eleventh" },
    "0 2 4 7 10 17": { short: "¹¹", long: "¹¹", fullName: "Eleventh" },
    "0 4 5 7 10 14": { short: "¹¹", long: "¹¹", fullName: "Eleventh" },
    "0 4 7 10 14 17": { short: "¹¹", long: "¹¹", fullName: "Eleventh" },
    // "0 4 7 11 2 5"
    "0 2 4 5 7 11": { short: "M¹¹", long: "maj¹¹", fullName: "Major Eleventh" },
    "0 2 4 7 11 17": {
      short: "M¹¹",
      long: "maj¹¹",
      fullName: "Major Eleventh",
    },
    "0 4 5 7 11 14": {
      short: "M¹¹",
      long: "maj¹¹",
      fullName: "Major Eleventh",
    },
    "0 4 7 11 14 17": {
      short: "M¹¹",
      long: "maj¹¹",
      fullName: "Major Eleventh",
    },
    // "0 3 7 11 2 5"
    "0 2 3 5 7 11": {
      short: "mᴹ¹¹",
      long: "minᵐᵃʲ¹¹",
      fullName: "Minor Major Eleventh",
    },
    "0 2 3 7 11 17": {
      short: "mᴹ¹¹",
      long: "minᵐᵃʲ¹¹",
      fullName: "Minor Major Eleventh",
    },
    "0 3 5 7 11 14": {
      short: "mᴹ¹¹",
      long: "minᵐᵃʲ¹¹",
      fullName: "Minor Major Eleventh",
    },
    "0 3 7 11 14 17": {
      short: "mᴹ¹¹",
      long: "minᵐᵃʲ¹¹",
      fullName: "Minor Major Eleventh",
    },
    // "0 3 7 10 2 5"
    "0 2 3 5 7 10": { short: "m¹¹", long: "min¹¹", fullName: "Minor Eleventh" },
    "0 2 3 7 10 17": {
      short: "m¹¹",
      long: "min¹¹",
      fullName: "Minor Eleventh",
    },
    "0 3 5 7 10 14": {
      short: "m¹¹",
      long: "min¹¹",
      fullName: "Minor Eleventh",
    },
    "0 3 7 10 14 17": {
      short: "m¹¹",
      long: "min¹¹",
      fullName: "Minor Eleventh",
    },
    // "0 4 8 11 2 5"
    "0 2 4 5 8 11": {
      short: "+ᴹ¹¹",
      long: "augᵐᵃʲ¹¹",
      fullName: "Augmented Major Eleventh",
    },
    "0 2 4 8 11 17": {
      short: "+ᴹ¹¹",
      long: "augᵐᵃʲ¹¹",
      fullName: "Augmented Major Eleventh",
    },
    "0 4 5 8 11 14": {
      short: "+ᴹ¹¹",
      long: "augᵐᵃʲ¹¹",
      fullName: "Augmented Major Eleventh",
    },
    "0 4 8 11 14 17": {
      short: "+ᴹ¹¹",
      long: "augᵐᵃʲ¹¹",
      fullName: "Augmented Major Eleventh",
    },
    // "0 4 8 10 2 5"
    "0 2 4 5 8 10": {
      short: "+¹¹",
      long: "aug¹¹",
      fullName: "Augmented Eleventh",
    },
    "0 2 4 8 10 17": {
      short: "+¹¹",
      long: "aug¹¹",
      fullName: "Augmented Eleventh",
    },
    "0 4 5 8 10 14": {
      short: "+¹¹",
      long: "aug¹¹",
      fullName: "Augmented Eleventh",
    },
    "0 4 8 10 14 17": {
      short: "+¹¹",
      long: "aug¹¹",
      fullName: "Augmented Eleventh",
    },
    // "0 3 6 10 2 5"
    "0 2 3 5 6 10": {
      short: "ø¹¹",
      long: "ø¹¹",
      fullName: "Half-Diminished Eleventh",
    },
    "0 2 3 6 10 17": {
      short: "ø¹¹",
      long: "ø¹¹",
      fullName: "Half-Diminished Eleventh",
    },
    "0 3 5 6 10 14": {
      short: "ø¹¹",
      long: "ø¹¹",
      fullName: "Half-Diminished Eleventh",
    },
    "0 3 6 10 14 17": {
      short: "ø¹¹",
      long: "ø¹¹",
      fullName: "Half-Diminished Eleventh",
    },
    // "0 3 6 9 2 5"
    "0 2 3 5 6 9": {
      short: "°¹¹",
      long: "dim¹¹",
      fullName: "Diminished Eleventh",
    },
    "0 2 3 6 9 17": {
      short: "°¹¹",
      long: "dim¹¹",
      fullName: "Diminished Eleventh",
    },
    "0 3 5 6 9 14": {
      short: "°¹¹",
      long: "dim¹¹",
      fullName: "Diminished Eleventh",
    },
    "0 3 6 9 14 17": {
      short: "°¹¹",
      long: "dim¹¹",
      fullName: "Diminished Eleventh",
    },

    // Thirteenth Chords
    // "0 4 7 11 2 5 9"
    "0 2 4 5 7 9 11": {
      short: "M¹³",
      long: "maj¹³",
      fullName: "Major Thirteenth",
    },
    "0 2 4 7 11 17 21": {
      short: "M¹³",
      long: "maj¹³",
      fullName: "Major Thirteenth",
    },
    "0 4 5 7 11 14 21": {
      short: "M¹³",
      long: "maj¹³",
      fullName: "Major Thirteenth",
    },
    "0 4 7 9 11 14 17": {
      short: "M¹³",
      long: "maj¹³",
      fullName: "Major Thirteenth",
    },
    "0 4 7 11 14 17 21": {
      short: "M¹³",
      long: "maj¹³",
      fullName: "Major Thirteenth",
    },
    // "0 4 7 10 2 5 9"
    "0 2 4 5 7 9 10": { short: "¹³", long: "¹³", fullName: "Thirteenth" },
    "0 2 4 7 10 17 21": { short: "¹³", long: "¹³", fullName: "Thirteenth" },
    "0 4 5 7 10 14 21": { short: "¹³", long: "¹³", fullName: "Thirteenth" },
    "0 4 7 9 10 14 17": { short: "¹³", long: "¹³", fullName: "Thirteenth" },
    "0 4 7 10 14 17 21": { short: "¹³", long: "¹³", fullName: "Thirteenth" },
    // "0 3 7 11 2 5 9"
    "0 2 3 5 7 9 11": {
      short: "mᴹ¹³",
      long: "minᵐᵃʲ¹³",
      fullName: "Minor Major Thirteenth",
    },
    "0 2 3 7 11 17 21": {
      short: "mᴹ¹³",
      long: "minᵐᵃʲ¹³",
      fullName: "Minor Major Thirteenth",
    },
    "0 3 5 7 11 14 21": {
      short: "mᴹ¹³",
      long: "minᵐᵃʲ¹³",
      fullName: "Minor Major Thirteenth",
    },
    "0 3 7 9 11 14 17": {
      short: "mᴹ¹³",
      long: "minᵐᵃʲ¹³",
      fullName: "Minor Major Thirteenth",
    },
    "0 3 7 11 14 17 21": {
      short: "mᴹ¹³",
      long: "minᵐᵃʲ¹³",
      fullName: "Minor Major Thirteenth",
    },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },
    "": { short: "", long: "", fullName: "" },

    // taken from https://www.smithfowler.org/music/Chord_Formulas.htm
    // () = optional note

    // major
    "1 3 5": { type: "Major", symbol: "Maj", formula: "" },
    "1 3 4 5": { type: "Added Fourth", symbol: "add4", formula: "" },
    "1 3 5 6": { type: "", symbol: "", formula: "" },
    "1 3 5 6 9": { type: "", symbol: "", formula: "" },
    "1 3 5 7": { type: "", symbol: "", formula: "" },
    "1 3 5 7 9": { type: "", symbol: "", formula: "" },
    // <1 3 5 7 (9) 11>
    "1 3 5 7 11": { type: "", symbol: "", formula: "" },
    "1 3 5 7 9 11": { type: "", symbol: "", formula: "" },
    // </1 3 5 7 (9) 11>
    // <1 3 5 7 (9) (11) 13>
    "1 3 5 7 13": { type: "", symbol: "", formula: "" },
    "1 3 5 7 9 13": { type: "", symbol: "", formula: "" },
    "1 3 5 7 11 13": { type: "", symbol: "", formula: "" },
    "1 3 5 7 9 11 13": { type: "", symbol: "", formula: "" },
    // </1 3 5 7 (9) (11) 13>
    "1 3 5 7 #11": { type: "", symbol: "", formula: "" },
    "1 3 b5": { type: "", symbol: "", formula: "" },

    // minor
    "": { type: "", symbol: "", formula: "" },
  };
}

// export class ChordMaster {
//   public static decipher(notes);
// }

export class Chord {
  public notes: Note[];
  constructor(notes: Note[]) {
    this.notes = notes;
  }

  public static fromFrequencies(frequencies: number[] | string[]) {}

  public get intervals(): string {
    // TODO: find lowest note, and find intervals
    // of other notes in relation to that one
    return "";
  }
}

export class Note {
  freq: string;
  constructor(freq: string) {
    if (Maps.freqS.indexOf(freq) <= -1) {
      throw new Error("frequency not supported");
    }
    this.freq = freq;
  }

  /**
   * converts frequency to nearest Note
   * @param freq note frequency, string or number
   * @returns Note
   */
  public static fromFreq(freq: string | Number) {
    const f = Number(freq);
    // if leq first note return first note
    if (f <= Maps.freqN[0]) {
      return new Note(Maps.freqS[0]);
    }
    // if geq last note return last note
    if (f >= Maps.freqN[Maps.freqN.length - 1]) {
      return new Note(Maps.freqS[Maps.freqS.length - 1]);
    }
    for (let i = 0; i < Maps.freqN.length - 1; i++) {
      if (f >= Maps.freqN[i] && f <= Maps.freqN[i + i]) {
        // if between two frequencies return closest one
        const low = f - Maps.freqN[i];
        const high = Maps.freqN[i + 1] - f;
        // defaults to lower note
        if (low <= high) {
          // if closer to lowest note
          return new Note(Maps.freqS[i]);
        } else {
          // if closer to highest note
          return new Note(Maps.freqS[i + 1]);
        }
      }
    }
  }

  /**
   * creates Note from note
   * @param note note in format [Letter][nothing, # or b][octave], example: C#3
   * @returns Note
   */
  public static fromNote(note: string) {
    if (Maps.notes.flat().indexOf(note) <= -1) {
      throw new Error("notes must be between C0 and B8");
    }
    return new Note(note);
  }
}

// 16.35	32.7	65.41	130.81	261.63	523.25	1046.5	2093	4186
// 17.32	34.65	69.3	138.59	277.18	554.37	1108.73	2217.46	4434.92
// 18.35	36.71	73.42	146.83	293.66	587.33	1174.66	2349.32	4698.63
// 19.45	38.89	77.78	155.56	311.13	622.25	1244.51	2489	4978
// 20.6	41.2	82.41	164.81	329.63	659.25	1318.51	2637	5274
// 21.83	43.65	87.31	174.61	349.23	698.46	1396.91	2793.83	5587.65
// 23.12	46.25	92.5	185	369.99	739.99	1479.98	2959.96	5919.91
// 24.5	49	98	196	392	783.99	1567.98	3135.96	6271.93
// 25.96	51.91	103.83	207.65	415.3	830.61	1661.22	3322.44	6644.88
// 27.5	55	110	220	440	880	1760	3520	7040
// 29.14	58.27	116.54	233.08	466.16	932.33	1864.66	3729.31	7458.62
// 30.87	61.74	123.47	246.94	493.88	987.77	1975.53	3951
// 7902.13
