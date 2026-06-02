const Joi = require('joi');

const countsSchema = Joi.object({
  ulbid: Joi.number().required()
});

const deptWiseApplicationsSchema = Joi.object({
  ulbid: Joi.number().required()
});

const tatWisePendingSchema = Joi.object({
  ulbid: Joi.number().required()
});

const monthwiseApplicationTrendSchema = Joi.object({
  ulbid: Joi.number().required()
});

module.exports = {
  countsSchema,
  deptWiseApplicationsSchema,
  tatWisePendingSchema,
  monthwiseApplicationTrendSchema
};
