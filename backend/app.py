

from flask import Flask, request, jsonify, redirect, session
from flask_cors import CORS
import hashlib

app = Flask(__name__)
app.secret_key = 'start'
CORS(app)

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
    {
        "id": 3,
        "name": "Product 3",
        "description": "Description for Product 3",
        "price": 10.99,
        "image": 'images/product3.jpg'
    },
    {
        "id": 4,
        "name": "Product 4",
        "description": "Description for Product 4",
        "price": 10.99,
        "image": 'images/product4.jpg'
    },
    {
        "id": 5,
        "name": "Product 5",
        "description": "Description for Product 5",
        "price": 10.99,
        "image": 'images/product5.jpg'
    },
    {
        "id": 6,
        "name": "Product 6",
        "description": "Description for Product 6",
        "price": 10.99,
        "image": 'images/product6.jpg'
    },
    {
        "id": 7,
        "name": "Product 7",
        "description": "Description for Product 7",
        "price": 10.99,
        "image": 'images/product7.jpg'
    },
    {
        "id": 8,
        "name": "Product 8",
        "description": "Description for Product 8",
        "price": 10.99,
        "image": 'images/product8.jpg'
    },
    {
        "id": 9,
        "name": "Product 9",
        "description": "Description for Product 9",
        "price": 10.99,
        "image": 'images/product9.jpg'
    },
    {
        "id": 10,
        "name": "Product 10",
        "description": "Description for Product 10",
        "price": 10.99,
        "image": 'images/product10.jpg'
    }
]

# Hash a password for storing.
def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Check if a hashed password matches the stored hash.
def check_password(hashed_password, user_password):
    return hashed_password == hashlib.sha256(user_password.encode('utf-8')).hexdigest()

# Helper function to find a user by username
def find_user_by_username(username):
    return next((user for user in users if user['username'] == username), None)

# User Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({'error': 'Missing fields'}), 400

    if find_user_by_username(username) is not None:
        return jsonify({'error': 'Username already exists'}), 400

    hashed_password = hash_password(password)

    users.append({
        'username': username,
        'password': hashed_password,
        'email': email
    })
    return jsonify({'message': 'User registered successfully'}), 201

# User Authentication API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = find_user_by_username(username)
    if user and check_password(user['password'], password):
        session['user'] = username  # User is logged in
        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'error': 'Invalid credentials'}), 401

# Product API
@app.route('/products', methods=['GET'])
def get_products():
    if 'user' not in session:
        return redirect('/login')
    return jsonify(products), 200

# Middleware to check if user is logged in
@app.before_request
def before_request():
    if 'user' not in session and request.endpoint in ['get_products']:
        return redirect('/login')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)