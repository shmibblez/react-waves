"use client"

import React, { useState, useRef, useEffect } from "react";
import StartRecordingSVG from "../icons/startRecordingSVG.js"
import StopRecordingSVG from "../icons/stopRecordingSVG.js"
import WarningSVG from "../icons/warningSVG.js"
import LoadingSVG from "../icons/loadingDotsSVG.js"
import { AudioState, AudioHelper } from "../tools/audioHelper.js"
import NoSSR from 'react-no-ssr';
import { Chord, ChordShapeGuitar } from "../tools/chordMaster.js";

// Home, base element
export default function Home() {
  const [selectedTab, setSelectedTab] = useState("find chords")
  return (
    <main
      className="bg-zinc-950"
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: "sidebar tabs",
        justifyItems: "stretch",
      }}>
      {/* tabs */}
      <menu
        className="bg-zinc-950 border-r-2 border-r-zinc-500"
        style={{
          gridRow: "1 / 2",
          gridColumn: "1",
        }}>
        <li>
          <Tab
            name="find chords"
            selected={selectedTab === "find chords"}
            setSelected={setSelectedTab} />
        </li>
        <li>
          <Tab
            name="tune"
            selected={selectedTab === "tune"}
            setSelected={setSelectedTab} />
        </li>
      </menu>
      {/* show selected tab */}
      <div
        className="m-4"
        style={{
          gridRow: "1 / 2",
          gridColumn: "2"
        }}>
        <SelectedTab selected={selectedTab} />
      </div>
    </main >
  );
}

// sidebar tab
function Tab({ name, selected, setSelected }: { name: string, selected: boolean, setSelected: (s: string) => void }) {
  return (
    <div
      className={"p-4 border-b-zinc-500 border-b-2 " + (selected ? "bg-zinc-800" : "bg-zinc-950")}
      onClick={() => setSelected(name)}>
      <h1 className="text-l">{name}</h1>
    </div>
  )
}

// shows selected tab
function SelectedTab({ selected }: { selected: string }) {
  switch (selected) {
    case "find chords":
      return <FindChordsTab />
    case "tune":
      return <TuneTab />
  }
}


/** find chords tab & components */

// shows find chords tab
function FindChordsTab() {
  const [chord, setChord] = useState<Chord | null>(null) // series of notes
  const audioHelper = useRef(AudioHelper.instance)
  const [audioState, setAudioState] = useState(audioHelper.current?.currentAudioState)
  if (audioState === "listening") {
    audioHelper.current.findChord(6).then(c => {
      setChord(c)
    }).catch(e => { console.log(e) })
  }

  useEffect(() => {
    audioHelper.current.audioState.forEach(s => {
      setAudioState(s)
    })
  })

  return (
    <div
      className="size-full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}>
      <FrequencyDisplay />
      <RecordButton audioState={audioState} />
      <ChordShapes chord={chord} />
    </div>
  )
}

// frequency display while listening
function FrequencyDisplay() {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const maxAmplitude = useRef<number>(-Infinity);
  const audioHelper = useRef(AudioHelper.instance)

  // domain: [0,1], range: [0, 1]
  // applies bell curve to input, swanky af
  function waveLimit(x: number, y: number, maxX: number): number {
    return Math.abs((Math.sin(2 * Math.PI * (x / maxX) - Math.PI / 2) / 2 + 0.5)) * y
  }

  // lowest frequency (E2, 82.41Hz) has 2 periods
  // highest frequency (E4, 329.628Hz) has 20 periods
  function drawSineWave(
    ctx: CanvasRenderingContext2D,
    f: number, // frequency
    a: number, // amplitude
    width: number,
    height: number,
    strokeStyle: string,
  ) {
    // number of steps per wave
    const res = 500;
    // interval between each x
    const xInt = width / res

    const nPeriodsMin = 0.05;
    const nPeriodsMax = 0.2;
    const minFreq = 82.41
    const maxFreq = 329.628
    const maxA = maxAmplitude.current
    // map frequency to number of periods
    const nPeriods = (f - minFreq) * (nPeriodsMax - nPeriodsMin) / (maxFreq - minFreq) + nPeriodsMin

    ctx.strokeStyle = strokeStyle
    ctx.lineWidth = 1
    // draw wave
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    var x = 0;
    while (x < width) {
      const y = (a / maxA) * (Math.sin(nPeriods * 2 * Math.PI * (x / width)) / 2)
      ctx.lineTo(x, waveLimit(x, y * (height), width) + (height / 2))
      // console.log(`x: ${x}, y: ${y}`)
      // console.log(`x ${x}, y: ${y}, a: ${a}, maxA: ${maxA}`)
      x += xInt
    }
    ctx.stroke()
  }

  function draw() {
    const nlf = audioHelper.current.nLoudestFrequencies(6) || []
    const c = canvas.current
    const ctx = c.getContext("2d")
    const width = c!.width
    const height = c!.height
    const strokeStyles = [
      "white",
      "blue",
      "red",
      "orange",
      "green",
      "purple",
      "yellow"
    ]

    // set background
    ctx.fillStyle = "rgb(39 39 42)"
    ctx.fillRect(0, 0, width, height)

    // draw here
    // for each string, draw softest first so loudest are on top
    for (var i = nlf.length - 1; i >= 0; i--) {
      const f = nlf[i].f
      const a = nlf[i].a
      if ((Math.abs(maxAmplitude.current) === Infinity) || (Math.abs(a) > Math.abs(maxAmplitude.current))) {
        // update loudest amplitude
        maxAmplitude.current = Math.abs(a)
      }
      drawSineWave(ctx, f, a, width, height, strokeStyles[i])
    }

    // if listening active keep drawing
    if (audioHelper.current && audioHelper.current.currentAudioState === "listening")
      return requestAnimationFrame(draw)
  }

  var bodyHTML: React.JSX.Element;
  if (audioHelper.current.currentAudioState === "loading") {
    bodyHTML = <p>loading...</p>
  } else if (audioHelper.current.currentAudioState === "not supported") {
    bodyHTML = <p>microphone not supported</p>
  } else if (audioHelper.current.currentAudioState === "listening" || audioHelper.current.currentAudioState === "idle") {
    if (audioHelper.current.currentAudioState === "listening") {
      requestAnimationFrame(draw)
    }
    bodyHTML = (
      // draw frequencies here
      <NoSSR>
        <canvas ref={canvas} style={{ width: "100%", height: "100%", backgroundColor: "rgb(39 39 42)" }}>
        </canvas>
      </NoSSR>
    )
  } else if (typeof audioHelper.current.currentAudioState === "object") {
    // if error
    bodyHTML = <p>unknown error occured, error: {audioHelper.current.currentAudioState.message}</p>
  }

  return (
    <div
      style={{ flexGrow: "2" }}
      className="p-4 bg-zinc-800 rounded-xl border-2 border-zinc-500">
      {bodyHTML}
    </div>
  )
}

