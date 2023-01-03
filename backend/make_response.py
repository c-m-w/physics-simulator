### make_response.py

import json

def make_response(success, message= "",data=None):

    return json.dumps({"success" : success, "message": message, "data": data})