from database_setup import User, Base, Item, Category
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


engine = create_engine('sqlite:///itemcatalog.db',
                       connect_args={'check_same_thread': False})
Session = sessionmaker(bind=engine)
session = Session()

user1 = User(
    name='',
    email='',
    picture=''
)

session.add(user1)
session.commit()

category1 = Category(
    name='Japanse Performance',
    user=user1
)

session.add(category1)
session.commit()

item1 = Item(
    name='Japanse Performance',
    description='JDM ',
    category=category1,
    user=user1
)

session.add(item1)
session.commit()

print('nuke and poplate database with prepopulated data')