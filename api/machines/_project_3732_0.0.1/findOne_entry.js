module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Entry instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "name": "Irl",
        "email": "nikola@tesla.com",
        "phone": "512-555-1234",
        "id": 123,
        "createdAt": "2015-06-14T16:48:39.628Z",
        "updatedAt": "2015-06-14T16:48:39.628Z"
      }
    },
    "error": {
      "example": undefined
    },
    "notFound": {
      "void": true
    }
  },
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.entry.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_entry"
};