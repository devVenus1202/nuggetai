const express = require('express');
const passport = require('passport');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/challenge');
const pipelineController = require('../controllers/pipeline');
const resultController = require('../controllers/result');

const requireAuth = passport.authenticate('jwt', { session: false });

const fileUpload = multer({ dest: 'public/resources/' }).fields([
  { name: 'image', maxCount: 1 },
]);

const uploadFinished = function(req, res, next) {
  next();
};

router.get('/', requireAuth, controller.getAllChallenges);
router.get('/sandbox', controller.getAllSandboxChallenges);
router.delete('/', requireAuth, controller.deleteAllChallenges);
router.post(
  '/',
  [requireAuth, fileUpload, uploadFinished],
  controller.createChallenge,
);
router.post('/getWastonKeywords', controller.getWastonKeywords);

router.get('/:challenge_id', controller.getChallenge);
router.put('/:challenge_id', requireAuth, controller.updateChallenge);
router.delete('/:challenge_id', requireAuth, controller.deleteChallenge);
router.post('/:challenge_id', requireAuth, pipelineController.createPipeline);

router.get(
  '/:challenge_id/:pipeline_id',
  requireAuth,
  pipelineController.getPipeline,
);
router.put(
  '/:challenge_id/:pipeline_id',
  requireAuth,
  pipelineController.updatePipeline,
);
router.delete(
  '/:challenge_id/:pipeline_id',
  requireAuth,
  pipelineController.deletePipeline,
);
router.post('/:challenge_id/:pipeline_id', pipelineController.createCandidate);

router.get(
  '/:challenge_id/:pipeline_id/:user_id',
  requireAuth,
  pipelineController.getCandidate,
);
router.put(
  '/:challenge_id/:pipeline_id/:user_id',
  requireAuth,
  pipelineController.updateCandidate,
);
router.delete(
  '/:challenge_id/:pipeline_id/:user_id',
  requireAuth,
  pipelineController.deleteCandidate,
);

router.get(
  '/validation/:challenge_id/:pipeline_id/:user_id',
  pipelineController.validateCandidate,
);
router.put(
  '/benchmark/:challenge_id/:pipeline_id/:user_id',
  requireAuth,
  pipelineController.benchmarkPipeline,
);
// for candidate, challenge url

router.post('/:challenge_id/:pipeline_id/:user_id', resultController.addResult);

module.exports = router;
