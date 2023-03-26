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

// Get one Madlib (incomplete)
router.get('/madlibs/:id', async (req,res) => {
    
})

// Get login route 

router.get('/login', (req,rest) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

module.exports = router; 