const con = require('./connection.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * FETCH CUSTOMERS
 */
app.get('/customers', (req, res) => {
    con.query('SELECT * FROM customers ORDER BY id desc', function(err, rows) {
        if (err) throw err;
        res.json({
            'status': true,
            'message': 'Customers Lists',
            'data': rows
        });
    });
});

/**
 * FETCH CUSTOMER BY ID
 */
app.get('/customer/data', function(req, res) {
    var id = req.fields.id;
    con.query("SELECT * FROM customers WHERE id = '" + id + "'", function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                'status': true,
                'message': 'Data Fetched.',
                'data': result
            });
        } else {
            res.json({
                'status': false,
                'message': 'No data found',
            });
        }
    });
});

/**
 * ADD CUSTOMER
 */
app.post('/customer/data', function(req, res) {
    var name = req.fields.name;
    var address = req.fields.address;
    var phone = req.fields.phone;

    var sql = "INSERT INTO customers (name, address, phone) VALUES ('" + name + "', '" + address + "', '" + phone + "')";
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.affectedRows != 0) {
            res.json({
                'status': true,
                'message': 'Datas Added',
                'data': {
                    'name': name,
                    'address': address,
                    'phone': phone
                }
            });
        } else {
            res.json({
                'status': false,
                'message': 'Data Update failed'
            });
        }
    });
});

/**
 * UPDATE CUSTOMER DETAIL
 */
app.put('/customer/data', function(req, res) {
    var id = req.fields.id;
    var name = req.fields.name;
    var address = req.fields.address;
    var phone = req.fields.phone;

    var sql = "UPDATE customers SET name = '" + name + "' , address = '" + address + "', phone = '" + phone + "'  WHERE id = '" + id + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.affectedRows != 0) {
            res.json({
                'status': true,
                'message': 'Datas Updated',
                'data': {
                    'id': id,
                    'name': name,
                    'address': address,
                    'phone': phone
                }
            });
        } else {
            res.json({
                'status': false,
                'message': 'Data Update failed'
            });
        }
    });
});

/**
 * DELETE CUSTOMER
 */
app.delete('/customer/data', function(req, res) {
    var id = req.fields.id;
    var sql = "DELETE FROM customers WHERE id = '" + id + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.affectedRows != 0) {
            res.json({
                'status': true,
                'message': 'Datas Deleted',
            });
        } else {
            res.json({
                'status': false,
                'message': 'Data Delete failed'
            });
        }

    });
});



app.listen(8000, () => {
    console.log("listening to port 8000");
});