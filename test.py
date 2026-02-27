import base64

html = "<html><body>"
for f in ["Screenshot 2026-02-26 125341.jpg", "Screenshot 2026-02-26 130856.jpg", "Screenshot 2026-02-26 130953.jpg"]:
    with open("d:/aqua-water-homepage/assets/" + f, "rb") as img:
        b64 = base64.b64encode(img.read()).decode("utf-8")
        html += f"<h2>{f}</h2><img src='data:image/jpeg;base64,{b64}' /><br/>"

html += "</body></html>"
with open("d:/aqua-water-homepage/test_images.html", "w") as out:
    out.write(html)
