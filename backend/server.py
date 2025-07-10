from flask import Flask, request, jsonify
from flask_cors import CORS
import products_dao
import uom_dao
from sql_connection import get_sql_connection
import json
import orders_dao

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
connection = get_sql_connection()

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Grocery Store Management System API is running!'})

@app.route("/getProducts", methods=['GET'])
def get_products():
    products = products_dao.get_all_products(connection)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getUOM', methods=['GET'])
def get_uom():
    uom = uom_dao.get_uoms(connection)
    response = jsonify(uom)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProducts', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.insert_new_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id,
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    response = orders_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteOrder', methods=['POST'])
def delete_order():
    order_id = orders_dao.delete_order(connection, request.form['order_id'])
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting flask server for grocery store management system")
    app.run(port=200, host='127.0.0.1', debug=False) 