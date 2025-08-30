const Joi = require('joi');
const noNumbersOnly = Joi.string()
.min(5)
.pattern(/[a-zA-Z]/) // At least one letter required
.required()
.messages({
    'string.pattern.base': `"{{#label}}" should not be just numbers`,
    'string.base': `"{{#label}}" must be a string`,
    'string.min': `"{{#label}}" should have at least 5 characters`,
    'any.required': `"{{#label}}" is required`
});

// ye to MAIN SCHEMA VALE KA HII JO POST KARTE SAMYE KOI GLTI NA KARE.
const mainSchemaJoi = Joi.object({
    title: noNumbersOnly.label("Title"),
    description: noNumbersOnly.label("Description"),
    location: noNumbersOnly.label("Location"),
    country: noNumbersOnly.label("Country"),
    price: Joi.number(),

    image: Joi.string().allow('', null).optional().label("Image")  // img ko batana padega na jaruri nhi hii hii to uplod kr do nhi to chhod do
});


// AB REVIEW VALE MEA KARNA HII TAKI USER REVIEW DETE SAMYE KEVL NUMBER NA DE PAYE.
const ReviewJio = Joi.object({
    Comment: noNumbersOnly.label("Comment"),
    rating: Joi.number().min(1).max(5).required().label("rating")  
});

module.exports = { // dono ek sath require kr liye.
    mainSchemaJoi,
    ReviewJio
};

