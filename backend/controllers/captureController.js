const db = require("../models");
const Capture = db.Capture;

// Get All captures
exports.getAllCaptures = async (req, res) => {
  try {
    const captures = await Capture.findAll();
    res.json(captures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Make New capture
exports.createCapture = async (req, res) => {
  try {
    const {
      naam,
      dexNumber,
      type1,
      type2,
      ability1,
      ability2,
      hiddenability,
      BST,
      HP,
      Atk,
      Def,
      SpA,
      SpD,
      Spe,
      EvoCondition,
    } = req.body;
    const newCapture = await Capture.create({
      naam,
      dexNumber,
      type1,
      type2,
      ability1,
      ability2,
      hiddenability,
      BST,
      HP,
      Atk,
      Def,
      SpA,
      SpD,
      Spe,
      EvoCondition,
    });
    res.status(201).json(newCapture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
