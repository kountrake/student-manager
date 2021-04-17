const Student = require('../models/StudentModel').model;
const Group = require('../models/GroupModel').model;

// controller for GET /
const studentHome =
    async (req,res) => {
        const allStudents = await Student.find();
        res.render('student',
            {
                title : 'Étudiants',
                students : allStudents
            });
    }
// controller for GET /:studentID
const getStudent =
    async (req,res) => {
        const student = await Student.findById( req.params.studentId );
        res.status(200).json(student);
    }

// controller for POST /
const createStudent =
    async (req,res) => {
        const newStudentData = { ...req.body };
        try {
            var newStudent = await Student.create(newStudentData);

        } catch (error) {
            res.status(200).json({'student' : null, 'message' : {'type' : 'error', 'message' : "Le numéro d'étudiant saisi existe déjà. Veuillez en saisir un qui est unique."}});
        }
        await Group.create({number : 0,student: newStudent._id})
        res.status(200).json({'student' : newStudent, 'message' : {'type' : 'success', 'message' : "L'étudiant a bien été créé."}});
    }

// controller for PUT /
const updateStudent =
    async (req, res) => {
        const updatedStudentData = { ...req.body };
        const updatedStudent = await Student.findByIdAndUpdate( updatedStudentData.id, updatedStudentData, { new : true } );
        res.status(200).json({'student' : updatedStudent, 'message' : {'type' : 'success', 'message' : "L'étudiant a bien été mise à jour."}});
    }

// controller for DELETE /:studentID
const deleteStudent =
    async (req,res) => {
        await Student.findByIdAndRemove( req.params.studentId );
        await Group.findOneAndDelete( {student: req.params.studentId} );
        res.status(200).json(null);
    }

module.exports.studentHome = studentHome;
module.exports.getStudent = getStudent;
module.exports.createStudent = createStudent;
module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;
