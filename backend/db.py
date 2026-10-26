import pymysql


def get_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        passwd='1119697500Vanesa',
        database='activos',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor,
    )
