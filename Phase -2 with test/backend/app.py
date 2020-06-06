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

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel


books = pd.read_csv("./booksfinal.csv")
ratings = pd.read_csv("./Rating.csv")

VC = ratings['ratings_count']
VA = ratings['average_rating']
B = ratings['average_rating'].mean()
M = ratings['ratings_count'].quantile(0.80)

ratings['weighted_average']=(VC/(VC+M)*VA)+(M/(M+VC)*B)


tfv = TfidfVectorizer(min_df = 3, max_features=None, strip_accents='unicode', analyzer='word', token_pattern=r'\w{1,}', ngram_range={1,3}, use_idf=1, smooth_idf=1, sublinear_tf=1, stop_words='english')
books['book_desc']=books['book_desc'].fillna('')
tfv_mat=tfv.fit_transform(books['book_desc'])

sig=sigmoid_kernel(tfv_mat, tfv_mat)
ind=pd.Series(books.index, index=books['isbn']).drop_duplicates()





#Recommender System Code based on isbn
def recommend(isbn):
    idr=ind[isbn]
    global sig
    sig_scores=list(enumerate(sig[idr]))
    sig_scores=sorted(sig_scores, key=lambda x: x[1], reverse=True)
    m_ind=[i[0] for i in sig_scores]
    global ratings
    return ratings['isbn'].iloc[m_ind].head(3)




# sanity check route
@app.route('/api/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')






#To list an existing user's details
@cross_origin(origin='*')
@app.route('/api/users/<uname>', methods=['GET'])
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
        "shelfid": -1,
        "message": "This user doesn't exist."

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
def addnewuser():

    connection = mysql.get_db()
    cur = connection.cursor()
    username = request.json.get('username')
    password = request.json.get('password')
    emailid = request.json.get('emailid')
    age = request.json.get('age')
    cur.execute("SELECT shelfidstart from shelfid")
    shelfidfetch=cur.fetchone()

    shelfidstart = str(shelfidfetch)
    shelfidstart = shelfidstart.strip('(')
    shelfidstart = shelfidstart.strip(')')
    shelfidstart = shelfidstart.strip(',')

    shelfidint = int(shelfidstart)
    shelfidint = shelfidint + 1
   

    cur.execute("SELECT username FROM users where username='"+username+"'")
    existinguser = cur.fetchone()

    

    if existinguser != None:
        response = { "message": "This username is already taken."}
        return jsonify(response)


    cur.execute("SELECT username FROM users where email_id='"+emailid+"'")
    existinguser = cur.fetchone()

    if existinguser != None:
        response = { "message": "This email ID has already been used."}
        return jsonify(response)
        

    if len(password)<10:
        response = { "message": "This password is too weak."}
        return jsonify(response)
        

    

    cur.execute("INSERT INTO users(username, email_id, password1, age, shelf_id) VALUES (%s, %s, %s, %s, %s)", (username, emailid, password, age,str(shelfidint)))
    cur.execute("UPDATE shelfid SET shelfidstart=(%s) WHERE shelfidstart=(%s)", ( str(shelfidint), shelfidstart))
    connection.commit()
    results={

        "message": "All good."
        
    }
    return jsonify(results), 201














#To delete a user
@cross_origin(origin='*')
@app.route('/api/deluser', methods=['POST'])
def deletingauser():

    connection = mysql.get_db()
    cur = connection.cursor()
    username = request.json.get('username')
    
    cur.execute("SELECT username FROM users where username='"+username+"'")
    existinguser = cur.fetchone()

    if existinguser == None:
        return jsonify({ "message": "This user doesn't exist."})

    
    cur.execute("DELETE FROM users where username='"+username+"'")
    cur.execute("DELETE FROM popular")
    connection.commit()
    results={

        "message": "All good."
        
    }
    return jsonify(results), 201















#To list an existing books's details
@cross_origin(origin='*')
@app.route('/api/books/<isbn>', methods=['GET'])
def bookdetailslist(isbn):
    
    connection = mysql.get_db()
    cur = connection.cursor()
    cur.execute("SELECT * FROM books where isbn="+isbn)
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        return jsonify({ "message": "This book doesn't exist"})

     
    resp={
    "authors": row[1],
    "description": row[12],
    "imageurl": row[8],
    "rating": row[5],
    "ratingcount": row[6],
     "title": row[3],
     "year": row[2]
   
    
    
    
           
    }
        
    return jsonify(resp),200
















