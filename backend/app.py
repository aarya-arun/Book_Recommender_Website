from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, redirect, jsonify
from flaskext.mysql import MySQL
mysql = MySQL()


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


mysql.init_app(app)


app.config['MYSQL_DATABSE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] =  'aarya'
app.config['MYSQL_DATABASE_PASSWORD'] = 'aarya123'
app.config['MYSQL_DATABASE_DB'] = 'test'
app.config['CORS_HEADERS'] = 'Content-Type'

mysql = MySQL(app)

app.config["DEBUG"] = True






# sanity check route
@app.route('/api/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')



#To list an existing user's details
@app.route('/api/<uname>', methods=['GET'])
def userdetailslist(uname):
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "username": 'thisuserdoesntexist',
        "password": 'lol',
        "emailid": 'lol',
        "age": -1,
        "shelfid": -1

        }
        return jsonify(resp)
     
    resp={
    "username": row[0],
    "password": row[2],
    "emailid": row[1],
    "age": row[3],
    "shelfid": row[4]
           
    }
        
    return jsonify(resp),200



#To add a new user
@cross_origin(origin='*')
@app.route('/api/addnewuser', methods=['PUT'])
def userdetailsp():

    connection = mysql.get_db()
    cur = connection.cursor()
    username = request.json.get('username')
    password = request.json.get('password')
    emailid = request.json.get('emailid')
    age = request.json.get('age')
    cur.execute("SELECT shelfidstart from shelfid")
    shelfidstart=cur.fetchone()
    
    cur.execute("INSERT INTO users(username, password, emailid, age, shelfid) VALUES (%s, %s, %s, %s, %s)", (username, emailid, password, age,str(int(shelfidstart[0])+1)))
    cur.execute("UPDATE shelfid SET shelfidstart=(%s) WHERE shelfidstart=(%s)", (str(int(shelfidstart[0])+1), shelfidstart[0]))
    connection.commit()
    results={
        
    }
    return jsonify(results), 201




#To list an existing books's details
@app.route('/api/book/<isbn>', methods=['GET'])
def bookdetailslist(isbn):
    
    connection = mysql.get_db()
    cur = connection.cursor()
    cur.execute("SELECT * FROM books where isbn="+isbn)
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        return "This user doesn't exist",204
     
    resp={
    "authors": row[1],
    "year": row[2],
    "title": row[3],
    "rating": row[5],
    "ratingcount": row[6],
    "imageurl": row[8],
    "description": row[9]
           
    }
        
    return jsonify(resp),200






if __name__ == '__main__':
    app.run()