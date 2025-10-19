# Photo Messaging

Photo Messaging is a web app where you can create messages using a string of images, and then have others try and guess what your message was supposed to signal. You can add up to 10 images to your message, and they can come from either [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) or [Pexels](https://www.pexels.com/).

**Try it out at [photomessaging.samv.me](https://photomessaging.samv.me)!**

The app was designed as a novel way to send messages for [Hack Club Siege](siege.hackclub.com/) with the theme "signal". I enjoyed making the app and i'll probably try to improve it over time, adding things like a proper database and a more advanced UI (especially for the message creation page). If you have any feedback or concerns, please contact me using the contact details found on [my website](https://samv.me/) (or you can contact Sam V on Slack if you are visiting from Hack Club voting).

## External services

Photo Messaging uses the following external services:

* Wikimedia Commons and Pexels for images
* [OpenAI](https://platform.openai.com/docs/guides/moderation) for moderating images
* [Discord Webhooks](https://support.discord.com/hc/articles/228383668-Intro-to-Webhooks) for logging

If you want to host it yourself, you will need API keys for all of these services (except for Wikimedia Commons) which you can set in a .env file.