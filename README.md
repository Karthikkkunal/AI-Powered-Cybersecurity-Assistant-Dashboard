# AI-Powered Cybersecurity Assistant Dashboard

## Overview

The AI-Powered Cybersecurity Assistant Dashboard is a comprehensive, real-time monitoring tool designed to enhance an organization's cybersecurity posture. By leveraging artificial intelligence and machine learning, this dashboard provides data-driven visualizations and insights across multiple security domains, enabling proactive threat detection and efficient security management.

## Features

1. **Threat Detection and Prevention**: Real-time monitoring of network intrusions, malware, and other cyber threats to promptly identify and mitigate potential security incidents.

2. **User Behavior Analytics**: Analysis of user activities to detect anomalies and potential insider threats, ensuring adherence to security policies.

3. **AI Cybersecurity Agents**: Overview of AI-driven security measures and their performance, showcasing the integration of intelligent agents in threat mitigation.

4. **Network Security Monitoring**: Continuous assessment of network health, secure connections, and bandwidth usage to maintain robust network defenses.

5. **Data Protection and Privacy**: Visualization of data protection status and compliance scores, aiding in the enforcement of data privacy regulations.

6. **Email Security Analysis**: Examination of email threats, including spam, phishing, and malware, to safeguard communication channels.

7. **Application Security Insights**: Identification of code vulnerabilities and management of patch deployments to ensure application integrity.

8. **Vulnerability Management**: Comprehensive overview of system vulnerabilities and patching status to prioritize remediation efforts.

9. **Red & Blue Team Tools**: Comparative analysis of offensive (red team) and defensive (blue team) security capabilities to enhance organizational readiness.

10. **Advanced Analytics**: Implementation of predictive threat analysis and anomaly detection trends to anticipate and prevent potential security breaches.

## Technologies Used

- **Frontend**: Developed using [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) for building a robust and scalable user interface.

