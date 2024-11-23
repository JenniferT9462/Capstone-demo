# Capstone Level 3

This project is a Planner App that is similar to a Bullet Journal. Users can login and be able to add events to a calender, add TODOs to a task list, track progress on tasks, track habits or activities that will be visualized with a pie graph and a mood tracker with journal entries. 

<!-- Email Server README.md -->
[![Email Server](https://img.shields.io/badge/server-email--readme-blue?style=flat-square)](/README-email-server.md)
<!-- Check list of requirements README.md -->
[![Requirements](https://img.shields.io/badge/checkList-readme-blue?style=flat-square)](/README-checklist.md)

## Planning & Wireframes
- Link to canva <https://www.canva.com/design/DAGWHh9pHxM/7Vngc17x6X--vMDgEf5gqA/edit>

### `Wireframes`
<!-- TODO: May have to update later -->
![wireframe-1](</public/eventsPage.png>)
![wireframe-2](</public/journalPage.png>)

### `Planning`
![components](</public/components.png>)
#### `Features`

- **Habit Tracker**: Set daily habits and track your progress.  
- **Event Calendar**: Manage and schedule tasks/events seamlessly.  
- **Journal and Mood Tracker**: Reflect on your day and track your moods over time.  
- **Motivational Reminders**: Receive motivational quotes and progress updates.  
- **Data Visualization**: View your activity with interactive charts and graphs.  

### `Technologies Used`  

- **Frontend**: React, Next.js, Tailwind CSS  
- **Backend**: Next.js API routes, Upstash  
- **Email Notifications**: Resend  
- **Data Visualization**: recharts  
- **Testing**: Storybook, Postman  

### `Installation`  

1. Clone the repository:  
   ```bash
   git clone https://github.com/JenniferT9462/Capstone-level-3.git
   cd Capstone-level-3

2. Install dependencies:
    ```bash
    npm install

3. Set up environment variables:
    ```bash
    RESEND_API_KEY=your-api-key
    UPSTASH_REDIS_URL=your-redis-url
    UPSTASH_REDIS_TOKEN=your-redis-token

4. Run development server:
    ```bash
    npm run dev

5. Open http://localhost:3000 to view it in the browser.

### `Testing`

1. **API Testing:** Use Postman to test API routes in the `/api` folder.
2. **Component Testing:** Run Storybook:
    ```bash
    npm run storybook


## Daily Log of Development

### Day 1 

#### Tasks Completed
- Set up main readme with daily logs.
- Draft wireframes and workflows.
- List components and APIs that will be used.

#### Challenges and Solutions
- After mapping out features that I want, it seems that it may be too much to actually accomplish. May have to narrow them down a little. 

#### Next Steps
- Finalize wireframes.
- Finalize APIs

### Day 2 

#### Tasks Completed
- Updated Readme with wireframes
- Started Habit components
- Installed Storybook

#### Challenges and Solutions
- Storybook was a challenge to install. Next updated to 15 and was not compatible with Storybook. The solution was to install from a solution branch found on Github.

#### Next Steps
- Add Habit Tracker Page

### Day 3 

#### Tasks Completed
- Add NavBar component
- Created a story for NavBar
- Habit Tracker Page

#### Challenges and Solutions
- Figuring out how I was going to track the habits on the habit tracker. I decided to add a progress button that adds 1 to the progress count and calculated by dividing the frequency(days) by the progress count. 

#### Next Steps
- Start on HabitTracker Form

### Day 4 

#### Tasks Completed
- Started Calendar Components
- Events PopUp

#### Challenges and Solutions
- I originally created my calendar on one component. I had to break it down into several components for organization. Getting the event popup was a bit challenging, I set a useState hook for it to handle hiding it until a date on the calendar was clicked/ 

#### Next Steps
- Main components: NavBar, Splash page and Welcome page.

### Day 5 

#### Tasks Completed
- Splash Page
- Welcome Page
- Logo on NavBar

#### Challenges and Solutions
- Figuring out what logo I wanted to use and where to find one that I liked. I ended up using https://iconify.design/ custom brand logo. 

#### Next Steps
-  Work on todo components and sidebar that keeps events and todo lists. 

### Day 6 

#### Tasks Completed
- Todos Components
- MoodChart
- MoodCalendar

#### Challenges and Solutions
- The react-calendar was a bit challenging to style. I looked up documentation on the react-calendar npm and it said to add `!important` to certain styles to allow my style rules to work. 

#### Next Steps
- Storybook and other packages that I wanted to use in my project weren't compatible so I may need to downgrade Next to 14 instead of 15. 

### Day 7 

#### Tasks Completed
- Downgrade to Next 14
- Journal Form


#### Challenges and Solutions
- I came into some styling issues with the journal form on the page. 

#### Next Steps
- Decide how I will be saving the user data for my events, todos and journal entries. 

### Day 8 

#### Tasks Completed
- Merge all branches to main
- API Routes to save and get user data
- Update Readme checklist

#### Challenges and Solutions
- Getting my data and API routes to match in data format was a bit challenging. I had to go back to my API routes to insure that the data formats matched. 










