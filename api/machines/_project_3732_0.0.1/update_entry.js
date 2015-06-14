module.exports = {
  "inputs": {
    "name": {
      "example": "Irl",
      "friendlyName": "name"
    },
    "email": {
      "example": "nikola@tesla.com",
      "friendlyName": "email"
    },
    "phone": {
      "example": "512-555-1234",
      "friendlyName": "phone"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Entry instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "name": "Irl",
        "email": "nikola@tesla.com",
        "phone": "512-555-1234",
        "id": 123,
        "createdAt": "2015-06-14T16:48:39.628Z",
        "updatedAt": "2015-06-14T16:48:39.628Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.entry.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_entry"
};