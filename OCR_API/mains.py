# Import necessary libraries
from flask import Flask, request, jsonify
from PIL import Image
import os
from flask_restful import Resource, Api, reqparse
from flask import Flask, request, jsonify, render_template
import pytesseract
pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe' 
from werkzeug.datastructures import FileStorage
# from flask import Flask, request, jsonify, render_template

# Create a Flask app
app = Flask(__name__)
api = Api(app)


# app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'  # Folder for image uploads

# @app.route('/')
# def index():
#     return render_template('upload.html')

# @app.route('/upload', methods=['POST'])
# def upload_image():
#     if 'image' not in request.files:
#         return "No image file provided"

#     image = request.files['image']

#     if image.filename == '':
#         return "No selected file"

#     if image:
#         image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
#         image.save(image_path)
#         recognized_text = recognize_text(image_path)
#         return render_template('result.html', recognized_text=recognized_text)

# def recognize_text(image_path):
#     try:
#         image = Image.open(image_path)
#         recognized_text = pytesseract.image_to_string(image)
#         return recognized_text
#     except Exception as e:
#         return str(e)

# if __name__ == '__main__':
#     app.run(debug=True)

class OCRResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('image', type=FileStorage, location='files')

    def post(self):
        args = self.parser.parse_args()
        image_file = args['image']

        if image_file:
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_file.filename)
            image_file.save(image_path)
            recognized_text = self.recognize_text(image_path)
            return jsonify({'text': recognized_text})

    def recognize_text(self, image_path):
        try:
            image = Image.open(image_path)
            recognized_text = pytesseract.image_to_string(image)
            return recognized_text
        except Exception as e:
            return str(e)

api.add_resource(OCRResource, '/ocr')

if __name__ == '__main__':
    app.run(debug=True)