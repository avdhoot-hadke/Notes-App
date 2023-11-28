import express from "express";
import "dotenv/config";
import cors from "cors";
import main from "./connectDB.js";
import Note from "./models/Notes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//MiddleWares
main();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  try {
    const data = await Note.find({});

    if (!data) {
      throw new Error("An error occurred while fetching the notes.");
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the notes." });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Note.findById(noteId);

    if (!data) {
      throw new Error("An error occurred while fetching the notes.");
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the notes." });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Note.create({ title, description });

    if (!data) {
      throw new Error("An error occurred while creating a note.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a note." });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const { title, description } = req.body;
    const data = await Note.findByIdAndUpdate(noteId, { title, description });

    if (!data) {
      throw new Error("An error occurred while updating a note.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating a note." });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const { title, description } = req.body;
    const data = await Note.findByIdAndDelete(noteId);

    if (!data) {
      throw new Error("An error occurred while deleting a note.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting a note." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello Word!");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
