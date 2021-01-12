# PizzeriaApp

This Project was created using ReactJS, NodeJS, Express, and MongoDB (MERN Application)

Front End
The application has 5 pages, 
1)	The Home Page
2)	Order Pizza Page
3)	Login Page
4)	Register Page
5)	Cart

The default page is the home page. Any unregistered user can browse the catalogue of pizzas, but cannot order without registering and logging in. 
Once logged in, the user can order any pizza with any topping. 
Once in the cart, the total bill is displayed. The entire cart can be cleared or any one of the cart items can also be individually deleted as well. The header is designed in a separate component

Backend
The Endpoints are:
Get Requests

•	/getallpizzas

•	/getpizzabyid/:id

•	/getpizzasincart/:user

•	/getalltoppings

•	/gettoppingbyid/:id

•	/gettoppingsincart/:user

•	/getpizzabyname

•	/gettoppingbyname

•	/getaccountwithloginid/:loginId


Post Requests

•	/addpizzatocart

•	/addtoppingstocart

•	/signup


Put Requests

•	/updatepizzaqty


Delete Requests

•	/clearcart/:user

•	/deletefromcart/:id
