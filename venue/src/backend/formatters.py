from models import *

def formatUser(user: User):
    return {
        'id': user.id,
        'name': user.first_name + ' ' + user.last_name,
        'email': user.email,
        'password': user.password
    }

def formatVenue(venue: Venue):
    return {
        'id': venue.id,
        'name': venue.name,
        'description': venue.description,
        'price': venue.price
    }

def formatReservation(reservation: Reservation):
    return {
        'id': reservation.id,
        'date': reservation.date,
        'slot': reservation.slot,
        'user_id': reservation.user_id,
        'venue_id': reservation.venue_id
    }