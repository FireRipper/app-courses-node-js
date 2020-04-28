# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/FireRipper/app-courses-node-js/compare/v1.0.1...v1.1.0) (2020-04-28)


### Features

* **auth:** add route auth - for display page login or register. Add new part of menu - Login to navbar.hbs. Register new routes in index.js. ([9a68160](https://github.com/FireRipper/app-courses-node-js/commit/9a6816038cd64eccbc253c21aa01056d05a9216b))
* **csrf protection:** add package - csurf for generate unique csrf token for users. Use middleware csrf in index.js. Add hidden field with name '_csrf' to all forms which sent post request. ([4259a49](https://github.com/FireRipper/app-courses-node-js/commit/4259a4929f02286b4e5aa6382afd8956bad0794d))
* **middleware and session:** add package - express-session; add middleware for check auth user; add 2 requests (get and post) to auth.js for login user in app. Add session and save session. Add possibility logout for user. ([32d60c3](https://github.com/FireRipper/app-courses-node-js/commit/32d60c339414b3b45a0a763470315458f2cf84af))
* **process error:** add package - connect-flash. Add display errors - when user made some mistakes when registering or logining. ([8661f44](https://github.com/FireRipper/app-courses-node-js/commit/8661f444f51948ff3f88cb2f13004aa3fea15eba))
* **protected authorization:** add package - bcryptjs for hashed password, add field password to model user, add field "Your name" to login.hbs, and change logic processing register and login users with use DB (save, check user in DB). ([e550bac](https://github.com/FireRipper/app-courses-node-js/commit/e550bac901cad2b2ce7fa86220bf8fa66a07c22e))
* **protected routes:** add middleware - auth for protecting routes (add, card, courses and orders). ([bcacecc](https://github.com/FireRipper/app-courses-node-js/commit/bcacecc7c1768b668e246f990687f7a983fe2dc2))
* **reset password - logic:** add 2 requests get and post for reset - first get request for display form with button for reset and second post request - add logic for reset password. ([0a7653b](https://github.com/FireRipper/app-courses-node-js/commit/0a7653b1c28dd656cb5624fb48147daa49e7646a))
* **reset password - logic:** add get request with token for reset password and add view password for input new user password and refresh old password on new password. Add some protection for to go page password and add logic for check lifetime token in db. ([f298145](https://github.com/FireRipper/app-courses-node-js/commit/f298145987e5f7ab369fe782589dc76bfc9d295d))
* **reset password without logic:** add layout letter for reset password. Add to model User new fields - resetToken, resetTokenExp (lifetime). Add view reset.hbs; add to login.hbs - link for reset password. ([036c705](https://github.com/FireRipper/app-courses-node-js/commit/036c70555f05bf4ea9eced9da86c9607433bff1e))
* **save session:** add package connect-mongodb-session for save session in DB; change access to buttons on page all-courses for register (has access to buttons 'edit course' and 'buy course') and unregister (has access to only one button it's view information about 1 course) users. ([2c5e232](https://github.com/FireRipper/app-courses-node-js/commit/2c5e2328597ab1354c50cc6dacf8accd04ca89ef))
* **send mail:** add folder keys with file index.js - it's config for app. Add packages - nodemailer, nodemailer-sendgrid-transport; Use service SendGrid for sending letters. Add layout letter for registration. Sending an email to the user when he is registered. ([bed13a8](https://github.com/FireRipper/app-courses-node-js/commit/bed13a827b13af43055bfbb129884cca4798ba52))
* **view authorization:** add view login.hbs with forms - register, login. Add init element materialize in app.js ([61a64e0](https://github.com/FireRipper/app-courses-node-js/commit/61a64e0164f51c6a1a6f183eb29914b722ba855c))


### Bug Fixes

* **cart:** fix added product to cart, add middleware user.js for processing user which it'll come from collection 'session'. ([3cf9e1a](https://github.com/FireRipper/app-courses-node-js/commit/3cf9e1a48f68f9af74a3014fd64ca832c5c5a42e))
* **data:** delete folder data. ([ed03acd](https://github.com/FireRipper/app-courses-node-js/commit/ed03acdcb09497af8ab885d369d938cccbda4cf3))

### [1.0.1](https://github.com/FireRipper/app-courses-node-js/compare/v1.0.0...v1.0.1) (2020-04-15)


### Features

* **orders:** add layout for display orders, add to app.js function toDate (convert date). Refactor router orders.js - get request('/'). ([4b6a87e](https://github.com/FireRipper/app-courses-node-js/commit/4b6a87e833a51ef5d00762dd0c4460fa8f8505ef))
* **orders:** add logic to route orders.js for process order in post request('/order') and add method to user.js clear cart (when user making order, then cart will be clear). ([2bac546](https://github.com/FireRipper/app-courses-node-js/commit/2bac546df0baa7bf495197cc6c3e2ac8e1db2e6e))

## 1.0.0 (2020-04-15)


### Features

* **orders:** add new model order.js (orderSchema) reference with model 'User'. Add view orders.hbs with some text. Add router to orders.js - with post request. ([adbba00](https://github.com/FireRipper/app-courses-node-js/commit/adbba00ea51e2808c3b73ae03bf19ed403806f66))
* add to navbar new tab 'orders'. Add new router orders and add button to card 'Make order'. ([4411c22](https://github.com/FireRipper/app-courses-node-js/commit/4411c22a66aae92ca364fae07773d356652bb2d7))
* **add course to card:** add router - card.js with some methods (get and post). Use router in index.js. Add link ('Корзина') to navbar. ([554b975](https://github.com/FireRipper/app-courses-node-js/commit/554b97540b8a70fe0c6a17bfc76b758ac16af05b))
* **add course to cart:** delete model card.js, add method to userSchema - addToCart, change route card.js post('/add') ([59da25c](https://github.com/FireRipper/app-courses-node-js/commit/59da25cb7decbcbbbfec220fb46a0df68e62ad70))
* **card:** add class card - with static methods 'fetch' and 'add'. Add view for card. ([bae5617](https://github.com/FireRipper/app-courses-node-js/commit/bae5617255388abefcf2c63da42b9912a5301a09))
* **display courses:** add to courses.js - async, await Course.getAll() - get all courses from courses.json, add to render options new field 'courses', and in partials 'all-courses' - display our courses. Add clients script - app.js, format price to valid view. ([2faf79a](https://github.com/FireRipper/app-courses-node-js/commit/2faf79aaeb5259cbc6ce6d93ab956201af9c301d))
* **edit course:** add new views - course (display information about course by id), course-edit (include form with data about course), add to routes some methods - get and post to courses.js. Add styles for course.js. Add two methods to model 'course' - getById (get course by id) and update. ([f2bd3bf](https://github.com/FireRipper/app-courses-node-js/commit/f2bd3bfad1e4007e804872a027c5187d076d65df))
* **form add course:** add form on page 'add' with some fields (name course, price, url-img), add route for process post request to '/add'. ([fb47cf3](https://github.com/FireRipper/app-courses-node-js/commit/fb47cf350d04e5875a6faa012a18ad3564abede1))
* **init app:** add express.js, add handlersbars.js - a simple templating language, add routers, add views with some layouts. In index.js - add standard code for running server, connect express with handlerbars.js for using layouts. ([3b9542b](https://github.com/FireRipper/app-courses-node-js/commit/3b9542b56eabae5be46f15d697ca0a477744c061))
* **model course:** add folder data with file courses.json, add model course - process data from form, convert data to JSON and save to file courses.json. Using model in add.js (post request). ([671f64b](https://github.com/FireRipper/app-courses-node-js/commit/671f64bf16a11ff74f9e68ffa63bd4a8f5c9c44f))
* **mongoDB:** add package mongoose for connect mongoDB, and add to index.js function start ([63d5f15](https://github.com/FireRipper/app-courses-node-js/commit/63d5f15fa4d113d29593d222d4037f6c55941227))
* **remove from card:** add to model card new static method remove and add router delete to routes/card.js. ([b8f4623](https://github.com/FireRipper/app-courses-node-js/commit/b8f46235130be01381e666240e22273efb2101b7))
* **user interaction:** add temporary user(add this possibility to index.js when app starting). Add to route add.js to object Course({ userId: req.user }). Use method .populate (get user from table 'User') in route courses.js to get request 'All courses'. Add new relationship between models 'Course' and 'User' => userId. ([1fe04e8](https://github.com/FireRipper/app-courses-node-js/commit/1fe04e8cee2a4217df669eeb04eafdd50323892f))
* **view card:** add view for correct display courses or display empty basket. Change one line in index.js. ([d48e89c](https://github.com/FireRipper/app-courses-node-js/commit/d48e89c09dd10a96c90c1fca5400d872ca0eea1c))
