from database_setup import User, Base, CategoryItem, Category
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


engine = create_engine('sqlite:///itemcatalog.db',
                       connect_args={'check_same_thread': False})
Session = sessionmaker(bind=engine)
session = Session()

user1 = User(
    id="YmbtHXbERrUn2wbT3hD2JhZr3Mh2",
    name='Oscar',
    email='oscar.vial55@gmail.com',
    picture='iAmAnImage'
)

session.add(user1)
session.commit()

category1 = Category(
    id=3,
    name='Racing',
    user=user1
)

session.add(category1)
session.commit()

category2 = Category(
    id=1,
    name='Action',
    user=user1
)

session.add(category2)
session.commit()

category3 = Category(
    id=2,
    name='Adventure',
    user=user1
)

session.add(category3)
session.commit()

category4 = Category(
    id=4,
    name='MMO',
    user=user1
)

session.add(category4)
session.commit()

category5 = Category(
    id=5,
    name='Battle royal',
    user=user1
)

session.add(category5)
session.commit()

item1 = CategoryItem(
    id=141,
    name='BulletStorm',
    description='Mindless Violence',
    category=category2,
    user=user1
)

session.add(item1)
session.commit()

item2 = CategoryItem(
    id=2,
    name='Project Card',
    description='Simulation racer',
    category=category1,
    user=user1
)

session.add(item2)
session.commit()


item2 = CategoryItem(
    id=4387,
    name='test',
    description='hi' ,
    category=category2,
    user=user1
)

session.add(item2)
session.commit()

print('DB loaded')
