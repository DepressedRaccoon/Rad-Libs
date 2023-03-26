const router = require('express').Router();
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

        // TODO: Remove
        console.log(userMadLibs);

        res.render('homepage', {
            userMadLibs,
            // logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get one MadLibInstance (incomplete)
router.get('/radlibs/:id', async (req,res) => {
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

        // TODO: Remove
        console.log(inputs);

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
        
        // TODO: Remove
        console.log("***template***", madLib.madlib_form.template_name);

        res.render('madlib', {
            // whichTemplate must be a function for handlebars dynamic partials
            whichPartial: function() { 
                return madLib.madlib_form.template_name; 
            },
            title: madLib.madlib_form.title,
            blanks: inputs,
            // logged_in: req.session.logged_in,
        });            

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// Get login route 

router.get('/login', (req,rest) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

module.exports = router; 