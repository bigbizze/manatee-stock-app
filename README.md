
I used GPT-3/copilot and quicktype.io to assist in building the features present quickly.

# Setup

Clone repo
```bash
git clone https://github.com/bigbizze/manatee-stock-app.git
cd manatee-stock-app
```

____

Install dependencies
```bash
yarn install
```
or
```bash
npm install
```

____

Create .env file with finnhub api key set as `FINNHUB_API_KEY=<api-key>` property, or uncomment .env-example and add the API key there.

___

# Development Server

Start local dev server
```bash
yarn dev
```
or
```bash
npm run dev
```
____

Navigate to dev server in browser
```bash
http://localhost:3000
```

____

# Production build

(make sure the dev server is not running)


Build for production
```bash
yarn build
```
or
```bash
npm run build
```

____

Start production server (or deploy to your favorite hosting service)
```bash
yarn start
```
or
```bash
npm run start
```
____

Navigate to production server in browser
```bash
http://localhost:3000
```

