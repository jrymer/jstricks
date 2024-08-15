1. Challenging Customer:
    a. **Kaye:** 
        **S:** My most challenging customer had a poor understanding of the modern web, and she was not very responsive to pushback on what requirements she wanted. Additionally she wanted to be very involved in the design process. 
        **T:** I was asked to create a complicated form for gathering user data, but the client wanted to limit the types of fields I could use. For instance, no date pickers for date fields, and no autocomplete on country pickers.
        **A:** In an effort to keep up with solid UI design principles but also keep the customer happy I found a middle ground. I  used a guided input field for the date, but also added an icon to open the date picker. I used the same approach for the country picker.
        **R:** After discussing this solution with the client they accepted that having both would work well so power users could still navigate quickly via keyboard, but less experienced users could use the date picker.
    b. **Trackers:**
        **S:** The client wanted to add a new entity type to our entity relationship platform. The new entity type was fundamentally different from all the other entity types. Additionally, the client did not really know what requirements they wanted outside of vague requests.
        **T:** I had to figure out how to architect the new entity into our existing platform given vague requirements.
        **A:** After mocking out an initial database schema to support the new entity type it became clear that a lot more additional work was required. As the conversation with the client evolved, so did the requirements, for better and for worse. But due to forward thinking and knowledge of the existing system and how the users use the platform, I was able to guide the client towards finalizing their requirements.
        **R:** It worked everyone loved it.
2. Challenging Technical Problems:
    a. **Arrows on the ends of lines:**  
        **S:** We had a visualization tool with nodes and edges. For our first pass, the edges just went from node to node with little styling, but the client later wanted arrows pointing to the nodes instead of lines.
        **T:** The problem was to figure out how to add arrows to the lines. I originally thought this would be an easy task but soon discovered it would not. The tool we used for drawing the nodes and line, D3js, draws lines to the center of the nodes by default. Because the lines are drawn to the center, the ends of the lines are positioned unerneath each node. And because the ends of the lines are underneath the nodes, you cannot see the line tips once the arrows are added.
        **A:** To combat this, I found a geometric formula to find where the lines cross under the node, and then back them off the node until they are visible. The forumla calculated the intersection point between the line and the border of the node. Once the intersection point was found, I could then use the direction of the node (like source or target or to and from) to determine which direction the arrow should be pointing.
        **R:** After implementing the geometric formula and doing a bit of math, I was successfully able to display the arrows on the end of lines.
    b. **Forking the Clustergrammer Library:**
        **S:** The client wanted an advanced visualization tool. The tool I found required data
        **T:**
        **A:**
        **R:**
    c. **Query builder:**
        **S:** A third party contractor had developed a tool to ingest data from our db and build advanced queries to make additional searches with. The client wanted this tool integrated into the application as a feature, not a standalone tool like the 3rd party dev had developed.
        **T:** I was given charge of the effort to integrate this query builder into our main app. But the code was obtuse, there were no comments, it was written in javascript without typings or prop types and our platform was in typescript.
        **A:** I reached out to the 3rd party dev to see if they had a requirements document I could review to determine what criteria were expected from the query builder. Luckily he still had it, otherwise I would have just asked the client for a new one. It was a lot of obnoxious work but eventually I got the app ported into our platform, and ran thourough tests against both to ensure both worked the same.
        **R:** The client was satisfied, but later deprecated the feature.
    d. **ORCON issue:**
        **S:** I worked on a classified platform. There was a platform wide classification tool that was used to determine which users could see which documents based on their credentials. This classification tool had been deployed for over a year with minimal problems. A user found a bug resulting in an incorrect classification of an extremely nice combination of classification types.
        **T:** Because the result of this bug was users seeing information they are not classified to see, fixing it as soon as possible was of utmost importance.
        **A:** As the maintainer of the library I was tasked with fixing it. I gathered as much information about the bug from the user's who discovered the bug and other classification SMEs to fully understand the proper classifications and the exact combination that was breaking. The bug was a that the logic for protecting this specific use case was implemented incorrectly. After fixing it it worked.
        **R:** I fixed the bug and everyone was happy.

