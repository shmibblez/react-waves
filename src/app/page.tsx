import { ReactNode, ReactElement, useState } from "react";
import "tailwindcss"
import StartRecordingSVG from "../icons/start-recording.svg"
import StopRecordingSVG from "../icons/stop-recording.svg"


export default function Home() {
  const [selectedTab, setSelectedTab] = useState("find chords")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table className="table-auto" style={{ width: "100%", height: "100%" }}>
        <tbody>
          <tr>
            {/* tabs */}
            <td className="m-4" style={{ borderRight: "1px solid AliceBlue" }}>
              <menu className="bg-zinc-950">
                <li><Tab name="find chords" selected={selectedTab === "find chords"} setSelected={setSelectedTab} /></li>
                <li><Tab name="tune" selected={selectedTab === "tune"} setSelected={setSelectedTab} /></li>
              </menu>
            </td>
            {/* show selected tab */}
            <td className="m-4">
              <SelectedTab selected={selectedTab} />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

function Tab({ name, selected, setSelected }: { name: string, selected: boolean, setSelected: (s: string) => void }) {
  return (
    <div className={"rounded-md border-zinc-500 border-1 p-4" + selected ? "bg-zinc-800" : "bg-zinc-900"} onClick={() => setSelected(name)}>
      <h1 className="text-xl">{name}</h1>
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
    <ul className="table-auto" style={{ width: "100%", height: "40%" }}>
      <li><FrequencyDisplay recording={recording} /></li>
      <li><RecordButton recording={recording} setRecording={setRecording} /></li>
      <li><ChordShapes chord={chord} /></li>
    </ul>
  )
}

function FrequencyDisplay({ recording }: { recording: boolean }) {
  return (
    <canvas className="rounded border-zinc-500 border-2">

    </canvas>
  )
}

function RecordButton({ recording, setRecording }: { recording: boolean, setRecording: (r: boolean) => void }) {
  return (
    <button className={"rounded" + recording ? "bg-red-800" : "bg-green-500"}
      onClick={() => setRecording(!recording)}>
      <table>
        <tr>
          <td><div>{recording ? <StopRecordingSVG /> : <StartRecordingSVG />}</div></td>
          <td><text className="text-base">{recording ? "recording" : "record"}</text></td>
        </tr>
      </table>
    </button>
  )
}

function ChordShapes({ chord }: { chord: [] }) {
  return (
    <div>{chordShapeGenerator(chord)}</div>
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