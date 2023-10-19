const mongoose = require('mongoose');

class UserModel {
    constructor() {
        this.schema = new mongoose.Schema({
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            email: {
                type: String
            },
            password: {
                type: String
            },
            role: {
                type: String,
                enum: ['admin', 'super-admin', 'employee'],
                default: 'employee',
            },
            designation: {
                type: String,
                enum: ['Sales', 'Developer', 'Designer', 'Manager', 'HR']
            },
            phoneNumber: {
                type: String
            },
            address: {
                street: String,
                city: String,
                state: String,
                postalCode: String,
                country: String,
            },
            deleteUserByAdmin: {
                type: Boolean,
                default: false
            },
            permissions: {
                bulkExportPdf: {
                    canView: {
                        type: Boolean,
                        default: false
                    }
                },
                contracts: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                creditNotes: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                customers: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                emailTemplates: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    }
                },
                estimates: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                expenses: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                invoices: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                items: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                knowledgeBase: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                payments: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                projects: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                proposals: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                reports: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    }
                },
                staffRoles: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                settings: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    }
                },
                staff: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                subscriptions: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                tasks: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                tasksCheckListTemplate: {
                    canViewOwn: {
                        type: Boolean,
                        default: false
                    },
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canCreate: {
                        type: Boolean,
                        default: false
                    },
                    canEdit: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                },
                leads: {
                    canViewGlobal: {
                        type: Boolean,
                        default: false
                    },
                    canDelete: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        }, {
            timestamps: true, // Adds createdAt and updatedAt timestamps
            versionKey: false
        });

        this.model = mongoose.model('users', this.schema);
    }

    getModel() {
        return this.model;
    }
}

module.exports = new UserModel().getModel();
