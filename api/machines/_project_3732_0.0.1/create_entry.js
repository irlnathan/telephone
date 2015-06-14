module.exports = {
  "inputs": {
    "name": {
      "example": "Irl",
      "friendlyName": "name",
      "required": true
    },
    "email": {
      "example": "nikola@tesla.com",
      "friendlyName": "email",
      "required": true
    },
    "phone": {
      "example": "512-555-1234",
      "friendlyName": "phone",
      "required": true
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
    }
  },
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.entry.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_entry"
};