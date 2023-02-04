# patch_url.py

import os

def patch_js(file):

    f = open(file, "r")

    str = f.read()
    f.close()
    str = str.replace("http://localhost:80", "a")

    f = open(file, "w")
    f.write(str)
    f.close()

def patch_html(file, root):

    f = open(file, "r")

    print("file", file)
    str = f.read()
    f.close()
    if (str.startswith("/static")):
        str = str.replace("/static", "/public/" + root + "/static")

    f = open(file, "w")
    f.write(str)
    f.close()


def patch_directory(directory, root):

    for file in os.listdir(directory):

        if (os.path.isdir(directory + "\\" + file)):

            patch_directory(directory + "\\" + file, root)

        if ".js" in file:

            patch_js(directory + "\\" + file)

        if ".html" in file:

            patch_html(directory + "\\" + file, root)

patch_directory("public\\client", "client")
