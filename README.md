# Email & Data Server

This project focuses on building a robust server application. It leverages Vercel and Upstash to securely store user data, while Resend API powers efficient email communication. By completing this project, you'll gain hands-on experience in server development, data storage, and email integration.

## Diagram of Data flow

![Data Flow](<dataFlowDiagram.png>)

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

    ![terminal questions](<nextQuestions.png>)

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

- Get API Key from resend.com...You will have to sign up a free account. 
- Add your new key to your .env.local file in the root of your app directory.
- Install resend to your project by running:

        npm install resend

- Create a new API route in `api` directory.Example: mail.js
- Add Email key to the API route file

        const EMAIL_KEY = process.env.EMAIL_KEY;

- Send email using HTML. Example Code:
    
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

- Setup query params for the user inputs:

        const query = req.query;
        const name = query.name;
        const message = query.message;
        const subject = query.subject;

- In your local host now you can add these queries to the url to send that info.

        http://localhost:3000/api/mail?name=Jenn&message=What%20is%20happenning&subject=Stuff

- Example of result of adding queries to URL:

![JSON Data](<JSON.png>)