from flask import Flask , request , jsonify
import grocery_dao
import uom_dao
from sql_connection import get_sql_connection
import json
app = Flask(__name__)
connection = get_sql_connection()
@app.route("/getProducts" , methods = ['GET'])
def get_products():
    products = grocery_dao.get_all_products(connection)
    response = jsonify(products)
    response.headers.add("Allow-Control-Allow-Origin",'*')
    return response

@app.route('/getUOM',methods = ['GET'])
def get_uom():
    uom = uom_dao.get_uoms(connection)
    response = jsonify(uom)
    response.header.add("Allow-Control-Allow-Origin",'*')
    return response

@app.route('/deleteProducts',methods = ['POST'])
def delete_product():
    return_id = grocery_dao.delete_product(connection,request.form['product_id'])
    response = jsonify({
        'product_id':return_id
    })
    response.headers.add("Allow-Control-Allow-Origin",'*')
    return response

@app.route('/insertProduct',methods = ['POST'])
def insert_product():
    request_payload = json.load(request.form['data'])
    product_id = grocery_dao.insert_new_product(connection,request_payload)
    response = jsonify({
        'product_id':product_id
    })
    response.headers.add("Allow-Control-Allow-Origin",'*')
    return response




if __name__ == "__main__":
    print("Starting flask server for grocery store management system")
    app.run(port= 5000)