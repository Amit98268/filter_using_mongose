var Production= require('./schema.js');


///-------all Data Will BE obtain When ORder is Create by Admin/sales /Production Management

exports.create = async (req, res) => {
    qwe = req.body
    feet=304.8 //1 feet=304.8mm
    const user = new Production_incharge({
        products: req.body.products,
        company: qwe.company,
        grade: qwe.grade,
        topcolor: qwe.topcolor,
        coating: qwe.coating,
        temper: qwe.temper,
        guardfilm: qwe.gauardfilm,
        thickness: qwe.thickness,
        width: qwe.width,
        length: qwe.length,
        pcs: qwe.pcs,
        weight:qwe.weight,    //Density----> 7.84e-6 = 7.84 x 10-6 = 0.00000784    kg/mm^3
        approx_weight:qwe.approx_weight,
        product: qwe.product,
        batch_number: 'Batch' + '-' + qwe.thickness + '-' + qwe.product,
        ready_production: qwe.ready_production,
        vehical_no: qwe.vehical_no,
        vendor: qwe.vendor,
        production_incharge_name: qwe.production_incharge_name,
        assign_date: qwe.assign_date,
        thickness_selected: qwe.thickness_selected,
        width_selected: qwe.width_selected,
        color_selected: qwe.color_selected,
        company_name_selected: qwe.company_name_selected,
        completion_date: qwe.completion_date,
        batch_assign: qwe.batch_assign,
        note: qwe.note,
        density:qwe.density,
        approx_length_in_batch:((qwe.weight)/((qwe.thickness)*(qwe.width)*(qwe.density))),    //7.84e-6
        approx_weight_per_mm:((qwe.density*(qwe.thickness*qwe.width))) ,  
        pcs_cut:qwe.pcs_cut,
        length_per_pcs_cut:qwe.length_per_pcs_cut,                            
        approx_weight_cut:(qwe.density) * (qwe.thickness) * (qwe.width) * (qwe.pcs_cut) * (qwe.length_per_pcs_cut),
        total_length_cut:(qwe.pcs_cut*qwe.length_per_pcs_cut),
                                          

    
    });

    try {

        const Inventor = await user.save();
        res.status(201).json({ "status": 200, "msg": 'Sucessfully created', Inventor });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};


//---------------------------------------------------------//

//thikness-width-length-color for filter will be get by order

exports.batch_list = async (req, res) => {
    try {

        let thikness_sel = req.body.thickness_selected;
        let width_sel = req.body.width_selected;
        let color_sel = req.body.color_selected;
        
        const List = await Production.find({
            $and: [
                { width: { $eq: width_sel } },
                { thickness: { $eq: thikness_sel } },
                { topcolor: { $eq: color_sel } }
            ]
        })

        res.json({ "status": 200, "msg": 'data has been fetched', "list-data": List });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.batch_get_all = async (req, res) => {
    try {
            let all = mongo.ObjectId(req.params.batch_number);
            const List = await Production.find({all},{_id:1,weight:1,used:1,remaning:1})
            
            res.json({ "status": 200, "msg": 'data has been fetched', "list-data": List });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
};




//arrange  (batch) roll by weight in  assending order
//To specify sorting order 1 and -1 *are used.
// 1 is used for ascending order while -1 is used for descending order.

exports.batch_getbyweight = async (req, res) => {
    try {
            let thikness_sel = req.body.thickness_selected;
            let width_sel = req.body.width_selected;
            let color_sel = req.body.color_selected;
            let company_sel = req.body.company_selected;

            const List = await Production.find({
                
                    $and:[
                            { width: { $eq: width_sel } },
                            { thickness: { $eq: thikness_sel } },
                            { topcolor: { $eq: color_sel } }
                         ]
        }).sort({ weight: 1 })

    res.json({ "status": 200, "msg": 'data has been fetched', "list-data": List });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}


exports.batch_sort_by_weight_all_batch = async (req, res) => {
    try {
            

            const List = await Production.find({}).sort({ weight: 1 })

    res.json({ "status": 200, "msg": 'data has been fetched', "list-data": List });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}


        exports.edit= async (req, res) => {
            try {
                const updatedUser = await Production_incharge.findById(req.params.batch_number).exec();

                updatedUser.set(req.body);
                const updateSalesorder = await updatedUser.save();
                res.status(201).json({ "status": 200, "msg": 'record sucessfully updated', res:updatedUser });
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        
        }

        // DElete by ID
exports.delete = async (req, res) => {
    try {
        await Production.findOneAndDelete(req.params.id).deleteOne();
        res.json({ message: "eNTRY has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}






//--------------------> get  by ID

exports.getbyid = async (req, res) => {
    const StockList = await stock.findById(req.params.id);
    res.json({ "status": 200, "msg": 'data has been fetched', res: StockList });
}


exports.get = async (req, res) => {
    const StockList = await Production_incharge.find(req.params.id);
    res.json({ "status": 200, "msg": 'data has been fetched', res: StockList });
}






//-----------------------**------------------**----------------------**----------------


exports.filter_in_stock = async (req, res) => {
    try {
            let thikness_sel = req.body.thickness_selected;
            let width_sel = req.body.width_selected;
            let color_sel = req.body.color_selected;
            
            const List = await Production.find(
                {
                  $or:[
                        { thickness: { $eq: thikness_sel }},

                       { width: { $eq: width_sel }},

                        { topcolor: { $eq: color_sel }},

                        {$and:[  { width: { $eq: width_sel } },
                                     { thickness: { $eq: thikness_sel } },
                                     {topcolor: { $eq: color_sel } }
                                  ]
                            }
                            
                ]
            })
                

    res.json({ "status": 200, "msg": 'data has been fetched', "list-data": List });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}