3. Deadline
    a. **Graphs Deployment Alongside Home:**
        **S:** There were two new greenlit applications for the same client. One was app A the other app B. App A had begun development about 2 months ago and was just a new frontend ontop of an existing backend. I was the lead for App B which needed a new frontend as well as a new backend. The client, for no reasons other than being excited, expected them to both be deployed to production on the same day.
        **T:** Even though App A had a 2 month head start and had less infrastructure, the client still expected App B to be deployed along side it.
        **A:** I let the product manager and client know that deploying two new applications to the same environment on the same day was not the best idea becuase if the server faced issues they would be harder to debug if two new apps had been deployed. Additionally, I communicated that becuase the apps did not rely on each other, and App B required more infrastructure, it might not be possible to have App B ready for deployment on such short notice.
        **R:** We did end up missing the deadline. After repeated status checks with the client, and full transparency about the velocity and progress of the team they were understand. After we deployed, our MVP included additional work as a bonus and the client was pleased.
4. Coworker issues
    a. **Courtney taking down dev:**
        **S:** I was working a team where the frontend developers used a VPN to connect to a backend hosted in AWS. The backend developers ran their code natively on their laptops. The backend was not dockerized, so the only way to run the backend locally was to build and run the entire server. This caused problems because anytime the DevOps team needed to bring down the dev environment, the frontend team lost connection and could not work. 
        **T:** After discussing with both the backend and dev ops team if they would be open to dockerizing the backend they both said no they did not want to take on the effort of doing so. The local setup for the backend was also very obtuse and finicky and they did not want to take the time to get a whole new team setup on the backend.
        **A:** Because neither the backend nor devops team was offering assistance to the frontend developers, I took it upon myself to dockerize the backend so the frontend team could use it for local dev.
        **R:** The frontend team used the dockerized env for local dev. But it cost me a bit of time and hurt my velocity on the frontend.
    b. **Manan:**
        **S:** I was team lead on a project with an IC who had extremely low velocity. He goofed off most of the day, and ended up offloading a l of his work by the end of the sprint because he would not finish. This hurt the team's velocity.
        **T:** Because I was serving as scrum master on this team I had to figure out how to breach this topic with the individual.
        **A:** For the next two sprints I tracked each member's velocity, their projected workload during sprint planning, and their actual workload after a sprint ended. I had a conversation with the individual about what we can do to assist him. He felt as though a lot of his tickets were too difficult and that was why he couldn't finish most of them. During the next sprint planning, I asked a different junior dev if they wanted harder tasks to which he said yes, so even though the problematic developer was a mid level dev, he was assigned most of the junior level tasks, while the junior dev was assigned a small hand full of mid level tasks. Additionally, the team on a little bit less workload this sprint in the event that either of their leftover tickets needed to be picked up.
        **R:** The IC remained a poor performer.


1. Describe a time you went above and beyond for work.
Have you ever taken it upon yourself to exceed a target at work? This is your opportunity to show a prospective employer that you’re striving for excellence instead of just doing what’s expected of you. Choose a project where you can discuss why you decided to go above and beyond, how you did it, and what the results were.

2. Describe a time you had to resolve a difficult situation or conflict on the job.
Questions about complaints and disagreements you’ve had in previous roles can reveal a lot about how you interact with others, solve problems and perform under pressure.

The key is to focus on the “resolve” part of the question. Talk about a time you experienced a conflict or other difficult situation and fixed it. Don’t forget to mention how you grew from the incident.

3. Describe a time you took a leadership role.
If you’re already in a managerial role, think of an example relevant to the new job and talk about a time your leadership made a difference in inspiring or motivating others.

If you haven’t made it to a leadership role yet, you can still answer the question. Perhaps you managed a project, mentored a new hire or organized an event. Even something you did during school could show you have the potential and skills to be a great leader.

4. Describe a time you made a mistake. How did you handle it?
This one is similar to the question about conflicts on the job. It can reveal how you’ve handled a challenging situation and that you can learn from your mistake and take accountability for it. Choose a minor mistake and discuss how you took responsibility, fixed it and adjusted to prevent similar mistakes.

5. Describe a time you set a goal for yourself and followed through.
Initiative, ambition and tenacity are the qualities you want to show here. Pick a goal you personally set and build a story around it: why it was important to you, the timeline involved, challenges along the way and the result you had. If possible, mention skills or abilities relevant to the job description. 

6. What’s your proudest achievement?
What really matters to you? This question can reveal a lot about your work ethic and core values. Choose an accomplishment that you feel genuinely proud of, and your passion and enthusiasm should shine through. If you can work in some of the qualities and skills the interviewer is looking for, even better.
