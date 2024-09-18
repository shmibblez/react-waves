"use client"

import React, { ReactNode, useState, useRef, useEffect } from "react";
import StartRecordingSVG from "../icons/startRecordingSVG.js"
import StopRecordingSVG from "../icons/stopRecordingSVG.js"
import WarningSVG from "../icons/warningSVG.js"
import LoadingSVG from "../icons/loadingDotsSVG.js"
import { AudioState, AudioHelper } from "../tools/audioHelper.js"
import NoSSR from 'react-no-ssr';

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

function Tab({ name, selected, setSelected }: { name: string, selected: boolean, setSelected: (s: string) => void }) {
  return (
    <div
      className={"p-4 border-b-zinc-500 border-b-2 " + (selected ? "bg-zinc-800" : "bg-zinc-950")}
      onClick={() => setSelected(name)}>
      <h1 className="text-l">{name}</h1>
    </div>
  )
}

function SelectedTab({ selected }: { selected: string }) {
  switch (selected) {
    case "find chords":
      return <FindChordsTab />
    case "tune":
      return <TuneTab />
  }
}


/** find chords tab & components */


function FindChordsTab() {
  const chord: [] = [] // series of notes

  const audioHelper = useRef(AudioHelper.instance)
  const [audioState, setAudioState] = useState(audioHelper.current?.currentAudioState)

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

  var bodyHTML;
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


function RecordButton({ audioState }: { audioState: AudioState }) {
  const audioHelper = useRef<AudioHelper | null>(null)

  var onClick;
  var bgColor;
  var buttonText;
  var iconSVG;

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

function ChordShapes({ chord }: { chord: [] }) {
  return (
    <div
      style={{ flexGrow: "2" }}>
      {chordShapeGenerator(chord)}
    </div>
  )
}

function ChordShape({ shape }: { shape: [] }) {
  return (
    <div></div>
  )
}

function chordShapeGenerator(notes: []): ReactNode[] {
  // TODO              
  return []
}


/** tune tab & components */


function TuneTab() {
  return (<div><p>not ready yet</p></div>)
}