// button to record or stop recording
function RecordButton({ audioState }: { audioState: AudioState }) {
  const audioHelper = useRef<AudioHelper | null>(null)

  var onClick: () => void;
  var bgColor: string;
  var buttonText: string;
  var iconSVG: React.JSX.Element;

  useEffect(() => {
    audioHelper.current = AudioHelper.instance
  })

  // set vars depending on state
  if (audioState === "loading" || audioState === null) {
    // if loading do nothing
    onClick = () => { }
    bgColor = "bg-zinc-700 "
    buttonText = "loading..."
    iconSVG = <LoadingSVG />
  } else if (audioState === "listening") {
    // if listening stop
    onClick = () => { audioHelper.current.stop() }
    bgColor = "bg-red-900 "
    buttonText = "stop recording"
    iconSVG = <StopRecordingSVG />
  } else if (audioState === "idle") {
    // if idle start
    onClick = () => { audioHelper.current.start() }
    bgColor = "bg-green-800 "
    buttonText = "record"
    iconSVG = <StartRecordingSVG />
  } else if (audioState === "not supported") {
    onClick = () => { }
    bgColor = "bg-yellow"
    buttonText = "audio not supported on browser"
    iconSVG = <WarningSVG />
  } else if (typeof audioState === "object") {
    onClick = () => { audioHelper.current.start() }
    bgColor = "bg-yellow"
    buttonText = "error, retry?"
    iconSVG = <WarningSVG />
  }
  return (
    <div
      className={
        "mt-4 p-4 text-center rounded-xl " + bgColor
      }
      // if loading do nothing
      // if not loading set listening
      onClick={onClick!}>
      <div
        style={{
          width: "4vh",
          height: "4vh",
          float: "left",
          display: "inline-block"
        }}
      >
        {iconSVG!}
      </div>
      <p
        style={{ display: "inline-block", float: "left" }}
        className="text-base pl-4 my-auto">
        {buttonText!}
      </p>
    </div>
  )
}

// shows chord shapes when chord found
function ChordShapes({ chord }: { chord: Chord }) {
  let body: React.JSX.Element;
  let hidden = false

  if (chord) {
    // if chord exists
    // max chord shapes to show
    const maxChordShapes = 10
    let shapes = chord.guitarChordShapes()
    if (shapes.length <= 0) {
      // if no shapes generated show message
      body = (
        <div className="text-base pl-4 my-auto">
          <p>{"no chord shapes found"}</p>
        </div>
      )
    } else {
      // if shapes generated show list of <ChordShape />
      // maximum fret span for chord
      const maxFretSpan = 7
      // limit number of chord shapes shown, taking into account max chord shapes and max fret span
      if (shapes.length > maxChordShapes) {
        shapes = shapes.slice(0, maxChordShapes).filter(v => v.fretSpan() <= maxFretSpan)
      }
      // max fret span in shapes list
      const mfs = shapes[shapes.length - 1].fretSpan()
      // convert chord shapes to visual representation (nFrets is max fret span so same number of frets shown for each)
      const chordShapes = shapes.map(v =>
        <li key={v.fretNumbers.join(" ")} style={{ display: "inline" }}>
          <ChordShape shape={v} nFrets={mfs} />
        </li>
      )
      // body is list of chord shapes
      body = (
        <ol className="p-4 bg-zinc-800 rounded-xl border-2 border-zinc-500">
          {chordShapes}
        </ol>
      )
    }
  } else {
    // if chord doesn't exist
    // TODO: show body according to audio state (listening, error, etc)
    body = <div />
    hidden = true
  }
  return (
    <div
      style={{ flexGrow: "2", visibility: hidden ? "hidden" : "visible" }}>
      {body}
    </div>
  )
}

