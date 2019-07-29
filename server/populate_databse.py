from database_setup import User, Base, Item, Category
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


engine = create_engine('sqlite:///itemcatalog.db',
                       connect_args={'check_same_thread': False})
Session = sessionmaker(bind=engine)
session = Session()

user1 = User(
    name='Oscar',
    email='oscar.vial55@gmail.com',
    picture='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABHCAMAAACTZfGgAAAAZlBMVEX///8QEBAAAAANDQ0ICAj7+/vx8fHu7u739/fY2NhgYGDl5eU5OTkuLi7Q0NDe3t5nZ2eDg4NCQkJTU1N6enqqqqpaWlrHx8cdHR1ISEiQkJBxcXG6urpsbGyYmJixsbGhoaEkJCSsxu45AAADO0lEQVRYheVX2YKrIAzVQLVurVaty9jq/P9PDoJIEFQ683Zv3ozkkISTEDzvP5ZrEIbB5W8Qt7rqMgJM/Kys6uhXKEH9nBGAEuL7hFAOlw+funbLmR1D0GV27uv+AUyTWlBWrNI1xHvJgjgQgFfogtMfwwio+hQmeZzC8ADj6zFOc+7O4lSbHOGMezm2hdfs49TuOHN4u0i1Y1hnSMNnODOSlZyJjIsXw5H5+h9829ll8m9eF90us1nNlX3dybVPE6eSXnB/k15CiXKlywe0U4izYDLzJn/Rb6G4Frz4gWSPrksz8QGTqP5QOkxgWy0ZlXvEa9LKvI6C5eMSNlOcBwfLhYxreqGwncRWnmq93gtauv7oXYBiBVRiPaKQm0clMsAuoZK3nagpa46YwZdS3xEBCT1pEIYBKIMe6eHbASjBfIVx1acU4Ts19wZvnSt8pHU6NM/LlQ2h8o4abMrT4NDm8tyKTw9/FkyA0aK7uQLVlt0xKRyOTMjdpN5VnSVtXXGYlQJ6CFWgVDR1Brqo7UkrTij5M9CSEAyUfRDaERDxnYFQQiRQiLn1m1OTLL5iIOcxajATcvFVKTvMK4vgcugWXYd08aE1Eltr+8J5Cw7NV4lwPt6LsrYpT+SFbeQwEWmN08kl3URekjjbjllKsUMPq59OPTLXDFQ2cAd2aG6Xp74ecY/w2Ogy+EB6SMum1XEe6B+/j2j2fpcw0wMg3u2UQwfU14BG9JeX29zomlGkEaCthmRzEVyjMTemOarXOR+zoEu8cFh4zucrjVQvsD10YNKAAr4C2MVSq0ajRa+1sl2HPO8Nwo3Aq6Z1rhtsazYObdbIWZRdvw1LPd+awGZJYgJZ6LuQngV3i4eWD4wGn4zYrAUlIppbQuRNzTjeGuNVltKtQ9bZX3QTftf2QZN5lcGl7RNsr1Xwq5vS/ZfmBgiqnXUXTiEK/d5LUweC1+6Ooumyx0ZXTNM7NzbUgPDsaIroD0SM+fn2rzbZnXSbtypJ03UFBCYRtxL5K7ENskkgAunhi3aRYinwPSAW+OQAwySJeZWbo/t8lzGYyvHKYhK9rMnmj63CJSol4dR1RsNt0nJ0njL+HfkB1B4hIvkN3asAAAAASUVORK5CYII='
)

session.add(user1)
session.commit()

category1 = Category(
    name='Action',
    user=user1
)

session.add(category1)
session.commit()

item1 = Item(
    name='BulletStorm',
    description='Mindless Violence' ,
    category=category1,
    user=user1
)

session.add(item1)
session.commit()

print('nuke and poplate database with prepopulated data')