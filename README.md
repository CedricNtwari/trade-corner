# TradeCorner: Your Digital Marketplace

**Slogan: A World of Products at Your Fingertips**

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Features](#features)
  - [Specific Pages](#specific-pages)
- [Testing & Quality Assurance](#testing--quality-assurance)
  - [Automated Testing](#automated-testing)
  - [Manual Testing](#manual-testing)
  - [Validator Testing](#validator-testing)
- [Deployment to Heroku](#deployment-to-heroku)
- [Design Process](#design-process)
  - [Color Palette](#color-palette)
- [Credits](#credits)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact](#contact)

## Project Overview

TradeCorner is a modern eCommerce platform designed to bridge the gap between buyers and sellers, offering a comprehensive marketplace for second-hand items and new products. Whether you're an individual looking to declutter or a small business trying to reach a wider audience, TradeCorner provides the tools to facilitate seamless and secure transactions. Our goal is to create a community where trust and quality are the cornerstones of every sale.

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js (>=18.0.0)
- npm (>=8.0.0)
- A GitHub account (for contributing)

Ensure you have Node.js and npm installed. You can check the versions by running:

```sh
node -v
npm -v
```

### Installation

1. Clone the repo

```sh
   git clone https://github.com/CedricNtwari/trade-corner.git
```

Then do: `cd trade-corner`

2.Install NPM packages

```sh
npm install
```

3. Start the application

```sh
npm start
```

### Usage

1. Start the frontend development server

   ```sh
   npm start
   ```

## Features

- **User Profiles**: Create and customize profiles to showcase your listings and manage your activity.
  ![No errors css validator](/src/assets/profile.png)
- **Product Listings**: Easily list products for sale with detailed descriptions, images, and pricing.
  ![No errors css validator](/src/assets/products.png)
- **Product Details Page**: Users can view detailed information about each product, including one high-quality image, description, price, available stock, and related products.
  ![No errors css validator](/src/assets/productdetailed.png)
- **Search and Filter**: Navigate the marketplace with advanced search capabilities and filters by category, price, and more.
  ![No errors css validator](/src/assets/serach.png)
- **Categories and Filters**: Products are organized by categories such as Womne, Men and Kids.
- **Navigation**: A consistent navbar and footer allow users to navigate across all pages effortlessly.
  ![No errors css validator](/src/assets/navigation.png)
- **Responsive Design**: Enjoy a smooth experience across all devices, from desktops to mobile phones.
- **Order Management**: View and manage your past orders, receive email notifications for successful checkouts.
- **Checkout**: A seamless, secure, and user-friendly checkout process through Stripe.

### Specific Pages

- **Product Details Page**: Displays comprehensive product information, images, reviews, and ratings.
  Allows users to add the product to their cart or wishlist.

- **Profile Page**: Users can update their profile information and view their past orders.
  Sellers can manage their product listings and view their transaction history.

- **Order History Page**: Lists all past orders with details like order number, status, total amount, and the option to view more detailed information.

- **Categories Page** : Displays all available product categories with quick access to the relevant product listings.
  Filters can be applied to search within specific categories.

## Design Process

The design of "Budget Explorer" is centered around providing a simple and intuitive user experience for individuals who are looking for budget-friendly travel destinations. The core design goals were:

**Simplicity**: The user interface is designed to be easy to navigate, with minimal distractions. The goal was to allow users to input information quickly and get the results they need without unnecessary complexity.

**Responsiveness**: Since users might access the platform from various devices, a responsive design was key. The layout adapts to different screen sizes, ensuring that the user experience remains consistent on desktop, tablet, and mobile devices.

**Visual Appeal**: The color scheme and typography were chosen to create a clean and professional look. The use of images, especially in the recommendations and map sections, was emphasized to make the experience more engaging.

**User Flow**: The main user journey, from entering budget information to viewing travel recommendations and saving favorites, was mapped out to ensure a logical and smooth progression.

**Mobile-First Approach**: By focusing on mobile usability first, the interface delivers a consistent experience across devices. The application was designed with mobile users in mind, ensuring a responsive design that adapts seamlessly from mobile phones to tablets and desktop screens.

**Wireframes**: During the early stages of development, wireframes were created for key pages, including the homepage, about page, contact page, sign-up, and login pages. These wireframes were designed for desktop, tablet, and mobile views to ensure responsiveness and usability.

[View Budget Explorer Design on Figma](https://www.figma.com/design/Cls9FKbYKvtu1L3NwvJabS/Trade-Corner?node-id=0-1&node-type=canvas&t=0dNKUmA7eurFlgKF-0)

### Color Palette

The chosen color palette reflects the goal of creating a clean, professional, and visually appealing interface. The following colors were used:

- **Primary Color:** #c9378b
- **Secondary Color:** #f6d1ee
- **Background Color:** #ffffff
- **Text Color:** #212529

## Testing & Quality Assurance

Testing is essential to ensure that all features of the platform work as expected and that the platform provides a consistent user experience across different devices and browsers

### Automated Testing

- **Unit Tests** : Core components such as SellSection, NavBar, HeroBanner, and OrderPage were tested using Jest and React Testing Library.
  Each unit test focuses on rendering the components and verifying their individual behavior, such as checking for the presence of elements like links, images, and form buttons.

  - Unit tests cover key features such as user authentication, CRUD operations, and search functionality.

  - Both "happy flow" (success) and "bad flow" (failure/error cases) are tested.

- **Integration Tests** :Several tests were conducted to ensure that components work together correctly, such as the interaction between OrderPage and the history (navigation) handling.
  Integration tests also cover user authentication and CRUD operations like product listing and order management, ensuring that various elements interact properly.

- **Mocking APIs** : The Mock Service Worker (MSW) was used to mock external API calls, especially for testing backend interactions without requiring live server requests. This ensures that API interactions like profile fetch requests can be tested in isolation.

### Manual Testing

- **Cross-Browser Testing** : The application was tested across major browsers including Chrome, Firefox, and Safari to ensure compatibility.

- **Responsive Design** : Manual testing was conducted on mobile devices, tablets, and desktops to ensure that the interface scales well across different screen sizes.

- **Interactive Elements** : All interactive elements, including form submissions, navigation, and product listings, were manually tested to ensure they respond correctly to user inputs.

- **Lighthouse Report:** I used Google's Lighthouse tool to audit and improve the overall quality of the application. Lighthouse provides insights into five key areas: performance, accessibility, best practices, SEO, and Progressive Web App (PWA).

**Key Metrics:** Category Score (out of 100)
Performance: 81
Accessibility: 100
Best Practices: 70
SEO: 100

**Please note that the performance and best practices scores are slightly lower due to the integration of third-party services such as Cloudinary (for image hosting) and Stripe (for payment processing). These services rely on third-party cookies and external assets, which affect the scores. While these tools are necessary for providing essential features like optimized media delivery and secure payment processing, they limit the extent to which we can fully control performance and third-party cookie usage. Efforts are continuously being made to improve these metrics within the constraints of these external dependencies.**

![Lighthouse](/src/assets/lighthouse.png)

### Validator Testing

The project has been thoroughly tested using various validators to ensure that the code adheres to best practices for web development.

- **CSS Validation**

  - The CSS used in both global styles and component-level styles (CSS modules) was validated to ensure there were no syntax errors.
  - No errors were returned when passing the source code viewed in the browser through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/#validate_by_input)

  ![No errors css validator](/src/assets/css.png)

- **Accessibility**

  - The application was tested for accessibility using Lighthouse. A high score(94-100) was achieved, indicating that the app meets accessibility standards for users with disabilities.

- **JavaScript(Linting)**

  - JavaScript code across the project was rigorously tested using ESLint to ensure clean, consistent, and error-free code.
  - No errors were returned when running npm run lint, confirming that the code adheres to established coding standards.
    ESLint was configured with specific rules to avoid common pitfalls and ensure best practices for React and JavaScript code.

    ```sh
      npm run lint
    ```

  ![ESLint](/src/assets/esLint.png)

## Version Control: Git, GitHub

## User Stories

The development of **Budget Explorer** was managed using Agile methodology, with tasks tracked on a GitHub Project Board. You can view the complete list of user stories, and progress here:

- **Track project progress**: [GitHub Project Board](https://github.com/users/CedricNtwari/projects/6/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Repository%22%5D)

All user stories were organized and managed according to the **MOSCOW** prioritization technique to ensure the focus on the "Must Haves" while keeping flexibility for "Should Haves" and "Could Haves."

## Deployment to Heroku

**Deployment to Heroku:** The application is deployed to Heroku, and here are the steps to set up the project:

**Set Up a Heroku Account:** Create an account at at [Heroku](https://signup.heroku.com/). - Optionally, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

**Create a new Heroku App:**

- Log in to Heroku and create a new app.
- Choose a unique name and select a region (United States or Europe).

**Set Up External PostgreSQL Database:**

- If you're using an external PostgreSQL database instead of Heroku’s built-in Postgres add-on, follow these steps:

- Ensure that you have the PostgreSQL database already set up with the necessary credentials (host, database name, username, and password).
- In your **env.py**, set the **DATABASE_URL** to the correct connection string.

- You do not need to add the Heroku Postgres add-on in this case, but you must set the DATABASE_URL environment variable in Heroku’s Config Vars (Step 7.5).

**Connect Your App to GitHub:**

- In the Deploy tab on Heroku, select GitHub as your deployment method and connect your GitHub repository.

**Set Environment Variables:**

Set all environment variables in Heroku.

- Go to the **Settings** tab in Heroku & Click **Reveal Config Vars** and add the following variables:

```
REACT_APP_STRIPE_PUBLIC_KEY= your-react-app-stripe-public-key
```

**Prepare the Application for Deployment:**

- Update your **requirements.txt** file by running:

```
pip freeze > requirements.txt
```

**Deploy the Application:**

- In the **Deploy** tab on Heroku, select the branch to deploy and click **Deploy Branch**.

**Open Your App:**

- Visit app at:

  ```
  https://<your-app-name>.herokuapp.com
  ```

## Credits

- **Code Institute**
  This project was created as part of the Full Stack Web Developer program at Code Institute. Their curriculum, mentorship, and resources were instrumental in guiding the development process. https://codeinstitute.net/global/

- **Mailjet**
  Mailjet was used to handle email communication in the application, such as sending confirmation emails and other notifications. https://www.mailjet.com/

- **Stripe**
  Stripe was used for the payment processing system, providing a secure and efficient way to handle transactions in the platform. https://stripe.com/en-ch

- **Cloudinary**
  Cloudinary was utilized for image hosting and media storage, ensuring that product images are stored efficiently and delivered quickly to users. https://cloudinary.com/

- **StockCake**
  StockCake was used to generate high-quality, AI-generated images for free. These images were implemented to enhance the visual appeal of the platform while maintaining professional quality. https://stockcake.com/

## API Documentation

The backend API documentation can be found [here](https://github.com/CedricNtwari/ecommerce-backend-api).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Contact

Cedric Ntwari - @CedricNtwari

Project Link: Trade Corner [here](https://trade-corner-018d2b5f7079.herokuapp.com/).

Project Management, board of user stories on GitHub [here](https://github.com/users/CedricNtwari/projects/6/views/1).
