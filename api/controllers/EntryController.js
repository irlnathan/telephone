var Machine = require("machine");
module.exports = {
    'delete_$id': function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Destroy Entry
                sails.machines['_project_3732_0.0.1'].destroy_entry({
                    "criteria": {
                        id: inputs.id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(destroyEntry) {
                        return exits.respond({
                            data: destroyEntry,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(destroyEntry) {
                        return exits.error({
                            data: destroyEntry,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'put_$id': function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
                    "required": true
                },
                "phone": {
                    "example": "abc123"
                },
                "name": {
                    "example": "Irl"
                },
                "email": {
                    "example": "nikola@tesla.com"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Update Entry
                sails.machines['_project_3732_0.0.1'].update_entry({
                    "name": inputs.name,
                    "email": inputs.email,
                    "phone": inputs.phone,
                    "criteria": {
                        id: inputs.id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(updateEntry) {
                        return exits.respond({
                            data: updateEntry,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(updateEntry) {
                        return exits.error({
                            data: updateEntry,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'post_create': function(req, res) {
        Machine.build({
            inputs: {
                "phone": {
                    "example": "a123",
                    "required": true
                },
                "name": {
                    "example": "Irl",
                    "required": true
                },
                "email": {
                    "example": "nikola@tesla.com",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Create Entry
                sails.machines['_project_3732_0.0.1'].create_entry({
                    "name": inputs.name,
                    "email": inputs.email,
                    "phone": inputs.phone
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(createEntry) {
                        return exits.respond({
                            data: createEntry,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(createEntry) {
                        return exits.error({
                            data: createEntry,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'get_$id': function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One Entry
                sails.machines['_project_3732_0.0.1'].findOne_entry({
                    "criteria": {
                        id: inputs.id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneEntry) {
                        return exits.respond({
                            data: findOneEntry,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(findOneEntry) {
                        return exits.error({
                            data: findOneEntry,
                            status: 500
                        });

                    },
                    "notFound": function(findOneEntry) {
                        return exits.respond({
                            data: "No entry found.",
                            action: "respond_with_value_and_status",
                            status: "404"
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'get_find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // List Entry
                sails.machines['_project_3732_0.0.1'].find_entry({}).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(listEntry) {
                        return exits.respond({
                            data: listEntry,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(listEntry) {
                        return exits.error({
                            data: listEntry,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};