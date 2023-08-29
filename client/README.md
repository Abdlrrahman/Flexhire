# Next.js Profile Page with API Calls and Webhooks

This project is a sample Next.js application that demonstrates how to create a profile page, make API calls, and handle webhooks.

## Getting Started

### Prerequisites

- Next.js (version 18.2.0)
- npm (version 8.7.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdlrrahman/Flexhire.git
Navigate to the project directory:

bash
Copy
cd Flexhire
cd client
```

Install dependencies:

bash
Copy
npm install
```

Configuration
Create a .env.local file in the root directory of the project.

Add the following environment variables to the .env file:

Copy
NEXT_PUBLIC_API_BASE_URL=your-api-base-url
NEXT_PUBLIC_FLEXHIRE_API_KEY=your-flexhire-api-key
Replace your-api-base-url with the base URL of your API, and your-webhook-secret with the secret token for webhook verification.

Usage
Start the development server:

bash
Copy
npm run dev
```

Open your browser and navigate to http://localhost:3000 to access the profile page.

API Calls
This project demonstrates how to make API calls using the fetch library. The API calls are made to the endpoints provided by the API server specified in the API_BASE_URL environment variable.

To make API calls, you can use the fetch library as follows:

javascript
Copy
const fetchData = async () => {
  try {
    const response = await  fetch('api/v2', {
            method: 'POST'
        }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
Replace /api/v2 with the appropriate endpoint and modify the code according to your API requirements.

Contributing
Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

basic
Copy

Feel free to customize the content of the README file based on your specific project and requirements.```