"""
Data som sendes inn må være på formatet:
{
    "productID": 2,
    "name": "Test",
    "brand": "Testbrand",
    "ean": "Testean",
    "image": "TestImage",
    "currentPrice": 23,
    "store": "TestStore"
    "category": ["TestCategory", "Tstcategory2"],
    "description": "Dette er en testdescription",
    "weight": 450,
    "weightUnit": "kg"
}
"""

import requests
import json
import time

# API-endepunkt for å hente produkt-objekter én etter én
api_url_standard = "https://kassal.app/api/v1/products/id/"  # Endre til ditt API-endepunkt
post_url = "http://localhost:5713/addProduct"

# Legg til API-nøkkelen i en HTTP-forespørselsheader
headers = {
    'Authorization': 'Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw'  # Endre til din faktiske API-nøkkel
}

try:
    for i in range(3000, 4000):
        api_url = api_url_standard + str(i)
        response = requests.get(api_url, headers=headers)
        if response.status_code == 200:
            validCategories = ["Dessert", "Pålegg & frokost", "Kjøtt", "Snacks & godteri", "Personlige artikler", "Drikke", "Middag", "Ost", "Middagstilbehør"]
            produkt = response.json()  
            productID = produkt["data"]["id"] if produkt["data"]["id"] is not None else 0000000
            name = produkt["data"]["name"] if produkt["data"]["name"] is not None else "Ingen informasjon"
            brand = produkt["data"]["brand"] if produkt["data"]["brand"] is not None else "Ingen informasjon"
            ean = produkt["data"]["ean"] if produkt["data"]["ean"] is not None else 00000000
            image = produkt["data"]["image"] if produkt["data"]["image"] is not None else "Ingen informasjon"
            currentPrice = produkt["data"]["current_price"] if produkt["data"]["current_price"] is not None else "Ingen informasjon"
            store = produkt["data"]["store"]["name"] if produkt["data"]["store"]["name"] is not None else "Ingen informasjon"
            description = produkt["data"]["description"] if produkt["data"]["description"] is not None else "Ingen informasjon"
            weight = produkt["data"]["weight"] 
            weightUnit = produkt["data"]["weight_unit"]
            kategorier = produkt["data"]["category"] if produkt["data"]["category"] is not None else []
            category = ""
            for kat in kategorier:
                if kat["name"] in validCategories:
                    category = kat["name"]
        
            objekt = {
                "productID": productID,
                "name": name,
                "brand": brand,
                "ean": ean,
                "image": image,
                "currentPrice": currentPrice,
                "store": store,
                "description": description,
                "weight": weight,
                "weightUnit": weightUnit,
                "category": category
            }
            json_object = json.dumps(objekt, indent=4)
            print(productID)
            #print(ean, image, currentPrice, store, description, weight, weightUnit, category, name, brand)
            if ean == 00000000 or ean == "0" or image == "Ingen informasjon" or currentPrice == "Ingen informasjon" or store == "Ingen informasjon" or description == "Ingen informasjon" or weight == "Ingen informasjon" or weightUnit == "Ingen informasjon" or category == "" or name == "Ingen informasjon" or brand == "Ingen informasjon":
                continue
            #print("Jeg sender inn!!!")
            respons = requests.post(post_url, json=objekt)
            if response.status_code == 200:
                print("POST-forespørsel var vellykket!")
                #print("Respons:", response.text)
            else:
                print("Feil ved POST-forespørsel. Statuskode:", response.status_code)
        else:
            print(f"Feil ved henting av produkt fra API: {response.status_code}")
            if response.status_code == 429:
                time.sleep(60)
except Exception as e:
    print(f"Feil ved henting av produkt fra API: {str(e)}")