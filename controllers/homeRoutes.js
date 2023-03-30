const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const { Op } = require('sequelize');
const {
    User, 
    MadLibForm,
    Blank,
    MadLibInstance,
    UserInput,
} = require('../models'); 

// Get all info for homepage (incomplete)
router.get('/', async (req, res) => {
    // Temporary / route for example purposes
    try {
        const userMadLibsData = await MadLibInstance.findAll({
            attributes: ['completed_text'],
            include: [
                { model: User, attributes: ['name'] },
                { model: MadLibForm, attributes: ['title'] }
            ],
        });

        const userMadLibs = userMadLibsData.map((madLib) => {
            return madLib.get({ plain: true });
        });

        res.render('homepage', {
            userMadLibs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get one MadLibInstance 
router.get('/radlibs/:id', withAuth, async (req,res) => {
    try {
        const madLibId = req.params.id;
        const inputData = await UserInput.findAll({
            where: {
                'madlib_instance_id': madLibId,
            },
        });

        const inputs = inputData.map((blank) => {
            return blank.get({ plain: true });
        });

        const madLibInstance = await MadLibInstance.findByPk(madLibId, {
            include: [
                { 
                    model: MadLibForm,
                    attributes: [
                        'title', 'template_name' 
                    ],     
                },
            ],
            plain: true,
        });

        if (!madLibInstance) {
            res.status(404).json({
                message: `RadLib with id ${madLibId} not found.`,
            });
            // exit
            return;
        }

        // convert to a plain js object
        const madLib = madLibInstance.get({ plain: true });

        let isCompletedTextEmpty = true;
        if (madLib.completed_text) {
            isCompletedTextEmpty = false;
        }

        res.render('madlib', {
            // whichTemplate must be a function for handlebars dynamic partials
            whichPartial: function() { 
                return madLib.madlib_form.template_name; 
            },
            title: madLib.madlib_form.title,
            blanks: inputs,
            radlibId: madLib.id,
            isCompletedTextEmpty, 
            logged_in: req.session.logged_in,
        });            

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// RadLibs menu route
router.get('/radlibs/form/all', withAuth, async (req, res) => {
    try {
        const madLibFormData = await MadLibForm.findAll({
            attributes: ['id', 'title']
        });

        const madLibForms = madLibFormData.map((madlib) => {
            return madlib.get({ plain: true });
        });

        res.render('radlibs-menu', {
            logged_in: req.session.logged_in,
            radlibs: madLibForms,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/radlibs/form/:id', withAuth, async (req, res) => {
    try {
        const formId = req.params.id;
        const madLibFormData = await MadLibForm.findByPk(formId);
        const blanksData = await Blank.findAll({
            where: { madlib_form_id: formId },
        });

        // Store MadLibForm's id on session for use by
        // POST /api/radlibs controller (./api/radLibRoutes.js)
        req.session.madLibFormId = formId;

        const blanks = blanksData.map((blank) => {
            return blank.get({plain : true})
        });

        res.render('radlib-form', {
            title: madLibFormData.dataValues.title,
            blanks,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        console.error(err);
    }
}); 

// Get login route 
router.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

// Get all RadLibs created by a user
router.get('/radlibs', withAuth, async (req, res) => {
    try {
        const madLibInstanceData = await MadLibInstance.findAll({
            where: {
                completed_text: {
                    [Op.ne]: null,
                },
            },
            include: [
                {
                    model: User,
                    attributes: [ 'name' ],
                },
                {
                    model: MadLibForm,
                    attributes: [ 'title' ],
                },
            ],
        });

        const madLibInstances = madLibInstanceData.map((madlib) => {
            return madlib.get({ plain: true });
        });

        res.render('completed-radlibs', {
            logged_in: req.session.logged_in,
            radlibs: madLibInstances,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router; 