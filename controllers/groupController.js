const Group = require('../models/GroupModel').model;
const Student = require('../models/StudentModel').model;

// controller for GET /
const groupHome =
    async (req,res) => {
        res.render('groups',{
                title : 'Groupes'
            });
    }

// controller for GET /:groupId
const getGroup =
    async (req,res) => {
        const group = await Group.find({number : req.params.groupId} );
        let students = [];
        for (const element of group) {
            const tmp = await Student.findById(element.student)
            students.push(tmp)
        }
        res.status(200).json({groupNb: req.params.groupId, students: students});
    }

// controller for PUT /
const updateGroup =
    async (req, res) => {
        const updatedGroupData = { ...req.body };
        const updatedGroup = await Group.findOneAndUpdate( {student: updatedGroupData.student}, {number: updatedGroupData.group}, { new : true } );
        res.status(200).json({'group' : updatedGroup, 'message' : {'type' : 'success', 'message' : "Le groupe a bien été mise à jour."}});
    }

module.exports.groupHome = groupHome;
module.exports.getGroup = getGroup;
module.exports.updateGroup = updateGroup;
