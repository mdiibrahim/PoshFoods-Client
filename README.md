# PoshFoods - Client

This is the Client Repo of [PoshFoods-Server](https://github.com/mdiibrahim/PoshFoods-server)

## Introduction

PoshFoods is a responsive and modern web application built for managing grocery services and enhancing the shopping experience. Users can browse and purchase products, manage their orders, and provide feedback through reviews. Administrators can manage products, monitor orders, and assign roles within the platform. The project is designed to be user-friendly with features tailored for both users and administrators.

## Project Overview

PoshFoods is a grocery marketplace that aims to offer users a seamless shopping experience. This project focuses on improving the UI/UX and functionality of the platform, including a personalized dashboard for users, product reviews, and efficient order management for administrators.

## Live Demo

Check out the live version of the app: [PoshFoods Live Demo](https://poshfoods.vercel.app/)

## Features

- **Responsive Design**: Optimized for mobile and desktop views.
- **User Authentication**: Secure login and registration system.
- **Product Management**: Allows admins to add, edit, and delete grocery products.
- **User Dashboard**: Displays orders, allows users to rate and review delivered products.
- **Admin Dashboard**: Manage product inventory and handle order status changes.
- **Redux Persist**: User cart persists across sessions, even after reloading the page.
- **SEO Optimizations**: Dynamic meta tags for improved search engine discoverability.

## Technology Stack

- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework with features like server-side rendering.
- **Redux Toolkit**: For global state management and persisting user data.
- **TypeScript**: Enhances JavaScript with static typing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Next Themes**: Allows dark and light mode switching.
- **Axios**: For API requests.
- **Toastify**: For displaying success and error messages.

## Pages and Functionalities

### Login / Register Page

- Allows users to register and securely log in using their email and password.

### User Dashboard

- Displays orders with status updates (pending/delivered).
- Users can provide ratings and reviews for delivered products.

### Admin Dashboard

- Provides full control over product listings.
- Admins can add/edit/delete products, view orders, and change order statuses.

### Product Page

- Lists grocery items such as vegetables, fruits, and bakery items.
- Users can add products to their cart and proceed to checkout.

### Product Detail Page

- Shows detailed product information and allows users to add products to their cart.
- Users can review products directly from this page.

### Checkout Page

- Allows users to finalize their purchase with a default "Cash on Delivery" option.

## And More

- **Dark/Light Mode**: Users can switch between light and dark mode for a better viewing experience.
- **Reviews**: Reviews can be posted from the product detail page by user.

## Installation Guide

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mdiibrahim/PoshFoods-Client.git
   cd PoshFoods
   ```
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
# or
yarn build
```

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## Acknowledgements

I would like to express my gratitude to all the open-source contributors who helped shape this project through their invaluable contributions, to the creators of NextJs, React, Redux Toolkit, Tailwind CSS, Vite, DaisyUI, and Axios for providing the powerful tools and libraries that made this application possible. Special thanks to GitHub for offering a platform that facilitates collaboration and project management. I am also deeply thankful to my mentors, friends, and family for their unwavering support and encouragement throughout the development process. This project would not have been possible without the collective effort and dedication of everyone involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Contact

For further information, please reach out to [E-mail](mailto:mdiibrahim549@gmail.com).
