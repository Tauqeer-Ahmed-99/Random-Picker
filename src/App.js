import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import Animation from "./Animation";

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function App() {
  const [winner, setWinner] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [inputRef, setInputFocus] = useFocus();

  const handleParticipantNameChange = (e) => {
    setParticipantName(e.target.value);
  };

  const handleAddParticipant = () => {
    const isAlreadyInParticipants = !!participants.filter(
      (participant) =>
        participant.toLowerCase() === participantName.toLowerCase()
    ).length;

    if (isAlreadyInParticipants) {
      alert(`${participantName} is already in participants list.`);
    } else {
      if (participantName) {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participantName,
        ]);
        setParticipantName("");
      } else {
        alert("Please enter a valid participant name.");
      }
    }
    setInputFocus();
  };

  const start = () => {
    setIsLoading(true);
    setTimeout(() => {
      const winner =
        participants[Math.floor(Math.random() * participants.length)];
      setIsLoading(false);
      setWinner(winner);
      setShowWinner(true);
    }, 5000);
  };

  return (
    <div className="App">
      <header className="App-header">
        {showWinner && (
          <>
            <div className={isLoading ? "" : "winner"}>
              <div>Winner</div>
              <h1>{isLoading ? "Thinking..." : winner}</h1>
            </div>
            <button
              style={{
                marginLeft: "2rem",
                height: "2rem",
                cursor: "pointer",
                position: "fixed",
                right: "2rem",
                bottom: "2rem",
              }}
              onClick={() => setShowWinner(false)}
            >
              Restart
            </button>
            <Animation />
          </>
        )}
        {!showWinner &&
          (isLoading ? (
            <>
              <img src={logo} className="App-logo" alt="logo" />
              <div>Any guess?? {participants.join(", ")}?</div>
            </>
          ) : (
            <>
              <div>
                <input
                  ref={inputRef}
                  value={participantName}
                  onChange={handleParticipantNameChange}
                  style={{ height: "2rem", width: "20rem", fontSize: "1rem" }}
                />
                <button
                  style={{
                    marginLeft: "2rem",
                    height: "2rem",
                    width: "10rem",
                    cursor: "pointer",
                  }}
                  onClick={handleAddParticipant}
                >
                  Add Participant
                </button>
              </div>
              <div>
                <div>
                  {!participants.length && <div>Add participants!</div>}
                  {participants.length > 0 && (
                    <div style={{ marginBottom: "2rem" }}>Participants</div>
                  )}
                  {participants.map((participant) => (
                    <div key={participant}>{participant}</div>
                  ))}
                </div>
                {participants.length > 0 && (
                  <button
                    onClick={start}
                    style={{
                      marginLeft: "2rem",
                      height: "2rem",
                      width: "10rem",
                      cursor: "pointer",
                    }}
                  >
                    Start
                  </button>
                )}
              </div>
            </>
          ))}
      </header>
    </div>
  );
}

export default App;
