import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 order desc
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send({ message: "Error in getAllNotes controller" });
  }
};

export const getNoteById = async (req, res) => {
  console.log("getNoteById");
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid note ID format" });
    }

    const originalNote = await Note.findById(req.params.id);

    if (!originalNote) {
      res.status(404).send({ message: "Note not found to be updated" });
    }

    res.status(200).json(originalNote);
  } catch (error) {
    res.status(500).send({ message: "Error in getNoteById controller" });
  }
};

export const createNewNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("Note creation invoked");
    console.log(title + "---" + content);
    const newNote = new Note({ title: title, content: content });
    const savedNote = await newNote.save();
    res.status(201).send({ message: "New Note added", response: savedNote });
  } catch (error) {
    res.status(500).send({ message: "Error in createNewNote controller" });
  }
};

export const updateNote = async (req, res) => {
  console.log("updateNote invoked");
  console.log(req.params.id);
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      res.status(404).send({ message: "Note not found to be updated" });

    res.status(200).json({ message: "Note Updated Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error in updateNote controller" });
  }
};

export const deleteNote = async (req, res) => {
  console.log("updateNote invoked");
  console.log(req.params.id);
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!deletedNote)
      res.status(404).send({ message: "Note not found to be deleted" });

    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error in deleteNote controller" });
  }
};