#Getting shelf details
@cross_origin(origin='*')
@app.route('/api/shelves', methods=['GET'])
def shelfdetails():
    
    if 'user' not in request.args:
        return "Error! Please provide a user."

    usn=request.args.get('user')

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()


    #Checking if user exists
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
    
    if(row==None):
        return jsonify({ "message": "This user doesn't exist"})


    
    
    #Shelves
    want_to_read = []
    have_read = []

    #Want_to_read

    cur.execute("SELECT * FROM want_to_read where username='"+usn+"'")
    row = cur.fetchall()

    for book in row:
        want_to_read.append(book[1])

  

    cur.execute("SELECT * FROM have_read where username='"+usn+"'")
    row = cur.fetchall()

    for book in row:
        have_read.append(book[1])



   

    p=[]
    q=[]

    for thing in want_to_read:
        cur.execute("SELECT image_url FROM books where isbn='"+thing+"'")
        row = cur.fetchall()
        for thing in row:
            p.append(thing[0])


    for thing in have_read:
        cur.execute("SELECT image_url FROM books where isbn='"+thing+"'")
        row = cur.fetchall()
        for thing in row:
            q.append(thing[0])
    
    

    resp={
    "want_to_read": p,
    "have_read":q
           
    }
        
    return jsonify(resp),200

















#Entering top 15 books details
@cross_origin(origin='*')
@app.route('/api/topfifteen', methods=['POST'])
def topfifteenadding():
    
   

    usn=request.json.get('username')

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()


    #Checking if user exists
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
    
    if(row==None):
        return jsonify({"message": "This user doesn't exist"})


    
    
    #topfifteen
    topfifteen = request.json.get('topfifteenlist')
    

    topfifteen = topfifteen.strip('[')
    topfifteen = topfifteen.strip(']')
    topfifteen = topfifteen.split(',')
    

    reallist=[]

    for book in topfifteen:
        j = book.strip()
        j = j.strip("'")
        reallist.append(j)


    for isbn in reallist:
        cur.execute("INSERT INTO topfifteenbooks(username, isbn) VALUES (%s, %s)", (usn, isbn))
    

    connection.commit()

    resp={
    "message": "All good."
           
    }
        
    return jsonify(resp),200
















#Entering top 5 genresdetails
@cross_origin(origin='*')
@app.route('/api/topfive', methods=['POST'])
def topfiveadding():
    
   

    usn=request.json.get('username')

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()


    #Checking if user exists
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
    
    if(row==None):
        return jsonify({ "message": "This user doesn't exist"})


    
    
    #topfifteen
    topfive = request.json.get('topfivelist')
    

    topfive = topfive.strip('[')
    topfive = topfive.strip(']')
    topfive = topfive.split(',')
    

    reallist=[]

    for book in topfive:
        j = book.strip()
        j = j.strip("'")
        reallist.append(j)


    for isbn in reallist:
        cur.execute("INSERT INTO topfivegenres(username, genre) VALUES (%s, %s)", (usn, isbn))
    

    connection.commit()

    resp={
    "message": "All good."
           
    }
        
    return jsonify(resp),200

















#To insert the popular recs to the database
@cross_origin(origin='*')
@app.route('/api/books/pop/<uname>', methods=['POST'])
def putpopularbooks(uname):
    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)
    
    global ranks
    global ratings
    ranks = ratings.sort_values('weighted_average', ascending=False)

    wavg = ranks.sort_values('weighted_average',ascending=False)
    y=wavg['isbn'].head(30)

    q = str(y)
    
    q = q.split("\n")
    r =[]
    for item in q:
        item = item.split(" ")
        for z in item:
            r.append(z)

    r = [i for i in r if i]  
    final_isbns =[]
    for i in range(len(r)):
        if i%2 !=0:
            final_isbns.append(r[i])

    final_isbns.pop()
    final_isbns.pop()

    minilist=[]
    insertlist =[]
    for isbn in final_isbns:
        minilist = []
        minilist.append(isbn)
        cur.execute("SELECT image_url FROM books where isbn='"+isbn+"'")
        row = cur.fetchall()
        minilist.append(row[0][0])
        insertlist.append(minilist)
    
    

    for thing in insertlist:
        cur.execute("INSERT INTO popular(isbn, image_url) VALUES (%s,%s)", (thing[0],thing[1] ))


    
    connection.commit()

   

    resp={
    "message": "All good."
           
    }
        
    return jsonify(resp),200








#To return popular books to frontend
@cross_origin(origin='*')
@app.route('/api/books/pop/<uname>', methods=['GET'])
def getpopularbooks(uname):
    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)
    
    
    cur.execute("SELECT * from popular")
    row = cur.fetchall()
    return jsonify(row), 200
    
















