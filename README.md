# Travel-Map

**Travel Tracker** is a web application designed to allow users to track and visualize countries they have visited on a world map. It leverages modern web technologies like Node.js for the backend server, PostgreSQL for data storage, Express.js for server-side routing, and EJS (Embedded JavaScript) for dynamic HTML templating.

### Technologies Used

1. **Node.js**: Used as the server-side runtime environment, Node.js handles server operations and facilitates non-blocking, event-driven I/O to handle multiple concurrent operations efficiently.
   
2. **Express.js**: This minimalist web framework for Node.js simplifies routing, middleware creation, and handling HTTP requests. It enables the definition of routes for handling different endpoints, such as rendering HTML pages and processing form submissions.
   
3. **PostgreSQL**: A powerful open-source relational database system chosen for its robustness and scalability. PostgreSQL stores data about countries and visited countries, ensuring reliable data management and querying capabilities.
   
4. **EJS (Embedded JavaScript)**: EJS templates are used to generate HTML markup with embedded JavaScript. This allows dynamic content generation on the server-side, facilitating the display of data retrieved from the database.

### Project Setup and Configuration

#### Backend Setup

- **Initialization**: The project begins with initializing a Node.js application using `npm init`. Required packages such as Express, Body-parser (for form data parsing), EJS (for templating), and pg (PostgreSQL client) are installed via `npm install`.

- **Server Configuration**: The Express application is configured to listen on port 3000 (`const port = 3000;`). Static files like CSS are served from a `public` folder using `express.static('public')`.

- **Database Connection**: A PostgreSQL client (`pg`) is configured to connect to a local database named `world`. The connection parameters (`user`, `host`, `database`, `password`, `port`) are specified in the database client configuration.

#### Database Schema

- **Tables**: The PostgreSQL database `world` contains at least two tables:
  - **`countries`**: Stores information about countries including their name (`cname`) and code (`code`).
  - **`visited_countries`**: Stores the codes (`code`) of countries that the user has visited.

#### Frontend Setup

- **HTML Templates**: The frontend uses EJS templates (`index.ejs`) to render dynamic HTML content. This includes displaying the world map SVG and showing the total count of visited countries.

- **CSS Styling**: CSS files are linked in the HTML templates (`style.css`) to style the interface, ensuring a visually appealing and responsive design.

### Functionality and Workflow

#### Homepage (`/` route)

- **GET Request**: When a user visits the homepage (`/`), the server queries the `visited_countries` table to retrieve all country codes that the user has previously visited.

- **Database Query**: The result from the database (`result.rows`) is processed to extract country codes (`code`) and their total count (`result.rowCount`).

- **Dynamic Rendering**: Using EJS templates, the retrieved data is dynamically rendered on the homepage, showing the visited countries highlighted on the world map SVG and displaying the total count.

#### Form Submission (`/submit` route)

- **POST Request**: When a user submits a country name via the form, the server receives the POST request at `/submit`.

- **Data Processing**: The submitted country name is processed to format it correctly (first letter uppercase, rest lowercase) and split into individual words.

- **Database Query**: The server queries the `countries` table in PostgreSQL to find a matching country code (`code`) based on the submitted country name (`cname`).

- **Data Insertion**: If a match is found (`resultCode.rowCount > 0`), the retrieved country code is inserted into the `visited_countries` table.

- **Redirection**: After processing, the user is redirected back to the homepage (`/`) to reflect the updated list of visited countries.

### Key Features

- **Real-time Updates**: Visited countries are dynamically updated and displayed on the world map without requiring a page refresh.
  
- **Form Validation**: Form inputs are validated to ensure correct formatting and prevent incorrect submissions.

- **Interactive Map**: The SVG map dynamically highlights visited countries based on database entries, providing a visual representation of the user's travel history.

### Conclusion

Travel Tracker demonstrates a comprehensive integration of Node.js, Express.js, PostgreSQL, and EJS to create a functional and interactive web application. It not only serves practical purposes for tracking personal travel but also showcases best practices in web development, including database management, form handling, and dynamic content rendering. This setup ensures scalability and flexibility for future enhancements and customization in web application development scenarios.
