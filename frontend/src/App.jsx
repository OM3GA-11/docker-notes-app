import { useEffect, useState } from "react";



function App() {
  console.log("API URL =", import.meta.env.VITE_API_URL);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("https://notes-backend-l4ed.onrender.com/notes");
        const data = await response.json();

        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotes();
  }, []);

  async function addNote() {
  try {
    const response = await fetch("https://notes-backend-l4ed.onrender.com/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const newNote = await response.json();

    setNotes((prevNotes) => [...prevNotes, newNote]);

    setTitle("");
    setContent("");
  } catch (error) {
    console.error(error);
  }
}

async function deleteNote(id) {
  try {
    await fetch("https://notes-backend-l4ed.onrender.com/notes", {
      method: "DELETE",
    });

    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
}

  return (
      


    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold text-center mb-10">
            Docker Notes 📝
        </h1>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg space-y-4">
          <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none focus:border-blue-500"
          />

          <br /><br />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 outline-none resize-none focus:border-blue-500"
        />

          <br /><br />

          <button
              onClick={addNote}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold"
          >
              Add Note
          </button>
        </div>

        <hr />

        {notes.length === 0 ? (
  <div className="text-center text-slate-400 mt-10">
    No notes yet. Create your first note! 🚀
  </div>
) : (
  <div className="mt-10 space-y-6">
    {notes.map((note) => (
      <div
        key={note.id}
        className="bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-800"
      >
        <h3 className="text-2xl font-semibold mb-2">
          {note.title}
        </h3>

        <p className="text-slate-300 leading-relaxed mb-5">
          {note.content}
        </p>

        <button
          onClick={() => deleteNote(note.id)}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg font-medium"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  </div>
  );
}

export default App;