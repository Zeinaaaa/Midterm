# Starlight Café

A **Lighthouse Labs** project

## Description

This is the midterm project for the Lighthouse Labs October 2021 Cohort. We decided to choose the food pickup ordering project out of 10 different options.

The user can create, edit, delete orders, and submit it to Starlight Cafe which will get a text message to prepare their order. The user will then wait for a response from the restaurant, which when sent via text message, and will update the webpage with the exact time of pick-up. 

It is important to note that this is a food ordering and pickup app for a single restaurant (so it is not an ubereats or door dash clone).  The twill functionality has some problems, and it is an important note to also make that the changes (editing, deleting, searching, adding) are not dynamic, and they cause the webpage to refresh.


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
- socket.io
- twilio

## Screenshots

### Homepage

*When someone first opens the project*
!["Screenshot of Homepage”](https://github.com/Zeinaaaa/Midterm/blob/master/docs/homecarousel.png?raw=true)

### Menu

### Cart

### Confirm Order Page

### Track Order Page

### Order History Page

### Cancel Order Page

### Search Feature



### Summary

Documentation written by [sagalafrah](https://github.com/sagalafrah)

