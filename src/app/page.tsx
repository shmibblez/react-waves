"use client"

import { ReactNode, ReactElement, useState, useRef, useEffect } from "react";
import StartRecordingSVG from "../icons/startRecordingSVG.js"
import StopRecordingSVG from "../icons/stopRecordingSVG.js"
import AudioHelper from "../helpers/audioHandler.jsx"

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
  const [recording, setRecording] = useState(false)

  // TODO: here fft implementation

  const chord: [] = [] // series of notes
  return (
    <div
      className="size-full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}>
      <FrequencyDisplay recording={recording} />
      <RecordButton recording={recording} setRecording={setRecording} />
      <ChordShapes chord={chord} />
    </div>
  )
}

function FrequencyDisplay({ recording }: { recording: boolean }) {
  const canvas = useRef(null)
  const canvasCtx = useRef(null)
  const [audioStatus, setAudioStatus] = useState("loading")


  useEffect(() => {
    // init audio here and check if available

    // check if audio supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // audio not supported
      setAudioStatus("not supported")
      return;
    }

    // audio supported
    const audio = navigator.mediaDevices.getUserMedia({ audio: true, video: false })

  }, [])

  var frequencies;
  if (audioStatus === "loading") {
    frequencies = <text>loading...</text>
  } else if (audioStatus === "not supported") {
    frequencies = <text>microphone not supported</text>
  } else if (audioStatus === "available") {
    frequencies = (
      // draw frequencies here
      <canvas ref={canvas}>
        {/* TODO */}
      </canvas>
    )
  }

  return (
    <div
      style={{ flexGrow: "2" }}
      className="p-4 bg-zinc-800 rounded-xl border-2 border-zinc-500">
      {frequencies}
    </div>
  )
}


function RecordButton({ recording, setRecording }: { recording: boolean, setRecording: (r: boolean) => void }) {
  return (
    <div
      className={"mt-4 p-4 text-center rounded-xl " + (recording ? "bg-green-800" : "bg-red-900")}
      onClick={() => setRecording(!recording)}>
      <div
        style={{
          width: "4vh",
          height: "4vh",
          float: "left",
          display: "inline-block"
        }}
      >
        {recording ? <StopRecordingSVG /> : <StartRecordingSVG />}
      </div>
      <text
        style={{ display: "inline-block", float: "left" }}
        className="text-base pl-4 my-auto"
      >{recording ? "recording" : "record"}
      </text>
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
  return (<div><text>not ready yet</text></div>)
}