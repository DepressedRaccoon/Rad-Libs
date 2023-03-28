const router = require('express').Router();
const {
    MadLibForm,
    Blank,
    MadLibInstance,
    UserInput,
} = require('../../models');
const withAuth = require('../../utils/auth');
const { body, check, validationResult } = require('express-validator');

// Create a set of UserInput(s) and associate
// them with a MadLibInstance (without a completed_text
// after this route). If this request is successful, i.e.,
// if a MadLibInstance and it's associated UserInput(s)
// are successfully created, then the client JS will
// redirect to '/radlibs/:id' (homeRoutes.js), where
// the user will have the option to save the completed
// text of the madlib as displayed in the handlebars template.
router.post(
    '/', 
    withAuth,
    body('inputs').isArray(),
    check('inputs.*.content').isString().notEmpty(),
    check('inputs.*.blank_id').notEmpty().isInt(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        try {
            // Retrieve parent MadLibForm id stored on session
            // in /radlibs/form/:id route (../homeRoutes.js)
            const madLibFormId = req.session.madLibFormId;
            const userId = req.session.user_id;

            const madLibInstance = await MadLibInstance.create({
                madlib_form_id: madLibFormId,
                user_id: userId,
            });
            // Add just created MadLibInstance ID to information
            // provided for each UserInput by POST request
            for (const input of req.body.inputs) {
                await UserInput.create({
                    ...input,
                    madlib_instance_id: madLibInstance.id,
                });
            }

            res.status(201).json({
                success: true,
                radlibId: madLibInstance.id
            });

        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
});

// Use PUT to add completed_text to the MadLibInstance
// if user so chooses. Send information to the client JS
// that indicates whether MadLibInstance with :id has
// a completed_text.  If completed_text is NULL, show
// the user a save button.
router.put(
    '/:id', 
    withAuth,
    body('completed_text').isString().notEmpty(),
    async (req, res) => {

});

module.exports = router;