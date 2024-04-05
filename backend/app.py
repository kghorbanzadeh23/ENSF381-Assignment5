

from flask import Flask, request, jsonify, redirect

app = Flask(__name__)

# Temporary storage for users
users = []

# Sample products data
products = [
    {
        "id": 1,
        "name": "Product 1",
        "description": "Description for Product 1",
        "price": 10.99,
        "image": 'images/product1.png'
    },
    {
        "id": 2,
        "name": "Product 2",
        "description": "Description for Product 2",
        "price": 20.99,
        "image": 'images/product2.jpg'
    },
    # Add other products here...
]

# User Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({'error': 'Missing fields'}), 400

    for user in users:
        if user['username'] == username:
            return jsonify({'error': 'Username already exists'}), 400

    users.append({
        'username': username,
        'password': password,
        'email': email
    })
    return jsonify({'message': 'User registered successfully'}), 201

# User Authentication API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({'message': 'Login successful'}), 200

    return jsonify({'error': 'Invalid credentials'}), 401

# Product API
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products), 200

# Redirect to login if accessing products without authentication
@app.route('/products')
def products_redirect():
    return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)

           