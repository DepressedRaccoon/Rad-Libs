const router = require('express').Router();
const {
    MadLibForm,
    Blank,
    MadLibInstance,
    UserInput,
} = require('../../models');

// Create a set of UserInput(s) and associate
// them with a MadLibInstance (without a completed_text
// after this route). If this request is successful, i.e.,
// if a MadLibInstance and it's associated UserInput(s)
// are successfully created, then the client JS will
// redirect to '/radlibs/:id' (homeRoutes.js), where
// the user will have the option to save the completed
// text of the madlib as displayed in the handlebars template.
router.post('/', async (req, res) => {

});

// Use PUT to add completed_text to the MadLibInstance
// if user so chooses. Send information to the client JS
// that indicates whether MadLibInstance with :id has
// a completed_text.  If completed_text is NULL, show
// the user a save button.
router.put('/:id', async (req, res) => {

});

module.exports = router;