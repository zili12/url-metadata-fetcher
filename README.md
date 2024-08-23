# URL Metadata Fetcher

This full-stack application allows users to input a list of URLs, fetch metadata (title, description, and image) for each URL, and display the results.

## Live Demo

You can access the live application here: https://url-fetcher.netlify.app

## Repository

The source code for this project is available on GitHub: https://github.com/zili12/url-metadata-fetcher.git

## Features

- React front-end with a form for URL input
- Node.js back-end with an endpoint for fetching metadata
- Rate limiting (5 requests per second)
- Security measures against common web vulnerabilities

## How to Use

1. Open https://url-fetcher.netlify.app in your web browser.
2. Enter 3 valid URLs in the input fields provided.
3. Click the "Fetch Metadata" button.
4. The application will display the fetched metadata (title, description, and image) for each URL.

## Technical Details

- Front-end: React, deployed on Netlify
- Back-end: Node.js with Express, deployed on Railway
- The front-end communicates with the back-end API to fetch metadata

## Testing

This project includes unit tests for both the client and server components. 
These tests ensure that the core functionality of the application works as expected.

### Client-side Tests

To run the client-side tests:

1. Clone the repository and navigate to the client directory:
    git clone https://github.com/zili12/url-metadata-fetcher.git
2. Navigate to the client directory:
    cd ../url-metadata-fetcher/client
3. Install dependencies:
    npm install
4. Run the tests:   
    npm test

The client-side tests check the following:

1. The URL input form renders correctly with three input fields.
2. An error message is displayed when trying to submit with fewer than 3 URLs.
3. Metadata is fetched and displayed correctly when valid URLs are submitted.

### server-side Tests

To run the server-side tests:

1. Navigate to the server directory:
    cd ../url-metadata-fetcher/server
2. Run the tests:
    npm test

The server-side tests check the following:

1. The server returns a 400 error if no URLs are provided.
2. The server returns a 400 error if fewer than 3 URLs are provided.
3. The server successfully fetches and returns metadata for valid URLs.
4. The server handles errors correctly for invalid URLs.
5. The rate limiting functionality works as expected.

