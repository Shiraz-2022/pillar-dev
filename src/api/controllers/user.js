const db = require("../../config/firebase");

const userController = {};

userController.addJournal = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error: "All fields (title, content, author, date) are required.",
      });
    }

    const journalData = {
      content,
      date: Date.now(),
    };

    const journalRef = await db.collection("journals").add(journalData);

    return res.status(201).json({
      message: "Journal entry added successfully.",
      journalId: journalRef.id,
    });
  } catch (error) {
    console.error("Error adding journal entry:", error);
    return res.status(500).json({ error: "Error adding journal entry." });
  }
};

userController.getJournals = async (req, res) => {
  try {
    const journalsSnapshot = await db
      .collection("journals")
      .orderBy("date", "desc")
      .get();

    if (journalsSnapshot.empty) {
      return res.status(404).json({ message: "No journal entries found." });
    }

    const journals = journalsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      message: "Journals fetched successfully.",
      journals,
    });
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return res.status(500).json({ error: "Error fetching journal entries." });
  }
};

module.exports = userController;
