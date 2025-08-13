const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const db = require('../database/db');
const router = express.Router();

// Validation schema for a new lead
const leadSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string().min(10).max(20).required(),
    email: Joi.string().email().allow('').optional(),
    address: Joi.string().allow('').optional(),
    project_details: Joi.string().allow('').optional(),
    status: Joi.string().valid('New', 'Contacted', 'Scheduled', 'Won', 'Lost').default('New'),
    source: Joi.string().valid('Website', 'AI Assistant', 'Phone', 'Referral', 'Other').default('Website'),
    estimated_value: Joi.number().optional(),
    preferred_contact_method: Joi.string().valid('Phone', 'Email', 'Text').default('Phone'),
    project_timeline: Joi.string().allow('').optional(),
});

// POST /api/leads - Create a new lead
router.post('/', (req, res, next) => {
  const { error, value } = leadSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newLead = {
    id: uuidv4(),
    ...value,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  };

  const sql = `INSERT INTO leads (id, name, phone, email, address, project_details, status, source, preferred_contact_method, project_timeline, created_date, updated_date)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const params = [
    newLead.id, newLead.name, newLead.phone, newLead.email, newLead.address, 
    newLead.project_details, newLead.status, newLead.source, 
    newLead.preferred_contact_method, newLead.project_timeline, 
    newLead.created_date, newLead.updated_date
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return next(new Error('Failed to create lead in database.'));
    }
    res.status(201).json({ id: newLead.id, ...value });
  });
});

// GET /api/leads - Get all leads
router.get('/', (req, res, next) => {
  const sql = "SELECT * FROM leads ORDER BY created_date DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return next(new Error('Failed to fetch leads from database.'));
    }
    res.json(rows);
  });
});

module.exports = router;