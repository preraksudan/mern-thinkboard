import express from "express";
import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controller/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNewNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
