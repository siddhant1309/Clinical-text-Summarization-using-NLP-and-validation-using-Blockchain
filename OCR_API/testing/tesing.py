import requests

# Define the API endpoint URL
api_url = "http://127.0.0.1:5000/ocr"  # Update with your API URL

# Prepare the image file to upload
image_path = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\experiment\\uploads\\Hey21.png"
image_file = {
    'image': ('Hey21.png', open(image_path, 'rb'), 'image/png')
}

# Send a POST request to the API
response = requests.post(api_url, files=image_file)

# Check the response
if response.status_code == 200:
    data = response.json()
    recognized_text = data.get('text')
    print(f"Recognized Text: {recognized_text}")
else:
    print(f"Failed to recognize text. Status code: {response.status_code}")
    print(response.text)
