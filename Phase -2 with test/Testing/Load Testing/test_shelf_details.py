#import unittest 
#from flask_cors import CORS, cross_origin
#from flask import Flask, render_template, request, redirect, jsonify

#app = Flask(__name__)

try:
	from app import app
	import unittest

except Except as e:
	print("Some Modules are Missing {} ".format(e))

class FlaskTest(unittest.TestCase):
	#Check for response 200
	def test_index(self):
		tester = app.test_client(self)
		response = tester.get("/api/shelves?user=indu")
		statuscode = response.status_code
		self.assertEqual(statuscode, 200)

	#check if content returned is application/json
	def test_index_content(self):
		tester = app.test_client(self)
		response = tester.get("api/shelves?user=indu")
		self.assertEqual(response.content_type, "application/json")

	#check for data returned
	def test_index_data(self):
		tester = app.test_client(self)
		response = tester.get("api/shelves?user=indu")
		self.assertTrue(b'have_read' in response.data)


if __name__ == '__main__':
	unittest.main()

