const router = require('express').Router();
const { madLib, blanks } = require('../models'); 

// Get all info for homepage (incomplete)
router.get('/', async (req, res) => {

})

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