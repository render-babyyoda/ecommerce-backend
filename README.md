# cookieJar()-backend : A Description
#### Our team set out to create an e-commerce application that allows users to purchase cookies. We're still working on integrating Stripe.

## Links:
Frontend Repo
- https://github.com/render-babyyoda/ecommerce-client
Deployed Backend
- https://intense-mesa-95377.herokuapp.com/
Deployed Client
- https://render-babyyoda.github.io/ecommerce-client/#/

# Planning Process and Problem-Solving Strategy
On day one we set up our MongoDB database and deployed using heroku. We started with creating our resource model, routes and testing with curl-scripts. Our first test was to create and then get an index of all purchases. Once we could index, we added ownership to each purchase. Once we could index by ownership, we added update functionality and began building the nested resource. Once the nested resource was built, all CRUD actions were added to it. We plan on integrating the Stripe API to the backend and frontend for our final version.

## User Stories:
### Version 1 ERD
#### User
- email
- hashedPassword
- token

## Routes
| Verb        | URI Pattern     | Controller # Action  |
| ------------- |:-------------:| -----:|
| POST      | / | purchases#create |
| GET      | /purchases      |   purchases#index |
| GET | /purchases/:id      |    purchases#show |
| PATCH | /purchases/:id      |    purchases#update |

#### Purchases
- item_name : string
- item_price : number
- date_of_purchase : date
- review: string
- owner: ref to user

## Technologies Used:
* Shell
* MongoDB/Atlas
* Heroku
* Express API


## ERD:
![initial ERD for cookieJar()](https://imgur.com/UKg30Wi.png)