- **Styling**: Utilizes [Tailwind CSS](https://tailwindcss.com/) for efficient and consistent design.

- **Data Visualization**: Employs [Chart.js](https://www.chartjs.org/) for creating interactive and informative charts and graphs.

- **Icons**: Integrates [Lucide React](https://lucide.dev/) for a wide range of customizable icons.

- **Build Tool**: Uses [Vite](https://vitejs.dev/) for fast and efficient build and development processes.

- **Backend**: Powered by [Supabase](https://supabase.com/) for database management and real-time data synchronization.

## Getting Started

### Prerequisites

- **Node.js**: Version 14 or later is required. Download it from the [official website](https://nodejs.org/).

- **npm**: Version 6 or later is required, typically installed alongside Node.js.

- **Docker**: Required for running Supabase locally. Install it from [Docker's official website](https://www.docker.com/).

- **Supabase CLI**: Install the Supabase CLI by following the instructions in the [Supabase documentation](https://supabase.com/docs/guides/cli).

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Karthikkkunal/AI-Powered-Cybersecurity-Assistant-Dashboard.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd AI-Powered-Cybersecurity-Assistant-Dashboard
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Initialize Supabase**:

   ```bash
   supabase init
   ```

   This command sets up the Supabase configuration in your project.

5. **Start Supabase Services**:

   Ensure Docker is running, then start the Supabase services:

   ```bash
   supabase start
   ```

   This command launches the local Supabase instance, including the database and authentication services.

6. **Apply Database Migrations**:

   To set up the database schema, apply the existing migrations:

   ```bash
   supabase db push
   ```

   This command applies all migrations located in the `supabase/migrations` directory to your local database.

### Running the Application

1. **Start the Development Server**:

   ```bash
   npm run dev
   ```

2. **Access the Application**:

   Open your browser and navigate to `http://localhost:5173` to view the dashboard.

### Building for Production

1. **Create a Production Build**:

   ```bash
   npm run build
   ```

2. **Deployment**:

   The production-ready files are generated in the `dist` directory. Deploy these files to your preferred hosting service.

## Project Structure

The project follows a modular structure for maintainability and scalability:

```
supabase/
├── migrations/
│   └── <timestamp>_init.sql
├── seed.sql
src/
├── components/
│   ├── AIAgents.tsx
│   ├── AdvancedAnalytics.tsx
│   ├── ApplicationSecurity.tsx
│   ├── Dashboard.tsx
│   ├── DataProtection.tsx
│   ├── EmailSecurity.tsx
│   ├── Header.tsx
│   ├── Modal.tsx
│   ├── NetworkSecurity.tsx
│   ├── RedBlueTeam.tsx
│   ├── Sidebar.tsx
│   ├── ThreatDetection.tsx
│   ├── UserBehavior.tsx
│   └── VulnerabilityManagement.tsx
├── App.tsx
├── index.css
└── main.tsx
```

- **supabase/migrations/**: Contains SQL migration files for setting up and updating the database schema.

- **supabase/seed.sql**: SQL script for seeding the database with initial data.

- **src/components/**: Contains React components, each responsible for a specific section of the dashboard.

- **App.tsx**: The root component that integrates all individual components.

- **index.css**: Global CSS styles.

- **main.tsx**: Entry point of the application.

## Database Management with Supabase

### Applying Migrations

To apply database migrations and set up the schema:

```bash
supabase db push
```

This command applies all migration files in the `supabase/migrations` directory to your local database.

### Creating New Migrations

When making changes to the database schema, create a new migration file:

```bash
supabase migration new <migration_name>
```

Replace `<migration_name>` with a descriptive name for the migration. This command generates a new SQL file in the `supabase/migrations` directory.

### Seeding the Database

To populate the database with initial data:

```bash
supabase db seed
```

Ensure that the `supabase/seed.sql` file contains the necessary SQL statements to insert the initial data.

## Deployment

To deploy the application:

1. **Build the Application**:

   ```bash
   npm run build
   ```

2. **Deploy**:

   Upload the contents of the `dist` directory to your web server or hosting platform.

3. **Server Configuration**:

   Ensure your server is configured to serve a single-page application (SPA), redirecting all routes to `index.html`.

4. **Supabase Deployment**:
   
  To deploy the Supabase backend to a remote instance:

1. **Create a Supabase Project**:

   - Go to [Supabase](https://supabase.com/) and sign in.
   - Create a new project and note down the project URL and API keys.

3. **Configure Environment Variables**:
   - In your `.env` file, add the following:

     ```env
     VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
     ```

4. **Deploy Database Migrations**:

   Push your local database schema to your hosted Supabase project:

   ```bash
   supabase db push --remote
   ```

   This will apply all migration files to your remote Supabase instance.

5. **Connect Frontend to Supabase**:

   Ensure your frontend is correctly configured to use the remote Supabase database by updating the API URL in your application.

## Authentication & Authorization

The dashboard integrates **Supabase Authentication** for secure user access.

### Setting Up Authentication

1. **Enable Authentication Providers**:
   - In the Supabase dashboard, navigate to **Authentication > Providers** and enable email/password authentication.
   - You can also enable OAuth providers like Google, GitHub, etc.

2. **User Management**:
   - Use Supabase's authentication API to handle login, registration, and session management.
   - Example code for user login:

     ```typescript
     import { createClient } from "@supabase/supabase-js";

     const supabase = createClient(
       import.meta.env.VITE_SUPABASE_URL,
       import.meta.env.VITE_SUPABASE_ANON_KEY
     );

     async function login(email: string, password: string) {
       const { user, error } = await supabase.auth.signInWithPassword({
         email,
         password,
       });

       if (error) {
         console.error("Login error:", error.message);
       } else {
         console.log("User logged in:", user);
       }
     }
     ```

### Role-Based Access Control (RBAC)

Supabase allows role-based access control (RBAC) via Row-Level Security (RLS).

1. **Enable RLS**:
   - In Supabase, navigate to **Database > Policies** and enable RLS on relevant tables.

2. **Create Access Policies**:
   - Example policy to allow only authenticated users to access certain data:

     ```sql
     CREATE POLICY "Users can only access their own data"
     ON users
     FOR SELECT
     USING (auth.uid() = id);
     ```

## API Endpoints

The dashboard interacts with Supabase using RESTful API endpoints.


## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request detailing your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Support

For support or inquiries:

- **Issues**: Open an issue in the [GitHub repository](https://github.com/Karthikkkunal/AI-Powered-Cybersecurity-Assistant-Dashboard/issues).
- **Contact**: Reach out to the maintainers directly through their GitHub profiles.

---

**Empower your cybersecurity operations with the AI-Powered Cybersecurity Assistant Dashboard.** 
