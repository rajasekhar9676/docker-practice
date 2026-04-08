const Requirement = require('../models/Requirement');

// CREATE - Add Requirement
const addRequirement = async (req, res) => {
  try {
    const { product, quantity, notes } = req.body;
    const buyerId = req.buyer.id;
    
     console.log("👤 Buyer from token:", req.buyer);
    console.log("📦 Creating Requirement with:", {
      buyerId,
      product,
      quantity,
      notes
    });
    const requirement = new Requirement({
      buyerId,
      product,
      quantity,
      notes,
    });

    await requirement.save();
    
    res.status(201).json({ message: 'Requirement added successfully', requirement });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get Buyer Requirements
const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({ buyerId: req.buyer.id });
    res.status(200).json(requirements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Requirements
const getAllRequirements = async (req, res) => {
  try {
    const products = await Requirement.find().populate('buyerId', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Requirement
const updateRequirement = async (req, res) => {
  try {
    const { product, quantity, notes } = req.body;
    const updatedRequirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      { product, quantity, notes },
      { new: true }
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    res.status(200).json({ message: 'Requirement updated', updatedRequirement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Requirement
const deleteRequirement = async (req, res) => {
  try {
    const deletedRequirement = await Requirement.findByIdAndDelete(req.params.id);

    if (!deletedRequirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    res.status(200).json({ message: 'Requirement deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRequirementWithBuyer = async (req, res) => {
  try {
    const requirement = await Requirement
      .findById(req.params.id)
      .populate({
        path: 'buyerId',
        select: 'name email phoneNumber address businessType preferredProducts'
      });

    if (!requirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    res.status(200).json(requirement); // Return full requirement with buyer populated
  } catch (err) {
    console.error('Error in getRequirementWithBuyer:', err);
    res.status(500).json({ message: err.message });
  }
};


// controller: requirementController.js

// const getRequirementDetails = async (req, res) => {
//   try {
//     const requirement = await Requirement.findById(req.params.id).populate({
//       path: 'buyerId',
//       select: 'name email phoneNumber address businessType preferredProducts'
//     });

//     if (!requirement) {
//       return res.status(404).json({ message: 'Requirement not found' });
//     }

//     res.status(200).json(requirement); // 🔁 Full requirement + buyer details
//   } catch (error) {
//     console.error('Error in getRequirementDetails:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  addRequirement,
  getRequirements,
  getAllRequirements,
  updateRequirement,
  deleteRequirement,
  getRequirementWithBuyer,
  // getRequirementDetails
};
