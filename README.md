
Github Repo: https://github.com/Abhisheksabhi33/AssignmentNodejs

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
    "name": "John Doe",
    "department": "HR",
    "sub_department": "Recruitment",
    "salary": 60000,
    "on_contract": true
  }
  ```

 ## PostMan IMG

  ![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/ba323e08-b5b5-4374-88ac-1ea0a62b1b71)


### 2. Delete a Record

- To Delete a Particular Record Use the get_all_record endpoint and find the particular record ID to delete it.

- **Endpoint:** `/api/delete_record/:id`
- **Method:** DELETE
- **URL Parameter:** `id` - The ID of the record to delete.

## PostMan IMG
![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/c4a1db1d-a1f8-4a1a-bf3c-88edba305536)



### 3. Fetch Summary Statistics for Salary (Entire Dataset)

- **Endpoint:** `/api/summary_stats`
- **Method:** GET

 ## PostMan IMG

 ![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/0e5b42c3-2b23-48e6-a0bf-f6ed094f431c)


### 4. Fetch Summary Statistics for Salary (Records with "on_contract": true)

- **Endpoint:** `/api/summary_stats/on_contract`
- **Method:** GET

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/685a63a3-9ccd-48c4-bc46-cc335544b6bd)
  

### 5. Fetch Summary Statistics for Salary by Department

- **Endpoint:** `/api/summary_stats/by_department`
- **Method:** GET

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/99a92039-8307-4994-852a-ec84e345cf1d)


### 6. Fetch Summary Statistics for Salary by Department and Sub-Department

- **Endpoint:** `/api/summary_stats/by_department_subdepartment`
- **Method:** GET

  ## PostMan IMG

 ![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/58ebd212-a488-47b4-b7db-d901ed99fc0f)


### 7. Get All Records

- **Endpoint:** `/api/get-all-records`
- **Method:** GET

## PostMan IMG
![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/291157d6-e8e6-4c84-8dc8-8fdb2046b7e6)



## Authentication and Authorization
The microservice uses JSON Web Tokens (JWT) for authentication.
To authenticate, obtain a token by making a POST request to /login with the following credentials.

- email: admin@gmail.com
- pass: admin


Include the obtained token in the Authorization header for authorized access to APIs.

## PostMan IMG

![image](https://github.com/Abhisheksabhi33/AssignmentNodejs/assets/87107030/42683275-957d-42fc-9ca9-fcf0109db866)




## Error Handling

- The microservice includes basic error handling with appropriate HTTP status codes and error messages.
- Input payloads are validated for their schema.
- Authentication and authorization errors are handled.

## Conclusion

This microservice provides functionality for managing and calculating summary statistics on a dataset. It includes APIs for adding, deleting, and fetching summary statistics for various subsets of the data. Authentication and error handling have been implemented to ensure secure and robust operation.
