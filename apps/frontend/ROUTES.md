// Authentication routes
router.post('/instructor/login', controller.loginInstructor);
router.post('/student/request-link', controller.requestMagicLink);
router.get('/student/verify', controller.verifyMagicLink);