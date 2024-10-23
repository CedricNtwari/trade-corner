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
- [Design Process](#design-process)
  - [Color Palette](#color-palette)
- [Testing Checkout with Stripe](#testing-checkout-with-stripe)
  - [Steps to test checkout](#steps-to-test-checkout)
- [Testing & Quality Assurance](#testing--quality-assurance)
  - [Automated Testing](#automated-testing)
  - [Manual Testing](#manual-testing)
  - [Validator Testing](#validator-testing)
  - [E2E Testing with Cypress](#e2e-testing-with-cypress)
- [Version Control](#version-control)
- [User Stories and Agile Methodology](#user-stories-and-agile-methodology)
  - [Sprints Breakdown](#sprints-breakdown)
- [Deployment to Heroku](#deployment-to-heroku)
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

The design of "Trade Corner" aims to create a user-friendly marketplace where buying, selling, and browsing products are simple and engaging. The key design principles we followed were:

**Simplicity**: The platform's interface is designed to be intuitive and easy to navigate, allowing users to browse products, add items to their cart, and complete purchases effortlessly.

**Responsiveness**: The layout adapts seamlessly to different screen sizes, ensuring a smooth user experience on desktops, tablets, and mobile devices.

**Visual Appeal**: We used a clean, modern color palette and typography to create a professional look. Product images are central to the design, with a focus on clear visuals to aid purchasing decisions.

**User Flow**: We streamlined the buying and selling journey, ensuring users can easily browse, filter, and purchase products. The checkout process is designed to be quick and intuitive.

**Mobile-First Approach**: Prioritizing mobile usability, the design focuses on ensuring smooth navigation and accessibility on mobile devices while maintaining consistency across all screen sizes.

**Wireframes**: Wireframes were developed for key pages such as the homepage, product details, cart, checkout, and profile sections. These wireframes ensured responsiveness and usability across desktop, tablet, and mobile views.

[View Trade Corner Design on Figma](https://www.figma.com/design/Cls9FKbYKvtu1L3NwvJabS/Trade-Corner?node-id=0-1&node-type=canvas&t=0dNKUmA7eurFlgKF-0)

### Color Palette

The chosen color palette reflects the goal of creating a clean, professional, and visually appealing interface. The following colors were used:

- **Primary Color:** #c9378b
- **Secondary Color:** #f6d1ee
- **Background Color:** #ffffff
- **Text Color:** #212529

## Testing Checkout with Stripe

To test the checkout process, you can use the following Stripe test card numbers. These test cards simulate different types of payment methods and will not result in actual charges.

- Visa
  Number: 4242 4242 4242 4242
  CVC: Any 3 digits
  Expiration Date: Any future date

- Visa (Debit)
  Number: 4000 0566 5566 5556
  CVC: Any 3 digits
  Expiration Date: Any future date

- Mastercard
  Number: 5555 5555 5555 4444
  CVC: Any 3 digits
  Expiration Date: Any future date

### Steps to test checkout

- Navigate to the checkout page of the application.
- Use any of the test cards mentioned above when prompted for payment details.
- Enter any valid expiration date in the future (e.g., 12/34).
- Enter any valid CVC code as per the card type (3 or 4 digits).
- Complete the checkout process. No actual charges will be made.

For more details on testing with Stripe's test cards, visit their documentation(https://docs.stripe.com/testing).

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

![Lighthouse](/src/assets/lighthous.png)

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

  ### E2E Testing with Cypress

  To ensure a seamless user experience, we have incorporated End-to-End (E2E) testing using Cypress. An industry-standard testing tool that allows us to test the entire user journey, from authentication to checkout, to ensure the application performs as expected.

  What We Are Testing ?
  The following key user flows have been covered in our E2E tests:

  **Authentication Flow**

  - Testing the registration (Sign Up) process.
  - Verifying login functionality with valid/invalid credentials.
  - Ensuring that logged-in status is maintained until the user logs out.

  ![Authentication flow](/src/assets/auth.png)

  **Product Listing and Details**

  - Ensuring that users can view products on the marketplace.
  - Testing search and filter functionality for products.
  - Verifying that product details (name, description, price, etc.) display correctly.

  ![Product Listing and Details](/src/assets/product.png)

  **Cart and Checkout Flow**

  - Adding products to the cart.

  - Updating product quantities or removing products from the cart.

  - Completing a checkout process using Stripe payment integration.

  - Verifying that checkout and order confirmation emails work correctly.

  **Profile and Order Management**

  - Testing that users can view and update their profile.
  - Verifying that users can access their order history, view order details, and track order status.

![Profile and Order Management](/src/assets/profil.png)

**Navigation**

- Ensuring that the Navbar and Footer links work as expected.

- Testing the accessibility of key pages (Home, Products, Cart, Profile, Order History).

![Navigation](/src/assets/navbar.png)

**Error Handling**

- Testing proper error messages for invalid login, sign-up, and checkout errors.

- Ensuring that users receive proper feedback when interacting with the application.

## Version Control

- Git, GitHub

## User Stories and Agile Methodology

The development of **Trade Corner** was managed using Agile methodology, with tasks tracked on a GitHub Project Board. You can view the complete list of user stories, and progress here:

- **Track project progress**: [GitHub Project Board](https://github.com/users/CedricNtwari/projects/6/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Repository%22%5D)

All user stories were organized and managed according to the **MOSCOW** prioritization technique to ensure the focus on the "Must Haves" while keeping flexibility for "Should Haves" and "Could Haves."

I followed Agile methodology to ensure a structured and iterative approach to building the application. The project was divided into five sprints, each lasting **two weeks**, with a clear set of tasks and goals for each sprint.

Each user story was further broken down into tasks, with detailed descriptions, acceptance criteria, and assigned points based on their complexity and importance. These were prioritized to ensure effective sprint planning.

### Sprints Breakdown

**Sprint 1:** User Authentication & Basic UI Setup

- Initial wireframes created for homepage, about page, and user profile.
- Implemented user registration, login (including social sign-ins), and authentication system.
- Set up homepage structure, footer, and navigation.
- Implement client-side routing for smooth navigation.
- Implement user sign-up functionality.

**Sprint 2:** User Authentication and Profile Management

- Implement sign-in functionality.
- Display logged-in status across all pages.
- Integrated Google Maps to display places on a map.
- Implement token refresh to maintain user login.

![Sprint board 1 & 2](/src/assets/sprint1.png)

**Sprint 3:** Product and Cart Features

- Display detailed product information (description, price).
- Implement add, remove, and modify cart functionality.
- Implement secure checkout and payment flow.

**Sprint 4:** Order Management and Reviews

- Send order confirmation email after purchase.
- Display the user's order history.
- Implement product review functionality.

**Sprint 5:** Search and Footer Features

- Implement search and filtering for products.
- Implement footer with important links (FAQ, Terms, Contact).
- Display featured products, categories, and search options on the homepage.

![Sprint board 3 & 4](/src/assets/sprint2.png)

**Sprint 6:** Final Testing and Deployment

- Conducted final rounds of testing.
- Deployed the application to Heroku.
- Documented the full deployment process.
- Addressed any remaining UI/UX feedback and resolved bugs (including the email verification issue).
- Automated tests for key features.
- Manual testing across multiple browsers (Chrome, Firefox, Safari) and devices (mobile, tablet, desktop).

![Sprint board 5](/src/assets/description.png)

Since **Monday.com** restricts public access, I’ve included a screenshot of my sprint progress and task breakdown for transparency.

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
