from flask import Flask, request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from flask_migrate import Migrate
from models import *
from formatters import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:9WP05FzDu7sQdOWWBmlLL3vtbWwG9dv3@db/fyqkeiac"
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_SECRET_KEY"] = "webprog"

jwt = JWTManager(app)

db = SQLAlchemy(app)
cors = CORS(app)
migrate = Migrate(app, db)
app.app_context().push()

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(engine)

@app.route('/')
def initialize():
    return 'Venues - Milica Mitrović'

# AUTH ROUTES

@app.route("/api/auth/register", methods=['POST'])
def registerUser():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    password = request.json['password']
    newUser = User(first_name=first_name, last_name=last_name, email=email, password=password)
    db.session.add(newUser)
    db.session.commit()
    return jsonify({
        "user": formatUser(newUser),
        "message": "Registered successfully!"
    }), 200

@app.route("/api/auth/login", methods=['POST'])
def loginUser():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.query(User).filter_by(email=email).one()
    if (email is None) or (password is None) or (user.password != password):
        return jsonify({'message': 'Wrong credentials!'}), 401
    access_token = create_access_token(identity=email)
    return jsonify({
        "token": access_token,
        "user": user.id,
        "message": "Logged in successfully!"
    }), 200


# VENUE ROUTES

@app.route("/api/venues", methods=['POST'])
def createVenue():
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    newVenue = Venue(name=name, description=description, price=price)
    db.session.add(newVenue)
    db.session.commit()
    return jsonify({
        "venue": formatVenue(newVenue),
        "message": "Created venue"
    }), 200

@app.route("/api/venues", methods=['GET'])
def getVenues():
    venues = db.session.query(Venue).all()
    venuesList = [formatVenue(venue) for(venue) in venues]
    return jsonify({
        "venues": venuesList,
    }), 200

@app.route("/api/venues/<id>", methods=['GET'])
def getVenue(id):
    venue = db.session.query(Venue).filter_by(id=id).one()
    return jsonify({
        "venue": formatVenue(venue)
    }), 200


# RESERVATION ROUTES

@app.route("/api/reservations", methods=['POST'])
def createReservation():
    date = request.json['date']
    slot = request.json['slot']
    user_id = request.json['user_id']
    venue_id = request.json['venue_id']
    newReservation = Reservation(date=date, slot=slot, user_id=user_id, venue_id=venue_id)
    db.session.add(newReservation)
    db.session.commit()
    return jsonify({
        "venue": formatReservation(newReservation),
        "message": "Created reservation"
    }), 200

@app.route("/api/reservations", methods=['GET'])
def getReservations():
    reservations = db.session.query(Reservation).all()
    reservationsList = [formatReservation(reservation) for(reservation) in reservations]
    return jsonify({
        "reservations": reservationsList,
    }), 200

@app.route("/api/reservations/venue/<id>", methods=['GET'])
def getReservationsByVenue(id):
    reservations = db.session.query(Reservation).filter_by(venue_id=id).all()
    reservationsList = [formatReservation(reservation) for(reservation) in reservations]
    return jsonify({
        "reservations": reservationsList
    }), 200

@app.route("/api/reservations/user/<id>", methods=['GET'])
def getReservationsByUser(id):
    reservations = db.session.query(Reservation).filter_by(user_id=id).all()
    reservationsList = [formatReservation(reservation) for(reservation) in reservations]
    return jsonify({
        "reservations": reservationsList
    }), 200

@app.route("/api/reservations/<id>", methods=['GET'])
def getReservation(id):
    reservation = db.session.query(Reservation).filter_by(id=id).one()
    return jsonify({
        "reservation": formatReservation(reservation)
    }), 200

@app.route("/api/reservations/<id>", methods=['DELETE'])
def deleteReservation(id):
    reservation = db.session.query(Reservation).filter_by(id=id).one()
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({
        "message": "Reservation cancelled"
    }), 200

if __name__ == '__main__':
    app.run()