// chord visual representation element
function ChordShape({ shape, nFrets }: { shape: ChordShapeGuitar, nFrets: number }) {
  /**
   * left string thickest (usually string no. 6)
   * right string thinnest (string no. 1)
   */
  const gridElements: React.JSX.Element[] = []

  const numbers = shape.fretNumbers
    .reduce((a, v) => {
      const n = Number(v)
      if (!isNaN(n)) {
        a.push(n)
      }
      return a
    }, [])
    // sort ascending
    .sort((a, b) => a - b)
  // smallest fret
  const baseFret = numbers[0]
  /* draw fret number */
  gridElements.push(
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // center at first fret along left
      gridColumn: `1 / 2`,
      gridRow: "1 / 3",
      backgroundColor: "#55ff55",
    }}>
      <p>{baseFret}</p>
    </div>
  )

  /* draw top fret thicker (bottom + top border below) */
  gridElements.push(
    <div
      style={{
        // starts at line 2
        gridColumn: `2 / -1`,
        // starts at line 1
        gridRow: `1 / 2`,
        borderBottom: "3px solid #000000",
      }}
    />
  )
  // for each fret (fn = fret number)
  for (let fn = 0; fn < nFrets; fn++) {
    /* draw each fret (border top for each one) */
    gridElements.push(
      <div
        style={{
          // starts at line 2
          gridColumn: `2 / -1`,
          // starts at line 2
          gridRow: `${fn + 2} / ${fn + 3}`,
          borderTop: "3px solid #000000",
        }}
      />
    )
  }

  // for each string (sn = string number)
  const stringWidths = [5, 4.5, 4, 3.5, 3, 2.5, 2]
  for (let sn = 0; sn < shape.tuning.length; sn++) {
    let fret: string | number = shape.fretNumbers[sn]
    /* draw each string */
    gridElements.push(
      <div
        style={{
          // starts at line 2
          gridColumn: `${sn + 2} / ${sn + 3}`,
          // starts at line 2
          gridRow: "2 / -1",
          backgroundColor: "#ff0000",
        }}
      >
        <div
          style={{
            margin: "auto",
            width: `${stringWidths[sn] ?? 1.5}px`,
            height: "100%",
            display: "block",
            backgroundColor: "#000000",
          }}
        ></div>
      </div>
    )
    if (fret == "x") {
      // if fret x (string muted) TODO: switch for X svg
      /* draw string letter X */
      gridElements.push(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // starts at column 2
            gridColumn: `${sn + 2} / ${sn + 3}`,
            gridRow: "1 / 2",
            backgroundColor: "#55ff55",
          }}
        >
          <p>{"X"}</p>
        </div>
      )
    } else if (fret == "0") {
      // if fret 0 (open string)
      /* draw string letter O TODO: switch for empty circle svg */
      gridElements.push(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // starts at column 2
            gridColumn: `${sn + 2} / ${sn + 3}`,
            gridRow: "1 / 2",
            backgroundColor: "#55ff55",
          }}
        >
          <p>{"O"}</p>
        </div>
      )
    } else {
      // if fret number
      /* draw string letter */
      gridElements.push(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // starts at column 2
            gridColumn: `${sn + 2} / ${sn + 3}`,
            gridRow: "1 / 2",
            backgroundColor: "#55ff55",
          }}
        >
          <p>{shape.tuning[sn]}</p>
        </div>
      )
      /* draw finger placement indicator */
      fret = Number(fret)
      gridElements.push(
        <div
          style={{
            display: "flex",
            // starts at line 2
            gridColumn: `${sn + 2} / ${sn + 3}`,
            // starts at line 2, lowest fret at this point is 1
            gridRow: `${baseFret - fret + 1} / ${baseFret - fret + 2}`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* TODO: add solid red circle svg here, width 90% */}
        </div>
      )
    }
  }

  return (
    // ratio is long to accomodate all visual elements
    <div style={{ aspectRatio: 2 / 1 }}>
      { // TODO: show chord representation with table that show frets,
        // strings, finger placement (dots), and starting fret number 
      }
      {/**
       * parent grid
       * layout:
       *  left side is for starting fret number
       *  top is for letters
       *  remaining spaces for strings, frets, and finger placement indicators
       *  left - right: thick - thin strings
       *  top - bottom: increasing fret number
       */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "grid",
          // # columns = 1 + # strings
          gridTemplateColumns: `1fr repeat(${shape.tuning.length}, 2fr)`,
          // # frets = 1 + nFrets
          gridTemplateRows: `1fr repeat(${nFrets + 1}, 2fr)`,
        }}
      >
        {gridElements}
      </div>
    </div>
  )
}


/** tune tab & components */


function TuneTab() {
  return (<div><p>not ready yet</p></div>)
}