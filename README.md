# Starlight Café

A **Lighthouse Labs** project

## Description

This is the midterm project for the Lighthouse Labs October 2021 Cohort. We decided to choose the food pickup ordering project out of 10 different options.

The user can create, edit, delete orders, and submit it to Starlight Cafe which will get a text message to prepare their order. The user will then wait for a response from the restaurant, which when sent via text message, and will update the webpage with the exact time of pick-up. 

It is important to note that this is a food ordering and pickup app for a single restaurant (so it is not an ubereats or door dash clone).  The twilio functionality has some problems, and it is an important note to also make that the changes (editing, deleting, searching, adding) are not dynamic, and they cause the webpage to refresh.


## Team

- [sagalafrah](https://github.com/sagalafrah)
- [zeinaaaa](https://github.com/zeinaaaa)
- [bosic0015](https://github.com/bosic0015)

## Notable Features

- Implemented a search feature where people can search for ingredients, type, and price.

- Confirmation animation using HTML and CSS on the confirm page 

- Rainbow gradient progress bar for order tracking 

- Users can see their order history.

- Users can clear their cart as well as cancel their order and receive confirmation.

- ### Improvements

  - User Login/Logout/Registration logic would be beneficial, with adding cookies and being able to see backlog of old orders.
  - Database can have more columns and more robust data such as descriptions, ingredients, user information, dietary restriction (vegan, veg, halal, nuts etc)
  - JQuery should have come more to the forefront so we could have had more seamless, dynamic results for the webpages.

## Setup

Please run `npm i` to install all dependencies

Run `npm run local` to get the server up and running

Go to `localhost:8080` in your web browser to see the page

### Dependencies

- body-parser
- chalk
- cookie-session
- dotenv
- ejs
- express
- jquery
- morgan
- node-sass-middleware
- pg
- pg-native
- twilio

## Screenshots & GIFs

### Homepage

*When someone first opens the project*
!["Screenshot of Homepage”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/homecarousel.png?raw=true)
*First Featurette of Homepage*
!["Screenshot of Homepage”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/feature1.png?raw=true)
*Second Featurette of Homepage*
!["Screenshot of Homepage”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/feature2.png?raw=true)

### Menu
*Menu Carousel*
!["Screenshot of Menu”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/menu1.png?raw=true)
*Menu Body*
!["Screenshot of Menu”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/menu2.png?raw=true)

### Cart
*Cart Carousel*
!["Screenshot of Cart”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/cart1.png?raw=true)
*Cart table body with icons*
!["Screenshot of Cart”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/cart2.png?raw=true)
*cart footer cards with bootstrap*
!["Screenshot of Cart”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/cart3.png?raw=true)


### Confirm Order Page
*Confirm order*
!["Screenshot of Confirm order”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/confirmorder.png?raw=true)

### Track Order Page
*Users will see this progress bar to show tracking*
!["Screenshot of Track Page”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/trackorder.png?raw=true)

### Order History Page
*Orders Carousel*
!["Screenshot of Orders”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/orders1.png?raw=true)
*Order Information*
!["Screenshot of Orders”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/orders2.png?raw=true)

### Cancel Order Page
*Implementation of Cancel feature*
!["Screenshot of Cancel Order”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/cancel.png?raw=true)

### Search Feature
*Search feature implemented with keyword "drink"*
!["Screenshot of Search Feature”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/search.png?raw=true)

### Animations 
*Track Order Animation*
!["Gif of Track Order Animation”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/animation1.gif?raw=true)
!["Gif of Confirmation Animation”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/animation2.gif)


### Summary

Documentation written by [sagalafrah](https://github.com/sagalafrah)

