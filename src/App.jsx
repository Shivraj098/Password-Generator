import { useState, useCallback, useEffect, useRef } from "react";

// Child component: Password display + copy
function PasswordDisplay({ password, inputRef, copyToClipboard }) {
  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <input
        type="text"
        ref={inputRef}
        value={password}
        readOnly
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px 0 0 8px",
          border: "none",
          fontSize: "16px",
          outline: "none",
          background: "#f1f1f1",
          color: "#333",
        }}
      />
      <button
        onClick={copyToClipboard}
        style={{
          padding: "12px 20px",
          background: "#61dafb",
          border: "none",
          borderRadius: "0 8px 8px 0",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#21a1f1")}
        onMouseLeave={(e) => (e.target.style.background = "#61dafb")}
      >
        Copy
      </button>
    </div>
  );
}

// Child component: Password settings
function PasswordSettings({
  length,
  setLength,
  numbersAllowed,
  setNumbersAllowed,
  charAllowed,
  setcharAllowed,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Length: {length}
        </label>
        <input
          type="range"
          min={6}
          max={20}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={numbersAllowed}
            onChange={() => setNumbersAllowed((prev) => !prev)}
            style={{ marginRight: "5px" }}
          />
          Numbers
        </label>

        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setcharAllowed((prev) => !prev)}
            style={{ marginRight: "5px" }}
          />
          Special Chars
        </label>
      </div>
    </div>
  );
}

// Child component: Generate button
function GenerateButton({ passwordGenerator }) {
  return (
    <button
      onClick={passwordGenerator}
      style={{
        width: "100%",
        padding: "12px",
        background: "#61dafb",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#21a1f1")}
      onMouseLeave={(e) => (e.target.style.background = "#61dafb")}
    >
      Generate Password
    </button>
  );
}

// Main App component
function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const copyToClipboard = async () => {
    inputRef.current.select();
    await navigator.clipboard.writeText(password);
    alert(`${password} has been copied to clipboard`);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_";
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#1e1e2f",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "#282c34",
          padding: "40px",
          borderRadius: "16px",
          color: "white",
          width: "400px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Password Generator
        </h2>

        <PasswordDisplay
          password={password}
          inputRef={inputRef}
          copyToClipboard={copyToClipboard}
        />

        <PasswordSettings
          length={length}
          setLength={setLength}
          numbersAllowed={numbersAllowed}
          setNumbersAllowed={setNumbersAllowed}
          charAllowed={charAllowed}
          setcharAllowed={setcharAllowed}
        />

        <GenerateButton passwordGenerator={passwordGenerator} />
      </div>
    </div>
  );
}

export default App;
