# Email & Data Server

**Deployed Link to Home Page** <https://capstone-demo-ruddy.vercel.app>

**Deployed Link to contact-me page:** <https://capstone-demo-ruddy.vercel.app/contact-me>

**Deployed Link to get stored messages page:** <https://capstone-demo-ruddy.vercel.app/get-messages>

This project focuses on building a robust server application. It leverages Vercel and Upstash to securely store user data, while Resend API powers efficient email communication. By completing this project, you'll gain hands-on experience in server development, data storage, and email integration.

## Diagram of Data flow

This architecture facilitates the process of receiving messages from users through a contact form and then sending those messages as emails while also keeping a record in a datastore. 

![Data Flow](</public/dataFlowDiagram.png>)

## Setup

- In your system terminal make sure you are in the directory that you want your Next app to go. To see where you are you can run:

        pwd

- If you need to navigate somewhere else, to see the files in your current directory, you can run:

        ls

- You can move into the correct directory by running:

        cd <desired directory>

- Create a New Next.js Application
    * Run - NOTE: if we run w/out a project name, the terminal will ask us to enter a project name. 

            npx create-next-app@latest
    
- You will then be asked a series of questions...

    ![terminal questions](</public/nextQuestions.png>)

- Navigate to your new project by running:

        cd capstone-demo

- Then you can open a VScode window by running: 

        code .

- To install dependencies run:

        npm install

- To open the deployment server run:

        npm run dev

- Open your browser and navigate to http://localhost:3000 to view your home page and see the changes you make in        real-time. NOTE: you can ctrl+click(windows) the link directly from your terminal in VScode.

- Create a new repository on Github. NOTE: don't select add README or .gitignore
    * Quick set up will pop up...Run the code that says Add repo to existing repo on the command-line. 

- Add your Next app to your new repository by running this in bash terminal:

        git remote add origin https://github.com/yourusername/your-repository.git
        git branch -M main
        git push -u origin main

### Part 1 Setup

- Get API Key from <https://resend.com>...You will have to sign up a free account. 
- Add your new key to your `.env.local` file in the root of your app directory.
- Install resend to your project by running:

        npm install resend

- Create a new API route in `api` directory. Example: `mail.js`
- Add Email key to the API route file
```javascript
        const EMAIL_KEY = process.env.EMAIL_KEY;
```
- Send email using HTML.  
- Example Code:
```javascript    
            export default async function handler(req, res) {
                const email = {
                      from: 'Acme <onboarding@resend.dev>',
                      to: ['jennifertarleton@gmail.com'],
                      subject: 'Hello World',
                      html: `<strong>${message}</strong>`,
                }
               // await resend.emails.send(email);
               res.status(200).json({
                   name: name, subject: subject, message: message
             })
          }
```
- Setup query params for the user inputs:
```javascript
        //Set queries for URL - That later will be used for user inputs
        const query = req.query;
        const name = query.name;
        const message = query.message;
        const subject = query.subject;
```
- In your local host now you can add these queries to the url to send that info.

        http://localhost:3000/api/mail?name=Jenn&message=What%20is%20happenning&subject=Stuff

- Example of result of adding queries to URL:

  ![JSON Data](</public/JSON.png>)

### Part 2 Setup

- Deploy on Vercel 
  * Make a new project
  * Save environment variable - API Key from Resend

- From your project on Vercel -> Go to Storage -> Create new DB -> Select UpStash KV.

- Copy the environment variables(will be at top of page in green) created after setting up your new DB and add them to your `.env.local` file.

- In VSCode terminal install redis to your project by running:

        npm install redis

- Import redis to your project by adding this to your code:  
```javascript
             import { Redis } from '@upstash/redis';
```
- To initialize redis from the environment variables that you saved in `.env.local` file add this to your API route code:
```javascript
             // Initialize Redis
             const redis = Redis.fromEnv();
```
- Example usage in your code inside an export default async function:
```javascript
             //Set a Value - set("key", value)
             await redis.set("item", "poop"); 
             //Get a Value - By calling it's key-"item"
             const result = await redis.get("item"); 
```
- You can Increment a Value by adding this to your code:
```javascript
             //Increment a Value
             await redis.incr('count'); 
```
- You can add the result from when you get the value to the response code:

```javascript
             //Set up ok response
             res.status(200).json({
               name: name, subject: subject, message: message, result: result
             });
```
- To see that your data is being saved to UpStash -> Got to Vercel -> In your project -> Go to Storage -> Open in UpStash -> From there go to Data Browser. 

