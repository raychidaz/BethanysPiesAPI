// Bring in the express server and create an application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// Use the express Router object
let router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Create GET to return a list of all pies
router.get('/', (request, response, next) => {
  pieRepo.get(
    function (data) {
      response.status(200).json({
        status: 200,
        statusText: 'OK',
        message: 'All pies retrieved.',
        data: data,
      });
    },
    function (err) {
      next(err);
    },
  );
});

// Create GET/search?id=n&name=str to search for pies by 'id and/or 'name
router.get('/search', function (req, res, next) {
  let searchObject = {
    id: req.query.id,
    name: req.query.name,
  };

  pieRepo.search(
    searchObject,
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: 'All pies retrieved',
        data: data,
      });
    },
    function (err) {
      next(err);
    },
  );
});

// Create GET/id to return single pie
router.get('/:id', function (req, res, next) {
  pieRepo.getById(
    req.params.id,
    (data) => {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: 'Single pie retrieved.',
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: 'Not Found',
          message: `The pie ${req.params.id} could not be found.`,
          error: {
            code: 'NOT FOUND',
            message: `The pie ${req.params.id} could not be found.`,
          },
        });
      }
    },
    function (err) {
      next(err);
    },
  );
});

// Create POST endpoint to inert data
router.post('/', function (req, res, next) {
  pieRepo.insert(
    req.body,
    (data) => {
      res.status(201).json({
        status: 201,
        statusText: 'Created',
        message: 'New pie added',
        data,
      });
    },
    function (err) {
      next(err);
    },
  );
});

// Create PUT endpoint to update data
router.put('/:id', function (req, res, next) {
  pieRepo.getById(
    req.params.id,
    (data) => {
      if (data) {
        // Attempt to updatae data
        pieRepo.update(req.body, req.params.id, (data) => {
          res.status(200).json({
            status: 200,
            statusText: 'OK',
            message: `Pie ${req.params.id} updated`,
            data: data,
          });
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: 'Not Found',
          message: `The pie ${req.params.id} could not be found`,
          error: {
            code: 'NOT FOUND',
            message: `The pie ${req.params.id} could not be found`,
          },
        });
      }
    },
    function (err) {
      next(err);
    },
  );
});

// Create DELETE endpoint to delete data
router.delete('/:id', function (req, res, nex) {
  pieRepo.getById(
    req.params.id,
    (data) => {
      if (data) {
        // Attempt to delete the data
        pieRepo.delete(req.params.id, (data) => {
          res.status(200).json({
            status: 200,
            statusText: 'OK',
            message: `The pie at ${req.params.id} is deleted`,
            data: `Pie ${req.params.id} deleted`,
          });
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: 'Not Found',
          message: `The pie ${req.params.id} could not be found`,
          error: {
            code: 'NOT FOUND',
            message: `The pie ${req.params.id} could not be found`,
          },
        });
      }
    },
    function (err) {
      next(err);
    },
  );
});

// Create PATCH endpoint to Patch data - call update with partial data
router.patch('/:id', function (req, res, next) {
  pieRepo.getById(req.params.id, (data) => {
    if (data) {
      // Attempt to update data
      pieRepo.update(req.body, req.params.id, (data) => {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: `Pie ${req.params.id} patched`,
          data: data,
        });
      });
    }
  });
});
// Configure router so all routes are prefixed with  /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
var server = app.listen(5000, () => {
  console.log('Node server is running  on http://localhost:5000..');
});
