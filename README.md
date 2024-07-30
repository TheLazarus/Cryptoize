# **Cryptoize** --Track Crypto With Ease!

# **Project Overview**

This project is built using Next.js 14.

Features -

- Shows the Name, current price and the current market cap of popular cryptocurrencies.

- You can easily favorite / unfavorite any currency.

- Shows realtime fluctuations in the prices of these currencies. Alongisde this, it also the marks the currencies in specific colors whenever any fluctuation happens.

- Has a sorting feature to allow sorting based on Symbol / Name.

# App Structure

The app mainly consists of two views - the main landing page where the table is shown, and the details page which shows the price fluctuations of the selected currency in the past 30 days.

**ROUTING** - To manage routing, I'm using Next.js 14's app router which is a file based router. This is extremely helpful in setting up the routes quickly.

**UI Components** - To quickly setup the main table component, I'm using the table component from shadcn/ui. Such reusble ui components are stored under the **components/ui** directory. All the other components are placed under the root **components** directory.

**Utils** - All utility functions are stored in the **lib/utils** file

**Types** Types can be found in the **app/types.ts** directory

**Unit Testing** - Unit tests can be found under the ****tests**** directory. For testing, I've used jest and react testing library.

The main functionality and logic responsible for making API calls, sorting data, favorite / unfavorite, fetching realtime fluctuations using WebSockets is done inside some custom hooks which can be found under the **lib/hooks.ts** file. The main reason of using custom hooks is first of all the separation of concerns, the API logic is handled by the hooks, whereas the component is responsible for rendering the data returned from the hook. It makes our components look more clean, and these hooks can later be used in other components as well.

# **Running Locally**

To spin up the local development server, the following command can be used -

`npm run dev`

To run unit tests, following can be used -

`npm test`

# **Hosting**

The app is currenty hosted on vercel, and can be accessed using the following domain -

`https://cryptoize.vercel.app/`
