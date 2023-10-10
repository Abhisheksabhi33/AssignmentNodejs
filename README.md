
# Microservice for Summary Statistics

This is a simple microservice for calculating summary statistics (mean, min, max) on a dataset. It provides APIs to add, delete, and fetch summary statistics for various subsets of the data.

## Prerequisites

Before running the microservice, make sure you have the following installed:

- Node.js and npm: You can download and install Node.js from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Abhisheksabhi33/AssignmentNodejs.git
   ```

2. Navigate to the project directory:

   ```bash
   cd <repository-directory>
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the microservice:

   ```bash
   npm start
   ```

   The microservice should now be running on `http://localhost:5000`.

## APIs

### 1. Add a New Record

- **Endpoint:** `/api/add_record`
- **Method:** POST
- **Request Body:** JSON data representing a record.
- **Example:**

  ```json
  {
    "name": "Abhishek Rawat",
   "salary": "245000",
   "currency": "USD",
   "department": "Engineering",
   "sub_department": "Platform"
  }
  ```

 ## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/c37305c8-873f-4e9e-b7ee-356d6c53312f)




### 2. Delete a Record

- To Delete a Particular Record Use the get_all_record endpoint and find the particular record ID to delete it.

- **Endpoint:** `/api/delete_record/:id`
- **Method:** DELETE
- **URL Parameter:** `id` - The ID of the record to delete.

## PostMan IMG
![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/a6b7c0c2-337c-4c20-8485-6649c2c39240)




### 3. Fetch Summary Statistics for Salary (Entire Dataset)

- **Endpoint:** `/api/summary_stats`
- **Method:** GET

 ## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/7bc8d4b6-0526-4dbc-9234-3702880371b6)



### 4. Fetch Summary Statistics for Salary (Records with "on_contract": true)

- **Endpoint:** `/api/summary_stats/on_contract`
- **Method:** GET

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/5f7ecedb-e505-4ca2-9a99-d68fd7cc2502)

  

### 5. Fetch Summary Statistics for Salary by Department

- **Endpoint:** `/api/summary_stats/by_department`
- **Method:** GET

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/753d8afe-b48a-49be-96ed-33d5ba32ffa2)



### 6. Fetch Summary Statistics for Salary by Department and Sub-Department

- **Endpoint:** `/api/summary_stats/by_department_subdepartment`
- **Method:** GET

  ## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/580e8b04-e148-4c0d-a750-67db18bb15aa)



### 7. Get All Records

- **Endpoint:** `/api/get-all-records`
- **Method:** GET

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/2fd60589-30ed-46e3-947a-7c8fd7b11ac8)


## Authentication and Authorization
The microservice uses JSON Web Tokens (JWT) for authentication.
To authenticate, obtain a token by making a POST request to /login with the following credentials.

- email: admin@gmail.com
- pass: admin


Include the obtained token in the Authorization header for authorized access to APIs.

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/6201e35c-76e5-4fec-8a57-651b97974acd)


## Error Handling

- The microservice includes basic error handling with appropriate HTTP status codes and error messages.
- Input payloads are validated for their schema.
- Authentication and authorization errors are handled.

## Conclusion

This microservice provides functionality for managing and calculating summary statistics on a dataset. It includes APIs for adding, deleting, and fetching summary statistics for various subsets of the data. Authentication and error handling have been implemented to ensure secure and robust operation.
