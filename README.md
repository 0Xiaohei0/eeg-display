## Inspiration
There are short lived moments in life that people want to capture. However, for tech armatures like seniors and children, it may be difficult to take out and operate their gadgets in time to capture these moments. This is the purpose of this project, allowing tech armatures to interact with their gargets with ease.
## What it does
This project fetches data from an EEG sensor placed on the user's head, it can then use the data to perform various tasks such as taking photos and tracking concentration levels.
## How we built it
We used python to fetch data from the sensor hardware, then transfer the data from python to react in real time using socket.io. The react script analyzes the data and display it on a dashboard interface. When certain trigger condition is met, a camera controlled my a rasberryPi is activated using python and the picture is displayed in react.
## Challenges we ran into
We had no experience with how to do real time communication between python and react. This lead to a number of threading issues because both the python-sensor interface and the server need to be ran in parallel, while also sharing data with each other in real time.
## Accomplishments that we're proud of
We are proud of successfully fetching data from the sensor hardware and getting web sockets to transfer data between python and react in real time. 
## What we learned
We learned more about web sockets and how to work with hardware.
## What's next for Minds Eye
We can get better sensors to extract more consistent data for analysis.