#To insert the 15-based recs to the database
@cross_origin(origin='*')
@app.route('/api/books/topfifteenrecs/<uname>', methods=['POST'])
def puttopfifteenrecs(uname):
    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    cur.execute("SELECT isbn FROM topfifteenbooks where username='"+usn+"'")
    row = cur.fetchall()

    recslist =[]
    realreclist = []

    for thing in row:
        recslist.append(thing[0])


    
    for rec in recslist:
        p = recommend(rec)
        q = str(p)
    
        q = q.split("\n")
        r =[]
        for item in q:
            item = item.split(" ")
            for z in item:
                r.append(z)

        r = [i for i in r if i]  
        final_isbns =[]
        for i in range(len(r)):
            if i%2 !=0:
                final_isbns.append(r[i])

        final_isbns.pop()
        final_isbns.pop()
        
        for item in final_isbns:
            if item not in realreclist:
                realreclist.append(item)

    minilist=[]
    insertlist=[]

    for isbn in realreclist:
        minilist = []
        minilist.append(isbn)
        cur.execute("SELECT image_url FROM books where isbn='"+isbn+"'")
        row = cur.fetchall()
        minilist.append(row[0][0])
        insertlist.append(minilist)
    
   

    
    for thing in insertlist:
        cur.execute("INSERT INTO bookrecs(username,isbn, image_url) VALUES (%s,%s,%s)", (usn, thing[0],thing[1] ))


    
    connection.commit()

    return jsonify({"message": "All good."}), 200

        








#To return top 15 recs to front end
@cross_origin(origin='*')
@app.route('/api/books/topfifteenrecs/<uname>', methods=['GET'])
def gettopfifteenrecs(uname):
    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    cur.execute("SELECT isbn, image_url FROM bookrecs where username='"+usn+"'")
    row = cur.fetchall()

    return jsonify(row),200

















#To insert the top 5 recs to the database
@cross_origin(origin='*')
@app.route('/api/books/topfiverecs/<uname>', methods=['POST'])
def puttopfifverecs(uname):

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    cur.execute("SELECT genre FROM topfivegenres where username='"+usn+"'")
    row = cur.fetchall()

    recslist =[]
    genrelist = []

    for thing in row:
        genrelist.append(thing[0])


    for genre in genrelist:
        cur.execute("SELECT isbn, image_url FROM books where genresmatch='"+genre+"' order by average_rating")
        row = cur.fetchall()
        if len(row) > 10:
            for i in range(0,10):
                recslist.append(row[i])
        else:
            for thing in row:
                recslist.append(thing)
    

    

    for rec in recslist:
        cur.execute("INSERT INTO genrerecs VALUES (%s, %s, %s)", (usn, rec[0], rec[1]))
    

    connection.commit()




    return jsonify({"message": "All good."}), 200









#To return top 5 recs to frontend
@cross_origin(origin='*')
@app.route('/api/books/topfiverecs/<uname>', methods=['GET'])
def gettopfifverecs(uname):

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=uname
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    cur.execute("SELECT isbn, image_url FROM genrerecs where username='"+usn+"'")
    row = cur.fetchall()
    return jsonify(row),200





#Add to want_to_read
@cross_origin(origin='*')
@app.route('/api/books/wannaread', methods=['POST'])
def wannaread():

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=isbn = request.json.get('username')
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    isbn = request.json.get('isbn')

    cur.execute("INSERT INTO want_to_read VALUES(%s, %s)",(usn, isbn))
    connection.commit()
    
    return jsonify({"message":"All good."}),200







#Add to have_read
@cross_origin(origin='*')
@app.route('/api/books/haveread', methods=['POST'])
def haveread():

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=request.json.get('username')
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    isbn = request.json.get('isbn')

    cur.execute("DELETE from want_to_read where isbn='"+isbn+"'")
    cur.execute("INSERT INTO have_read VALUES(%s, %s)",(usn, isbn))
    connection.commit()
    
    return jsonify({"message":"All good."}),200





#Update Recommendations
@cross_origin(origin='*')
@app.route('/api/books/updaterecs', methods=['POST'])
def updaterecs():

    connection = mysql.get_db()
    cur = mysql.get_db().cursor()
    usn=request.json.get('username')
    cur.execute("SELECT * FROM users where username='"+usn+"'")
    row = cur.fetchone()
       # return jsonify(row)
    if(row==None):
        resp={ 
        "message": "This user doesn't exist."

        }
        return jsonify(resp)

    isbn = request.json.get('isbn')

    cur.execute("DELETE from topfifteenbooks where username ='"+usn+"'")
    cur.execute("DELETE from topfivegenres where username ='"+usn+"'")
    cur.execute("DELETE from bookrecs where username ='"+usn+"'")
    cur.execute("DELETE from genrerecs where username ='"+usn+"'")
    connection.commit()
    
    return jsonify({"message":"All good."}),200

    



if __name__ == '__main__':
    app.run()