### UpStash Screenshot

  ![UpStash](</public/Upstash.png>)

## API Route to send Email

- After setup and making sure everything works I changed the `query` params to better suit the inputs needed in a contact form, updated the stored `key-value pairs` and changed the `emailObject` with a new `Subject` and `html(body)` of the email that will be delivered. 

       
```javascript
        //Set queries for URL - That later will be used for user inputs
        const name = req.query.name;
        const message = req.query.message;
        const email = req.query.email

         //Store name, email and message - set("key", value)
        await redis.set("name:", name); 
        await redis.set(`message:${name}`, message); 
        await redis.set(`email:${name}`, email);

        //Set up the email object
        const emailObject = {
                from: 'Acme <onboarding@resend.dev>',
                to: ['jennifertarleton@gmail.com'],
                subject: 'Contact Form Submission',
                html: `<p><strong>From: </strong> ${name} (${email})</p>
                        <p><strong>Message: </strong> ${message}</p>`
        }; 
```
## Client Side - Form Handling

- In the `pages` directory make a new directory for the `contact-me` page. Then create a file called `index.js`. 
- In the new file import `useState`:
```javascript
        import { useState } from 'react';
```
- Use `useState` to store the state variables and a setter function to update the state variables for `name`, `email` and `message`. 
```javascript
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');
```
- Use `fetch` with the endpoint `/api/mail?name=${name}&message=${message}&email=${email}`
- In the form's inputs we set the value to their corresponding  state variables. Example: `value={name}`.
- Set the values of the state variables with `onChange` on the inputs. For this I used an arrow function inside of the `onChange` attribute on the inputs. Example: `onChange={(e) => setName(e.target.value)}` 
- I attached the `handleSubmit` function to the form. So, when the user clicks the button to send email the `handleSubmit` function calls the API route and sends the message with its inputted data. 

## Email 

![Screenshot of Email](</public/emailScreenshot.png>)

![Screenshot of Email](</public/email2Screenshot.png>)

## Magic-Link

### How Magic Link is Generated

- **User Input:** The user provides their email address on the login page. 
- **Token Creation:** The API is setup to generate a time-limited token as a temporary identifier. 
- **Link Construction:** The generated token is embedded within a URL, creating the `magic-link`. 
- **Email Delivery:** The link is then sent to the user's provided email address. 

### Purpose of the Token
When the user clicks the `magic link`:
- **Token Validation:** The server receives the request containing the token. 
- **Token Verification:** The server checks if the token is valid, meaning it hasn't expired and hasn't been compromised. 
- **User Authentication:** If the token is valid, the server authenticates the user associated with that token. 
- **Session Establishment:** A session is created for the user, allowing them access to the application or service. 

## User Data Storage and Retrieval

### Storing User Favorites

The `api/add-favorites` endpoint allows users to store a favorite item associated with their email address. This endpoint is protected by token-based authentication.
- User sends a `POST` request with their email, favorite item and token.
- The `token` is verified against the stored `magic-link` token in Upstash.
- If the token is valid, the favorite item is stored in Upstash. 

**Example:**
```json
POST /api/add-favorite
{
        "email": "example@gmail.com",
        "favorite": "Cats",
        "token": "fjkdsl;ajfie8"
}
```
### Retrieving User Favorites

The `api/get-favorites` endpoint retrieves the favorite item for a specific user by `email`. 

**Example:**

`GET /api/get-favorite?email=example@gmail.com`

## Testing

I tested the API endpoints with postman. I also added error handling to the code for the API and the fetch code to ensure that everything is working and if it failed I would know where it happened in my code. I also added a status state variable to display a message saying that the message was sent or if it failed to let the user know the status of their message. 

### Screenshot of Postman Testing

#### Send Email API

![Send Email API](</public/emailPostman.png>)

#### Get Stored Messages API

![Get Stored Messages](</public/messagePostman.png>)

## Reflection

In developing this project I gained skills in backend services, including Vercel for deployment, Resend for email handling and Upstash for data storage. It also help me with a better understanding of how to securely store API keys and other environment variables. Using React's `useState`and connecting it to Next.js API routes was especially valuable in setting up the client-side. 

A challenge for me was the setup for Resend and Upstash. Getting the environment variables for Upstash and importing everything to my project was extensive but, after this project I am confident that it we be a smoother production for me in the future. Another challenge was the form and making sure I had my state variables set up right to the correct inputs. It was a little confusing understanding how the request queries were connected to the fetch endpoint. 












                
        
                



