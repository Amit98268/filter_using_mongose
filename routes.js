var express = require('express');
var router = express.Router();

// Require controller modules.

var Contoller_x = require('./Controller');



router.post('/create',Contoller_x.create);
router.post('/byweight',Contoller_x.batch_getbyweight);
router.post('/FilterStock',Contoller_x.filter_in_stock);
router.post('/filter',Contoller_x.batch_list);
router.post('/allbysort',Contoller_x.batch_sort_by_weight_all_batch);
router.get('/allbyfilter',Contoller_x.batch_get_all);
router.get('/get',Contoller_x.get);
router.post('/update/:id',Contoller_x.edit);
router.delete('/:id',Contoller_x.delete);



module.exports = router;
