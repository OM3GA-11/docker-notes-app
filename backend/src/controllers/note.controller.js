const prisma = require("../lib/prisma");

const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error while fetching notes.",
    });
  }
};

const createNote = async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();   

    
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required.",
      });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const existingNote = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingNote) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Note deleted.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
};