# Software Development Life Cycle (SDLC) Plan

This document outlines the high-level strategy and plan for developing the backend of the Jamal Salon Management application.

## Table of Contents <a name="table-of-contents"></a>

1. [Inception](#inception)
2. [Design](#design)
3. [Implementation](#implementation)
4. [Testing](#testing)
5. [Deployment & Maintaince](#d-m)
   - [Deployment/](#deployment)
   - [Maintaince/](#maintaince)

---

## Inception Overview <a name="inception"></a>

1. **Identified the key stakeholders**:
   - The main stakeholders of this project are salon owners, salon renters, customers, and the salon franchise management. Each of these stakeholders has distinct needs, which were thoroughly analyzed.
2. **Gathered requirements**:
   - Through market research and forcasting, we determined the essential features for our backend system. These included managing user accounts, handling salon suite bookings, managing payments, and facilitating communications.
3. **Defined the system's scope**:
   - Based on the requirements, we defined the scope of our backend application to ensure it would fully support the salon suite system's functionalities.
4. \*\*Outlined initial resources and timelines:
   - We determined the resources needed, such as development tools and technologies, and created a preliminary timeline for the development process.
5. **Designed the system architecture**:
   - A crucial step was designing a comprehensive database schema to ensure efficient data management. The schema was built with a focus on scalability and optimization to handle a variety of data such as user information, salon suites details, appointment bookings, and more.

---

## Design <a name="design"></a>

1. **Database Design**:
   - Using the requirements we gathered, we designed a relational database schema in PostgreSQL. The schema includes several tables to efficiently manage users, salon suite details, appointments, payments, and more. With careful planning and normalization, we ensured data integrity and efficient storage.
2. **API Design**:
   - Next, we designed our RESTful APIs to expose the necessary endpoints for the front-end application to interact with the data. We followed best practices for API design, including the use of HTTP methods, status codes, and sensible endpoint paths.
3. **Application Architecture Design**:
   - We adopted the MVC (Model-View-Controller) architecture for our application. With Express.js as our main framework, we structured our backend into Models for database interactions, Controllers for handling business logic, and Routes for endpoint configurations.
4. **Security Design**:
   - We placed high importance on the security of our application. We planned for the use of bcrypt for password hashing and jsonwebtoken for user authentication. Furthermore, we designed our application to follow the principle of least privilege, ensuring each user role has only the necessary access rights.
5. **Error Handling and Logging Design**:
   - To enhance maintainability and debuggability, we planned for comprehensive error handling and logging using tools like Morgan.
6. **Performance Considerations**:
   - While designing the backend, we also considered the system's performance under different load conditions. We made considerations for optimizing our database queries and handling potential bottlenecks in our application.

---

## Implementation <a name="implementation"></a>

During the implementation phase of our project, we translated our application design and plan into actual code. We adopted a modular approach, focusing on implementing one feature at a time, which not only improved the clarity of our code but also made debugging and testing easier. The implementation phase was divided into various stages, as detailed below:

1. **Environment Setup**:
   - We started by setting up our development environment. This involved installing the necessary software and libraries such as Node.js, Express, PostgreSQL, Jest for testing, among others. We also initialized our project using npm, which created a package.json file. This file kept track of our project's dependencies and certain metadata.
2. **Database Creation**:
   - Using PostgreSQL, we designed and implemented our database schema based on the models identified during the design phase. We wrote a seed script to set up and populate the database with some initial data for testing purposes.
3. **Backend Implementation**:
   - We built our server using Express.js, a popular Node.js framework. We followed the principles of REST in our architecture, creating API routes that correspond to the standard HTTP methods (GET, POST, PUT, DELETE). Our controllers, defined in Express.js, interacted with the models to retrieve data and send it to the client side.
4. **Authentication and Authorization**:
   - We implemented user authentication using JWT (JSON Web Tokens) and Bcrypt for password hashing. This ensured secure user login and signup. We also set up middleware functions to protect certain routes and maintain user sessions.
5. **Testing**:
   - We followed Test-Driven Development (TDD) best practices. We wrote tests using Jest and Supertest before implementing features, which helped us to identify and resolve issues early in the development cycle.
6. **Integration**:
   - After completing the individual components, we focused on integrating all parts of the application. We made sure that our API endpoints correctly interacted with the database and returned the expected results. We also ensured that our application correctly handled errors and edge cases.
7. **Performance Optimization**:
   - We optimized our application for better performance. This included tasks like improving database queries, minimizing HTTP requests, and implementing caching where appropriate.

---

## Testing <a name="testing"></a>

Testing is a critical phase in the software development lifecycle. It helps ensure the functionality, reliability, performance, and security of our application. For this project, our testing strategy is focused on Unit, Integration, Security, and Usability testing.

1. **Unit Testing**:
   - The objective of unit testing is to validate each individual part of the program. This helps in detecting issues at an early stage of the development cycle, making the debugging process easier. We leveraged the Jest framework for writing and executing our unit tests. By isolating the smallest possible parts of our codebase and validating their correctness, we were able to ensure that each unit functions as expected.
2. **Integration Testing**:
   - Integration testing allows us to ensure that different components of our application interact seamlessly. After validating each component individually with unit tests, integration testing checks the whole system flow and ensures that the components are working well together. This is particularly important in our MVC architecture where the proper interaction between the Model, View, and Controller is integral to the smooth operation of our application.
3. **Security Testing**:
   - Given the sensitive nature of the user data we handle, security testing was a crucial part of our testing strategy. We implemented tests to check for vulnerabilities that might expose this data. These tests were supplemented by best practices such as hashing passwords and using JWT for secure user sessions, ensuring that our application's security meets industry standards.
4. **Usability Testing**:
   - While our primary focus is on backend development, we wanted to ensure that our APIs are intuitive and easy to use. This led us to conduct basic usability testing. This involves checking if error messages are clear and helpful, and that the API documentation is comprehensive and easy to understand.

These four types of testing provided a broad coverage, helping us ensure our application works as expected and provides a secure, smooth user experience. Any bugs identified during the testing phase were tracked and managed using GitHub's issue tracking functionality. After rectifying the bugs, we retested to ensure no new issues were introduced. This iterative testing process ensured the highest quality and reliability for our application.

---

## Deployement & Maintaince <a name="d-m"></a>

### Deployment <a name="deployment"></a>

Deployment is the phase where the application is made available to end users. For the Jamāl-Backend project, we've chosen [Render](https://render.com) as our deployment platform, given its simplicity, reliability, and excellent support for Node.js applications.

Render enables automatic deployments from your GitHub or GitLab repositories, along with integrated support for HTTPS, custom domains, and continuous integration/continuous deployment (CI/CD).

Here's a snapshot of our deployment process:

1. **Push to Repository**: We commit and push our finalized application code to our repository.
2. **Connect to Render**: We link the GitHub repository to our Render account. This sets up Render to watch for changes in our repository.
3. **Automatic Deployments**: Render automatically deploys our application whenever we push to the selected branch of our repository. This ensures our application is always up-to-date with our latest pushes.
4. **Database Connection**: We configure the environment variables on Render to securely connect to our PostgreSQL database.
5. **Verify Deployment**: Once Render deploys the application, we thoroughly test it to ensure it functions correctly in the live environment.

### Maintenance <a name="maintenance"></a>

Maintenance is an ongoing process of monitoring, updating, and improving the application post-deployment. We use Render's integrated metrics and analytics to continually monitor our application's performance and health.

1. **Monitor Performance**: We continuously keep tabs on the application's performance, reliability, and usage patterns using Render's analytics tools.
2. **Updates and Improvements**: As we collect user feedback and data, we iterate on our application, making updates and improvements as necessary. These changes are tested in the development environment before being deployed to the live site.
3. **Security Updates**: We stay alert to any potential security vulnerabilities and promptly update our application with necessary security patches.

Through these Deployment and Maintenance procedures, we ensure that our application is not only always accessible to our users, but that it continues to meet and exceed their needs over time. This also helps us maintain a robust, secure, and high-performing application that aligns with industry best practices.
