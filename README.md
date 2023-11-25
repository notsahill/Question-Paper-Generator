# Question-Paper-Generator

 This is a question paper generator
 To run this project on your system, you need to clone this repository and make sure that you have nodejs installed on your system.

1) Run "npm i" command to install all the dependecies for the project.
2) Once you have all the dependencies installed, then run the command "npm run dev" to start the server.
3) Now your server is running on the specified port i.e. 3000.
4) Now, if you want to fetch all the questions present in the question bank then you need to send a GET request to the "http://localhost:3000/questions" route.
5) To add a question in the question bank , you need to send a POST request to "http://localhost:3000/question" route with json body in the specified format
   i.e.
   {
      "question": "What is verb?",
      "subject": "English",
      "topic": "Grammar",
      "difficulty": "Easy",
      "marks": 5
    }
6) To generate a question paper , you need to send a POST request to "http://localhost:3000/generate" route with json body in the specified format
   i.e.
   {
      "totalMarks": 100,
      "difficultyDistribution": { 
        "easy": 40,
        "medium": 30,
        "hard": 30  
      }
   } 
