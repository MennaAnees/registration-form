const express = require('express');
const router = express.Router();
const Status = require('../models/status');

router.post('/', async (req, res)=>{
  const { body: { name }, userId } = req;
  try {
    const status = await Status.create({ name, userId });
    res.status(201).json({ data: status });
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
