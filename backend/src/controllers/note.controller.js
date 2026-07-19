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
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

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

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
};