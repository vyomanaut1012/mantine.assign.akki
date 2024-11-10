<<<<<<< HEAD
 
=======
# Indian Agriculture Data Analysis Table

This project is a simple React application created using Vite, TypeScript, and the Mantine UI library. It visualizes and analyzes agricultural data from India, offering an easy-to-read table format that highlights crop yield, area under cultivation, and other significant agricultural metrics. This project is ideal for anyone interested in data visualization, TypeScript, and using Mantine for building UI components.

## Features

- **Data Aggregation**: The app calculates the average yield and cultivation area for each crop across the dataset.
- **Responsive Table Display**: Using Mantine’s `Table` and `ScrollArea` components, the data is displayed in a scrollable and responsive table, making it easy to view on various screen sizes.
- **Mantine Styling**: The table uses customized Mantine styles for a clean, user-friendly design.
- **Data Fetching**: The app imports data from a JSON file located in the `data` directory and processes it for analysis.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool optimized for modern JavaScript frameworks.
- **TypeScript**: Adds type safety to the application.
- **Mantine**: Provides a rich set of components and hooks for building responsive and customizable UIs.

## Project Structure

The project structure is as follows:

```plaintext
project-root/
├── public/
├── src/
│   ├── components/
│   │   ├── TimePeriodTable.tsx         # Displays the table of crop data
|   |   ├── CropTable.tsx               # Displays the table of crop data
│   ├── data/
│   │   ├── india_agriculture_data.json # JSON data for analysis
│   ├── App.tsx                         # Main app component
│   ├── main.tsx                        # Entry point for the application
│   └── index.css                       # Global styles
├── README.md                           # Project README file
└── tsconfig.json                       # TypeScript configuration
>>>>>>> 664e35eaa2e14c239af3a61faf47bc5495b02a43
