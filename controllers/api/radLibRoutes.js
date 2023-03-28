const router = require('express').Router();
const {
    MadLibForm,
    Blank,
    MadLibInstance,
    UserInput,
} = require('../../models');
const withAuth = require('../../utils/auth');
const { body, validationResult } = require('express-validator');

// 1. Validate Input - Return status 422 if errors
// 2. Create a MadLibInstance and associate it with its
//  parent MadLibForm (MadLibForm ID retrieved from session)
// 3. Create UserInputs from POST request body (req.body) and
//  associate them with the just created, parent MadLibInstance
// 4. Upon return response to client fetch() request, user will
//  be redirected to /radlibs/:id page, where they can choose
//  to save the completed content of the radlib.
router.post(
    '/', 
    //withAuth,
    body('inputs').isArray(),
    body('inputs.*.content').not().isEmpty().trim().escape(),
    body('inputs.*.blank_id').not().isEmpty().isInt(),
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
    //withAuth,
    body('completed_text').not().isEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        try {
            const instanceId =  req.params.id;
            const madLibInstance = await MadLibInstance.update(
                { completed_text: req.body.completed_text },
                {
                    where: {
                        id: instanceId,
                    },
                }
            );
            
            if (!madLibInstance) {
                res.status(404).json({
                    success: false,
                    message: `radlib with id ${instanceId} not found.`
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: `Successfully added text to radlib with id ${instanceId}.`
            });
        }  catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
});

module.exports = router;