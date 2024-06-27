from __future__ import annotations
from sqlalchemy import  ForeignKey, Integer, String, Date
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'users'
    id = mapped_column(Integer, primary_key=True)
    first_name = mapped_column(String, nullable=False)
    last_name = mapped_column(String, nullable=False)
    email = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

class Venue(Base):
    __tablename__ = 'venues'
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)
    price = mapped_column(Integer, nullable=False)

    def __init__(self, name, description, price):
        self.name = name
        self.description = description
        self.price = price

class Reservation(Base):
    __tablename__ = 'reservations'
    id = mapped_column(Integer, primary_key=True)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    slot: Mapped[String] = mapped_column(String, nullable=False)
    user_id:  Mapped[int] = mapped_column(ForeignKey("users.id"))
    venue_id:  Mapped[int] = mapped_column(ForeignKey("venues.id"))

    def __init__(self, date, slot, user_id, venue_id):
        self.date = date
        self.slot = slot
        self.user_id = user_id,
        self.venue_id = venue_id
