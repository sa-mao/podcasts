# Podcasts

[![Build Status](https://travis-ci.org/sa-mao/podcasts.svg?branch=master)](https://travis-ci.org/sa-mao/podcasts)

Api to get various information about podcasts indexed by [Acast](https://play.acast.com/).

*Note* The architecture and directory layout are mainly inspired from this great [tutorial](https://youtu.be/CnailTcJV_U).

## Build and Run localy with docker compose:
`$docker-compose up`

## Run with Helm:
**Note:** You will need a proper kubernetes setup before you can start this step.
Install redis:

`$helm dependencies update ./helm/`

Run podcasts:

`$helm upgrade --install podcast ./helm/`

## Podcasts Api
**list episodes**
----
  returns a list of podcast's episodes.

* **URL**

  `/episodes`

* **Method:**


  `GET`

*  **URL Params**


   **Required:**

   `podcastUrl=[url]`


* **Success Response:**


  * **Code:** 200 <br />
    **Content:**
    ```
    [
        {
           "title": "#32: Mona Sahlin",
           "url": "https://media.acast.com/varvet/32monasahlin media.mp3",
           "checksum": "3adc7105386f55e9526907acec13a3f0"
       },
       {
           "title": "#31: Johan Glans",
           "url": "https://media.acast.com/varvet/31johanglans/media.mp3",
           "checksum": "c0ce96f8e638ac9c370c4dd8157c9a64"
       }
    ]
    ```

* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{"error":"Podcast not found."}`

  OR

  * **Code:** 400 Bad Request<br />
    **Content:** `{"error":"podcast url is required."}`

* **Sample Call:**

  ```
  curl -v -G 'http://localhost:8080/episodes'\
  -d podcastUrl='https://rss.acast.com/13minutestothemoon'
  ```
